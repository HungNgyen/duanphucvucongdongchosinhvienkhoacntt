




using System.Data;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using phucvucongdong.Data;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;
using phucvucongdong.Model;
using phucvucongdong.Models;


[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SinhVienController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public SinhVienController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }



    [HttpGet("{id}")]
    public async Task<IActionResult> GetSinhVien(int id)
    {
        var sinhVien = await _context.SinhViens
            .Include(sv => sv.NguoiDung)
            .ThenInclude(nd => nd.TaiKhoan)
            .Where(sv => sv.sinh_vien_id == id)
            .FirstOrDefaultAsync();

        if (sinhVien == null) return NotFound("Không tìm thấy sinh viên!");

        return Ok(sinhVien);
    }



    [HttpPost("add-sinhvien")]
    public async Task<IActionResult> AddSinhVien([FromBody] SinhVienDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (string.IsNullOrEmpty(dto.vai_tro) || string.IsNullOrEmpty(dto.phan_quyen))
        {
            return BadRequest(new { message = "Trường vai_tro và phan_quyen là bắt buộc." });
        }

        if (string.IsNullOrEmpty(dto.mat_khau))
        {
            return BadRequest(new { message = "Mật khẩu là bắt buộc." });
        }

        try
        {
            // Tạo muối ngẫu nhiên
            string salt = Guid.NewGuid().ToString();
            // Băm mật khẩu với muối
            string saltedPassword = dto.mat_khau + salt;
            byte[] hash = SHA256.HashData(Encoding.UTF8.GetBytes(saltedPassword));
            string hashedPassword = Convert.ToBase64String(hash);

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_ThemTaiKhoanSinhVien2 @ho_ten_sinh_vien, @vai_tro, @phong_ban, @thong_tin_lien_he, @ten_dang_nhap, @mat_khau, @phan_quyen, @trang_thai, @lop, @ma_so_sinh_vien, @nganh",
                new SqlParameter("@ho_ten_sinh_vien", dto.ho_ten_sinh_vien),
                new SqlParameter("@vai_tro", dto.vai_tro),
                new SqlParameter("@phong_ban", dto.phong_ban ?? (object)DBNull.Value),
                new SqlParameter("@thong_tin_lien_he", dto.thong_tin_lien_he ?? (object)DBNull.Value),
                new SqlParameter("@ten_dang_nhap", dto.ten_dang_nhap),
                new SqlParameter("@mat_khau", hashedPassword),
                new SqlParameter("@phan_quyen", dto.phan_quyen),
                new SqlParameter("@trang_thai", dto.trang_thai ?? "Hoạt động"),
                new SqlParameter("@lop", dto.lop),
                new SqlParameter("@ma_so_sinh_vien", dto.ma_so_sinh_vien),
                new SqlParameter("@nganh", dto.nganh),
                new SqlParameter("@salt", salt)
            );

            return Ok(new { message = "Thêm sinh viên thành công!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi thêm sinh viên", error = ex.Message });
        }
    }






    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] SinhVienDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (string.IsNullOrEmpty(dto.vai_tro) || string.IsNullOrEmpty(dto.phan_quyen))
        {
            return BadRequest(new { message = "Trường vai_tro và phan_quyen là bắt buộc." });
        }

        try
        {
            // ⚠ Kiểm tra sinh viên có tồn tại không
            var existingSinhVien = await _context.SinhViens.FindAsync(id);
            if (existingSinhVien == null)
            {
                return NotFound(new { message = "Không tìm thấy sinh viên." });
            }

            // ⚠ Kiểm tra mã số sinh viên đã tồn tại nhưng không phải của sinh viên này
            bool isMaSoSinhVienExists = await _context.SinhViens
                .AnyAsync(sv => sv.ma_so_sinh_vien == dto.ma_so_sinh_vien && sv.sinh_vien_id != id);
            if (isMaSoSinhVienExists)
            {
                return BadRequest(new { message = "Mã số sinh viên đã tồn tại." });
            }

            // ⚠ Kiểm tra tên đăng nhập đã tồn tại nhưng không phải của sinh viên này
            bool isTenDangNhapExists = await _context.TaiKhoan
                .AnyAsync(tk => tk.ten_dang_nhap == dto.ten_dang_nhap && tk.nguoi_dung_id != existingSinhVien.nguoi_dung_id);
            if (isTenDangNhapExists)
            {
                return BadRequest(new { message = "Tên đăng nhập đã tồn tại." });
            }

            // 🛠 Tạo biến OUTPUT để lấy số dòng bị ảnh hưởng
            var rowsAffectedParam = new SqlParameter("@rowsAffected", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };

            // ⚡ Gọi Stored Procedure
            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_UpdateTaiKhoanSinhVien6 @sinh_vien_id, @lop, @nganh, @ma_so_sinh_vien, " +
                "@ho_ten_sinh_vien, @vai_tro, @phong_ban, @thong_tin_lien_he, @ten_dang_nhap, @mat_khau, @phan_quyen, @trang_thai, @rowsAffected OUTPUT",
                new SqlParameter("@sinh_vien_id", id),
                new SqlParameter("@lop", dto.lop ?? (object)DBNull.Value),
                new SqlParameter("@nganh", dto.nganh ?? (object)DBNull.Value),
                new SqlParameter("@ma_so_sinh_vien", dto.ma_so_sinh_vien),
                new SqlParameter("@ho_ten_sinh_vien", dto.ho_ten_sinh_vien),
                new SqlParameter("@vai_tro", dto.vai_tro),
                new SqlParameter("@phong_ban", dto.phong_ban ?? (object)DBNull.Value),
                new SqlParameter("@thong_tin_lien_he", dto.thong_tin_lien_he ?? (object)DBNull.Value),
                new SqlParameter("@ten_dang_nhap", dto.ten_dang_nhap),
                new SqlParameter("@mat_khau", string.IsNullOrEmpty(dto.mat_khau) ? (object)DBNull.Value : dto.mat_khau),
                new SqlParameter("@phan_quyen", dto.phan_quyen),
                new SqlParameter("@trang_thai", dto.trang_thai ?? "Hoạt động"),
                rowsAffectedParam
            );

            int rowsAffected = (int)rowsAffectedParam.Value;
            if (rowsAffected > 0)
            {
                return Ok(new { message = "Cập nhật sinh viên thành công!" });
            }
            else
            {
                return NotFound(new { message = "Không có dữ liệu nào được cập nhật." });
            }
        }
        catch (SqlException sqlEx)
        {
            return StatusCode(500, new { message = "Lỗi SQL khi cập nhật sinh viên", error = sqlEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi cập nhật sinh viên", error = ex.Message });
        }
    }









    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deletedData = await _context.TaiKhoanSinhVienViewModel
            .FromSqlRaw("EXEC sp_DeleteTaiKhoan_SinhVien @p0", id)
            .ToListAsync();

        if (deletedData == null || deletedData.Count == 0)
        {
            return NotFound(new { success = false, message = "Sinh viên không tồn tại!" });
        }

        return Ok(new
        {
            success = true,
            message = "Xóa tài khoản sinh viên thành công!",
            data = deletedData.FirstOrDefault() // Trả về dữ liệu sinh viên vừa bị xóa
        });
    }







    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaiKhoanSinhVienViewModel>>> GetAllSinhVien()
    {
        var sinhviens = await _context.TaiKhoanSinhVienViewModel
            .FromSqlRaw("EXEC sp_GetAllTaiKhoan_SinhVien")
            .ToListAsync();

        return Ok(sinhviens);
    }





    [HttpGet("danhsachsinhvien/{giaoVienId}")]
    public async Task<ActionResult<IEnumerable<DanhSachSinhVien>>> GetSinhVienLopPhuTrach(int giaoVienId)
    {
        var result = await _context.DanhSachSinhViens
            .FromSqlRaw("EXEC sp_GetSinhVienTrongLopPhuTrach @giao_vien_id = {0}", giaoVienId)
            .ToListAsync();

        return Ok(result);
    }

    [HttpGet("{sinhVienId}/chitiethoatdongcuasinhvien")]
    public async Task<IActionResult> GetMinhChung(int sinhVienId)
    {
        var result = await _context.ChiTietHoatDongMaSinhVienThamGias
            .FromSqlRaw("EXEC sp_GetHoatDongMaSinhVienThamGia @sinh_vien_id = {0}", sinhVienId)
            .ToListAsync();

        return Ok(result);
    }




    [HttpPost("sinhvientaohoatdongcanhan")]
    public async Task<IActionResult> SinhVienTaoHoatDongCaNhan([FromBody] SinhVienTaoHoatDongCaNhan dto)
    {
        try
        {
            using (var connection = _context.Database.GetDbConnection())
            {
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "sp_SinhVienTaoHoatDongCaNhan";
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@ten_hoat_dong", dto.ten_hoat_dong));
                    command.Parameters.Add(new SqlParameter("@mo_ta", dto.mo_ta));
                    command.Parameters.Add(new SqlParameter("@ngay_bat_dau", dto.ngay_bat_dau));
                    command.Parameters.Add(new SqlParameter("@ngay_ket_thuc", dto.ngay_ket_thuc));
                    command.Parameters.Add(new SqlParameter("@tieu_chi_id", dto.tieu_chi_id));
                    command.Parameters.Add(new SqlParameter("@nguoi_dung_id", dto.nguoi_dung_id));

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            var result = new
                            {
                                hoat_dong_id = reader["hoat_dong_id"],
                                ten_hoat_dong = reader["ten_hoat_dong"],
                                nguoi_tao_hoat_dong = reader["nguoi_tao_hoat_dong"],
                                diem = reader["diem"]
                            };

                            return Ok(new
                            {
                                message = "Tạo hoạt động thành công.",
                                data = result
                            });
                        }
                        else
                        {
                            return BadRequest(new { message = "Không có dữ liệu trả về." });
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }



    [HttpGet("diemtheonamhochocky/{nguoi_dung_id}")]
    public async Task<IActionResult> GetDiemTheoNamHocVaHocKy(int nguoi_dung_id)
    {
        var result = await _context.DiemTheoNamHocHocKys
            .FromSqlRaw("EXEC GetStudentScoresByYearAndSemester @nguoi_dung_id = {0}", nguoi_dung_id)
            .ToListAsync();

        return Ok(result);
    }


}



