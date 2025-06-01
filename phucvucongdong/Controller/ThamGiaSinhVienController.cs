




using System.Data;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using phucvucongdong.Data;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;


[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ThamGiaSinhVienController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ThamGiaSinhVienController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }




    [HttpGet("get-by-user/{nguoi_dung_id}")]
    public async Task<IActionResult> GetLichSuByNguoiDungId(int nguoi_dung_id)
    {
        var sinhVien = await _context.SinhViens.FirstOrDefaultAsync(sv => sv.nguoi_dung_id == nguoi_dung_id);
        if (sinhVien == null)
            return NotFound("Không tìm thấy sinh viên tương ứng.");

        var result = await _context.Set<ThamGiaSinhVienDto>()
            .FromSqlRaw("EXEC sp_LichSuThamGiaCuaSinhVien2 @sinh_vien_id = {0}", sinhVien.sinh_vien_id)
            .ToListAsync();

        return Ok(result);
    }





    [HttpPut("{sinhVienId}/{hoatDongId}")]
    public async Task<IActionResult> Update(int sinhVienId, int hoatDongId, [FromBody] ThamGiaSinhVienDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var entity = await _context.ThamGiaSinhViens.FirstOrDefaultAsync(t => t.sinh_vien_id == sinhVienId && t.hoat_dong_id == hoatDongId);
        if (entity == null) return NotFound();

        // Chỉ cập nhật các thông tin khác, không thay đổi sinhVienId và hoatDongId
        entity.trang_thai = dto.trang_thai;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{sinhVienId}/{hoatDongId}")]
    public async Task<IActionResult> Delete(int sinhVienId, int hoatDongId)
    {
        var entity = await _context.ThamGiaSinhViens.FirstOrDefaultAsync(t => t.sinh_vien_id == sinhVienId && t.hoat_dong_id == hoatDongId);
        if (entity == null) return NotFound();

        try
        {
            _context.ThamGiaSinhViens.Remove(entity);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (DbUpdateException)
        {
            return Conflict("Không thể xóa do ràng buộc dữ liệu.");
        }
    }



    [HttpPost("dang-ky")]
    public async Task<IActionResult> DangKyHoatDong([FromBody] ThamGiaSinhVienDto dangKyDto)
    {
        try
        {
            var resultParam = new SqlParameter("@result", SqlDbType.Int) { Direction = ParameterDirection.Output };

            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_SinhVienDangKyHoatDong11 @sinh_vien_id, @hoat_dong_id, @trang_thai, @minh_chung, @result OUTPUT",
                new SqlParameter("@sinh_vien_id", dangKyDto.sinh_vien_id),
                new SqlParameter("@hoat_dong_id", dangKyDto.hoat_dong_id),
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
                return BadRequest(new { message = "Sinh viên không tồn tại!" });
            }
            if (result == -2)
            {
                return BadRequest(new { message = "Sinh viên đã đăng ký hoạt động này!" });
            }

            return StatusCode(500, new { message = "Hoạt động đã đủ số lượng người tham gia!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi hệ thống", error = ex.Message });
        }
    }





    [HttpPost("sinhviennopminhchung")]
    public async Task<IActionResult> NopMinhChung([FromBody] SinhVienNopMinhChung request)
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
                "EXEC dbo.sp_NopMinhChungHoatDong11 @nguoi_dung_id, @hoat_dong_id, @loai_hanh_dong, @minh_chung, @thoi_gian_thuc_hien, @error_message OUTPUT",
                new SqlParameter("@nguoi_dung_id", request.nguoi_dung_id),
                new SqlParameter("@hoat_dong_id", request.hoat_dong_id),
                new SqlParameter("@loai_hanh_dong", request.loai_hanh_dong ?? string.Empty),
                new SqlParameter("@minh_chung", request.minh_chung ?? string.Empty),
                 new SqlParameter
                 {
                     ParameterName = "@thoi_gian_thuc_hien",
                     SqlDbType = SqlDbType.DateTime,
                     Value = DateTime.Now // 👉 lấy thời gian hiện tại
                 },
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




    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _context.ThamGiaSinhVienDtos // => DTO view phù hợp với JOIN kết quả
            .FromSqlRaw("EXEC sp_GetDangKySinhVienAll")
            .ToListAsync();

        return Ok(result);
    }




}
















