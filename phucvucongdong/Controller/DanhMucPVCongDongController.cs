using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using phucvucongdong.Data;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;


[ApiController]
[Route("api/[controller]")]
public class DanhMucPVCongDongController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public DanhMucPVCongDongController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;

    }





    [HttpGet]
    public async Task<IActionResult> GetDanhMucPVCD()
    {
        try
        {
            var danhMucList = await _context.DanhMucPVCongDongs
                .FromSqlRaw("EXEC sp_DanhMucPVCDGetAll")
                .ToListAsync();

            return Ok(danhMucList);
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
            var danhMuc = _context.DanhMucPVCongDongs
                .FromSqlRaw("EXEC sp_DanhMucPVCDGetById @p0", id)
                .AsEnumerable()
                .FirstOrDefault(); // Chuyển thành LINQ trên client

            if (danhMuc == null) return NotFound();

            var dto = _mapper.Map<DanhMucPVCongDongDto>(danhMuc);
            return Ok(dto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }
    }







    [HttpPost]
    public async Task<IActionResult> Create(DanhMucPVCongDongAddDto dto)
    {
        try
        {
            var newId = await _context.Database.ExecuteSqlRawAsync(
                "DECLARE @NewId INT; EXEC sp_DanhMucPVCDAdd @p0, @p1; SELECT @NewId = SCOPE_IDENTITY();",
                new object[] { dto.ten_danh_muc, dto.mo_ta });

            return CreatedAtAction(nameof(GetById), new { id = newId }, dto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
        }
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, DanhMucPVCongDongDto dto)
    {
        try
        {
            var result = await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_DanhMucPVCDUpdate @p0, @p1, @p2",
                new object[] { id, dto.ten_danh_muc, dto.mo_ta });

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
                "EXEC sp_DanhMucPVCDDelete @p0",
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



}
