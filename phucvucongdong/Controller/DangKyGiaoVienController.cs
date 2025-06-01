using System.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using phucvucongdong.Data;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;


[ApiController]
[Route("api/[controller]")]
public class DangKyGiaoVienController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public DangKyGiaoVienController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // [HttpGet]
    // public IActionResult GetAll()
    // {
    //     var entities = _context.DangKyGiaoViens.ToList();
    //     var dtos = _mapper.Map<List<DangKyGiaoVienDto>>(entities);
    //     return Ok(dtos);
    // }

    // [HttpGet("{giaoVienId}/{hoatDongId}/{namHoc}")]
    // public IActionResult GetById(int giaoVienId, int hoatDongId, int namHoc)
    // {
    //     var entity = _context.DangKyGiaoViens
    //         .FirstOrDefault(d => d.giao_vien_id == giaoVienId && d.hoat_dong_id == hoatDongId && d.nam_hoc == namHoc);
    //     if (entity == null) return NotFound();

    //     var dto = _mapper.Map<DangKyGiaoVienDto>(entity);
    //     return Ok(dto);
    // }

    [HttpGet("get-by-user/{nguoi_dung_id}")]
    public async Task<IActionResult> GetLichSuByNguoiDungId(int nguoi_dung_id)
    {
        var giaoVien = await _context.GiaoViens.FirstOrDefaultAsync(sv => sv.nguoi_dung_id == nguoi_dung_id);
        if (giaoVien == null)
            return NotFound("Không tìm thấy giáo viên tương ứng.");

        var result = await _context.Set<DangKyGiaoVienDto>()
            .FromSqlRaw("EXEC sp_LichSuThamGiaCuaGiaoVien @giao_vien_id = {0}", giaoVien.giao_vien_id)
            .ToListAsync();

        return Ok(result);
    }






    [HttpPost("dangkyhoatdonggiaovien")]
    public async Task<IActionResult> DangKyHoatDong([FromBody] DangKyGiaoVienDto dangKyDto)
    {
        try
        {
            var resultParam = new SqlParameter("@result", SqlDbType.Int) { Direction = ParameterDirection.Output };

            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_GiaoVienDangKyHoatDong4 @giao_vien_id, @hoat_dong_id,@nam_hoc ,@trang_thai, @minh_chung, @result OUTPUT",
                new SqlParameter("@giao_vien_id", dangKyDto.giao_vien_id),
                new SqlParameter("@hoat_dong_id", dangKyDto.hoat_dong_id),
                new SqlParameter("@nam_hoc", dangKyDto.nam_hoc),
                new SqlParameter("@trang_thai", dangKyDto.trang_thai ?? "Chua hoàn thành"), //(object)DBNull.Value)
                new SqlParameter("@minh_chung", dangKyDto.minh_chung ?? (object)DBNull.Value),
                resultParam
            );

            int result = (int)resultParam.Value;

            if (result == 1)
            {
                return Ok(new { message = "Đăng ký hoạt động thành công!" });
            }
            if (result == -1)
            {
                return BadRequest(new { message = "Giáo viên không tồn tại!" });
            }
            if (result == -2)
            {
                return BadRequest(new { message = "Giáo viên đã đăng ký hoạt động này!" });
            }

            return StatusCode(500, new { message = "Lỗi không xác định!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi hệ thống" });
        }
    }







    [HttpPut("{giaoVienId}/{hoatDongId}/{namHoc}")]
    public IActionResult Update(int giaoVienId, int hoatDongId, int namHoc, DangKyGiaoVienDto dto)
    {
        var entity = _context.DangKyGiaoViens
            .FirstOrDefault(d => d.giao_vien_id == giaoVienId && d.hoat_dong_id == hoatDongId && d.nam_hoc == namHoc);
        if (entity == null) return NotFound();

        _mapper.Map(dto, entity);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{giaoVienId}/{hoatDongId}/{namHoc}")]
    public IActionResult Delete(int giaoVienId, int hoatDongId, int namHoc)
    {
        var entity = _context.DangKyGiaoViens
            .FirstOrDefault(d => d.giao_vien_id == giaoVienId && d.hoat_dong_id == hoatDongId && d.nam_hoc == namHoc);
        if (entity == null) return NotFound();

        _context.DangKyGiaoViens.Remove(entity);
        _context.SaveChanges();

        return NoContent();
    }







    [HttpGet("dangkygiaovienall")]
    public async Task<IActionResult> GetTatCaDangKyGiaoVien()
    {
        var result = await _context.DangKyGiaoVienDtos // => DTO view phù hợp với JOIN kết quả
            .FromSqlRaw("EXEC sp_GetDangKyGiaoVienAll")
            .ToListAsync();

        return Ok(result);
    }






    [HttpPost("giaoviennopminhchung")]
    public async Task<IActionResult> NopMinhChung([FromBody] GiaoVienNopMinhChung request)
    {
        try
        {
            var errorMessageParam = new SqlParameter
            {
                ParameterName = "@error_message",
                SqlDbType = SqlDbType.NVarChar,
                Size = 500,
                Direction = ParameterDirection.Output
            };

            await _context.Database.ExecuteSqlRawAsync(
                "EXEC dbo.sp_GiaoVienNopMinhChung @nguoi_dung_id, @hoat_dong_id, @loai_hanh_dong, @minh_chung, @error_message OUTPUT",
                new SqlParameter("@nguoi_dung_id", request.nguoi_dung_id),
                new SqlParameter("@hoat_dong_id", request.hoat_dong_id),
                new SqlParameter("@loai_hanh_dong", request.loai_hanh_dong ?? string.Empty),
                new SqlParameter("@minh_chung", request.minh_chung ?? string.Empty),
                errorMessageParam
            );

            string resultMessage = errorMessageParam.Value?.ToString();

            if (!string.IsNullOrEmpty(resultMessage))
            {
                if (resultMessage.Contains("thành công"))
                {
                    return Ok(new { message = resultMessage });
                }
                return BadRequest(new { message = resultMessage });
            }

            return StatusCode(500, new { message = "Không nhận được thông báo từ hệ thống." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi hệ thống", error = ex.Message });
        }
    }









}
