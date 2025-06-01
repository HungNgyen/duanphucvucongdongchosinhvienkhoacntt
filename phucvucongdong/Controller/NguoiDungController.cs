using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using phucvucongdong.Data;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;
using System.Collections.Generic;
using System.Data;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class NguoiDungController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    public NguoiDungController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }







    [HttpGet]
    public async Task<IActionResult> GetDanhSachNguoiDung()
    {
        var nguoiDungList = await _context.NguoiDungs
            .FromSqlRaw("EXEC sp_NguoiDungGetAll")
            .ToListAsync();

        return Ok(nguoiDungList);
    }




    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var nguoiDung = _context.NguoiDungSinhVienDtos
                .FromSqlRaw("EXEC sp_NguoiDungGetById @p0", id)
                .AsEnumerable()
                .FirstOrDefault();

            if (nguoiDung == null) return NotFound(new { message = "Không tìm thấy người dùng" });

            var dto = _mapper.Map<NguoiDungSinhVienDto>(nguoiDung);
            return Ok(dto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }
    }





    [HttpPost]
    public async Task<IActionResult> Create(NguoiDungDto dto)
    {
        try
        {
            var idOutput = new SqlParameter
            {
                ParameterName = "@nguoi_dung_id",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output
            };

            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_NguoiDungAdd @ho_ten, @vai_tro, @phong_ban, @thong_tin_lien_he, @nguoi_dung_id OUTPUT",
                // new SqlParameter("@ho_ten", dto.ho_ten),
                new SqlParameter("@vai_tro", (object?)dto.vai_tro ?? DBNull.Value),
                new SqlParameter("@phong_ban", (object?)dto.phong_ban ?? DBNull.Value),
                new SqlParameter("@thong_tin_lien_he", (object?)dto.thong_tin_lien_he ?? DBNull.Value),
                idOutput
            );

            int newId = (int)idOutput.Value;

            return CreatedAtAction(nameof(GetById), new { id = newId }, dto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }
    }






    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            int rowsAffected = await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_NguoiDungDelete @p0", id);

            if (rowsAffected == 0)
                return NotFound(new { message = "Không tìm thấy người dùng" });

            return Ok(new { message = "Xóa người dùng thành công" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }
    }










}
