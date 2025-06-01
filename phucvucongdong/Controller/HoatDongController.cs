


using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using phucvucongdong.Data;
using phucvucongdong.DTO;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;
using System.Collections.Generic;
using System.Data;
using System.Linq;



[ApiController]
[Route("api/[controller]")]
public class HoatDongController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public HoatDongController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }




    [HttpGet("danhsachtatcahoatdong")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var hoatDongList = await _context.Database
                .SqlQueryRaw<HoatDongDto>("EXEC sp_HoatDongGetAll ")
                .ToListAsync();

            return Ok(hoatDongList);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }
    } ////////////////dành cho quản sinh



    [HttpGet("danhsachtatcahoatdongsv")]
    public async Task<IActionResult> GetAllHDSV()
    {
        try
        {
            var hoatDongList = await _context.Database
                .SqlQueryRaw<HoatDongDto>("EXEC sp_HoatDongGetAll_SinhVien ")
                .ToListAsync();

            return Ok(hoatDongList);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }
    } //////////////////dành cho sinh viên




    [HttpGet("laytheonguoidungid")]
    public async Task<IActionResult> GetAll(int nguoi_dung_id)
    {
        try
        {
            var hoatDongList = await _context.Database
                .SqlQueryRaw<HoatDongDto>("EXEC sp_HoatDongGetAll3 @nguoi_dung_id = {0}", nguoi_dung_id)
                .ToListAsync();

            return Ok(hoatDongList);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }
    }




    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var hoatDong = _context.HoatDongs
                .FromSqlRaw("EXEC sp_HoatDongGetById @p0", id)
                .AsEnumerable()
                .FirstOrDefault();

            if (hoatDong == null) return NotFound();

            var dto = _mapper.Map<HoatDongDto>(hoatDong);
            return Ok(dto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }
    }








    [HttpPost]
    public async Task<IActionResult> Create(HoatDongDto dto)
    {
        try
        {
            var newId = await _context.Database.ExecuteSqlRawAsync(
                "DECLARE @NewId INT; EXEC sp_HoatDongAdd6 @p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7; SELECT @NewId = SCOPE_IDENTITY();",
                new object[] { dto.ten_hoat_dong, dto.mo_ta, dto.ngay_bat_dau, dto.ngay_ket_thuc, dto.tieu_chi_id, dto.nguoi_tao_hoat_dong, dto.tong_so_nguoi_tham_gia, dto.is_hidden });

            return CreatedAtAction(nameof(GetById), new { id = newId }, dto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }
    }



    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, HoatDongDtoUpdate dto)
    {
        try
        {
            var result = await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_HoatDongUpdate2 @p0, @p1, @p2, @p3, @p4,@p5,@p6,@p7,@p8",
                new object[] { id, dto.ten_hoat_dong, dto.mo_ta, dto.hoc_ky, dto.tong_so_nguoi_tham_gia, dto.ngay_bat_dau, dto.ngay_ket_thuc, dto.tieu_chi_id, dto.is_hidden });

            if (result == 0)
            {
                return BadRequest(new { success = false, message = "Cập nhật thất bại!" });
            }

            return NoContent();
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
            var result = await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_HoatDongDelete @p0",
                new object[] { id });

            if (result == 0)
            {
                return BadRequest(new { success = false, message = "Xóa thất bại!" });
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }

    }






    [HttpPost("themsinhvienbatbuoc")]
    public async Task<IActionResult> TuDongThemSinhVien([FromBody] ThemSinhVienBatBuoc dto)
    {
        try
        {
            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_TuDongThemSinhVienChoHoatDong2 @p0, @p1",
                parameters: new object[] { dto.hoat_dong_id, dto.lop }
            );

            return Ok(new
            {
                message = "Đã thực hiện thêm sinh viên tự động (nếu cần)."
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "Đã xảy ra lỗi khi thực thi stored procedure.",
                error = ex.Message
            });
        }
    }


    [HttpGet("thongkehoatdong")]
    public async Task<IActionResult> GetActivityStats()
    {
        try
        {
            var activityStatsList = await _context.Database
                .SqlQueryRaw<ThongKeHoatDongTheoNamHocHocKy>("EXEC sp_ThongKeHoatDongTheoNamHocHocKy")
                .ToListAsync();

            return Ok(activityStatsList);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }
    }

}
