




using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using phucvucongdong.Models;
using phucvucongdong.DTOs;
using phucvucongdong.Data;
using AutoMapper;
using phucvucongdong.DTO;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;
using phucvucongdong.Model;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace phucvucongdong.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaiKhoanController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration; // Thêm để đọc cấu hình JWT

        public TaiKhoanController(AppDbContext context, IMapper mapper, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }

        // Hàm tạo JWT
        private string GenerateJwtToken(TaiKhoanLoginResult result)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, result.tai_khoan_id.ToString()),
                new Claim("vai_tro", result.vai_tro ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // DELETE: api/TaiKhoan/{id}
        [Authorize(Roles = "Giáo Viên")] // Chỉ Giáo Viên được xóa
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaiKhoan(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { Message = "ID tài khoản không hợp lệ." });
            }

            var taiKhoan = await _context.TaiKhoan.FindAsync(id);

            if (taiKhoan == null)
            {
                return NotFound(new { Message = "Không tìm thấy tài khoản để xóa." });
            }

            _context.TaiKhoan.Remove(taiKhoan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/TaiKhoan/view
        [Authorize] // Yêu cầu xác thực
        [HttpGet("view")]
        public async Task<ActionResult<IEnumerable<TaiKhoanDto>>> GetTaiKhoanView()
        {
            try
            {
                var taiKhoans = await _context.TaiKhoanViewSinhVienDtos
                    .FromSqlRaw("EXEC sp_TaiKhoanGetAll")
                    .ToListAsync();

                return Ok(taiKhoans);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi." });
            }
        }

        // GET: api/TaiKhoan/by-id/{id}
        [Authorize] // Yêu cầu xác thực
        [HttpGet("by-id/{id}")]
        public async Task<ActionResult<TaiKhoanDto>> GetTaiKhoanById(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { Message = "ID tài khoản không hợp lệ." });
            }

            try
            {
                var taiKhoan = _context.TaiKhoanViewSinhVienDtos
                    .FromSqlRaw("EXEC sp_TaiKhoanGetById2 @p0", id)
                    .AsEnumerable()
                    .FirstOrDefault();

                if (taiKhoan == null)
                {
                    return NotFound(new { message = "Không tìm thấy tài khoản." });
                }

                return Ok(taiKhoan);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi." });
            }
        }

        // POST: api/TaiKhoan/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] TaiKhoanDto loginDto)
        {
            if (!ModelState.IsValid || string.IsNullOrWhiteSpace(loginDto.ten_dang_nhap) || string.IsNullOrWhiteSpace(loginDto.mat_khau))
            {
                return BadRequest(new { message = "Tên đăng nhập và mật khẩu là bắt buộc." });
            }

            var result = _context.Database
                .SqlQueryRaw<TaiKhoanLoginResult>(
                    "EXEC sp_TaiKhoan_Login7 @p0, @p1",
                    new object[] { loginDto.ten_dang_nhap, loginDto.mat_khau })
                .AsEnumerable()
                .FirstOrDefault();

            if (result == null || result.tai_khoan_id == null)
            {
                return Unauthorized(new { success = false, message = "Tên đăng nhập hoặc mật khẩu không đúng" });
            }

            object data;

            if (result.vai_tro == "Sinh Viên")
            {
                var sinhVien = new ThongTinTaiKhoanSinhVien
                {
                    tai_khoan_id = result.tai_khoan_id ?? 0,
                    nguoi_dung_id = result.nguoi_dung_id ?? 0,
                    ten_dang_nhap = result.ten_dang_nhap,
                    phan_quyen = result.phan_quyen,
                    trang_thai = result.trang_thai,
                    vai_tro = result.vai_tro,
                    ho_ten_sinh_vien = result.ho_ten_sinh_vien,
                    diem = result.diem,
                    sinh_vien_id = result.sinh_vien_id,
                    nam_hoc = result.nam_hoc,
                    hoc_ky = result.hoc_ky,
                };
                data = sinhVien;
            }
            else if (result.vai_tro == "Giáo Viên")
            {
                var giaoVien = new ThongTinTaiKhoanGiaoVien
                {
                    tai_khoan_id = result.tai_khoan_id ?? 0,
                    nguoi_dung_id = result.nguoi_dung_id ?? 0,
                    ten_dang_nhap = result.ten_dang_nhap,
                    phan_quyen = result.phan_quyen,
                    trang_thai = result.trang_thai,
                    vai_tro = result.vai_tro,
                    ho_ten_giao_vien = result.ho_ten_giao_vien,
                    diem = result.diem,
                    giao_vien_id = result.giao_vien_id
                };
                data = giaoVien;
            }
            else
            {
                data = new
                {
                    tai_khoan_id = result.tai_khoan_id,
                    nguoi_dung_id = result.nguoi_dung_id,
                    ten_dang_nhap = result.ten_dang_nhap,
                    phan_quyen = result.phan_quyen,
                    trang_thai = result.trang_thai?.ToString(),
                    vai_tro = result.vai_tro,

                };
            }

            var token = GenerateJwtToken(result); // Tạo JWT

            return Ok(new
            {
                success = true,
                message = "Đăng nhập thành công",
                data,
                token // Trả về token
            });
        }











        // PUT: api/TaiKhoan/{id}
        [Authorize(Roles = "Giáo Viên")] // Chỉ Giáo Viên được cập nhật
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTaiKhoan(int id, UpdateTaiKhoanDto updateDto)
        {
            if (id <= 0 || updateDto == null)
            {
                return BadRequest(new { Message = "Dữ liệu không hợp lệ." });
            }

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync(
                    "EXEC sp_TaiKhoanLogin_Update @p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8",
                    id,
                    updateDto.mat_khau,
                    updateDto.phan_quyen,
                    updateDto.trang_thai,
                    updateDto.ten_dang_nhap,
                    updateDto.ho_ten,
                    updateDto.vai_tro,
                    updateDto.phong_ban,
                    updateDto.thong_tin_lien_he
                );

                if (result == 0)
                {
                    return NotFound(new { Message = "Không tìm thấy tài khoản để cập nhật." });
                }

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { Message = "Đã xảy ra lỗi." });
            }
        }

        // GET: api/TaiKhoan/quen-mat-khau/view/{maSo}
        [HttpGet("quen-mat-khau/view/{maSo}")]
        public async Task<ActionResult<IEnumerable<ThongTinCuaTaiKhoanQuenMatKhau>>> GetThongTinTaiKhoanQuenMatKhau(string maSo)
        {
            if (string.IsNullOrWhiteSpace(maSo))
            {
                return BadRequest(new { message = "Mã số không hợp lệ." });
            }

            try
            {
                var result = await _context.ThongTinCuaTaiKhoanQuenMatKhaus
                    .FromSqlRaw("EXEC sp_ThongTinTaiKhoanQuenMatKhau2 @MaSo = {0}", maSo)
                    .ToListAsync();

                if (result == null || result.Count == 0)
                {
                    return NotFound(new { message = "Tài khoản không tồn tại." });
                }

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi." });
            }
        }


        [HttpGet("thong-tin/view/{nguoiDungId}")]
        public async Task<ActionResult<IEnumerable<ThongTinGiaoVienSinhVien>>> GetThongTinGiaoVienSinhVien(int nguoiDungId)
        {
            if (nguoiDungId <= 0)
            {
                return BadRequest(new { message = "ID người dùng không hợp lệ." });
            }

            try
            {
                var result = await _context.ThongTinGiaoVienSinhViens
                    .FromSqlRaw("EXEC sp_LayThongTinGiaoVienSinhVien @nguoi_dung_id = {0}", nguoiDungId)
                    .ToListAsync();

                if (result == null || result.Count == 0)
                {
                    return NotFound(new { message = "Người dùng không tồn tại." });
                }

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi." });
            }
        }





        [HttpPost("doi-mat-khau")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            try
            {
                using var command = _context.Database.GetDbConnection().CreateCommand();
                command.CommandText = "EXEC sp_DoiMatKhau @p0, @p1, @p2";
                command.CommandType = System.Data.CommandType.Text;

                // Thêm các tham số cho stored procedure
                command.Parameters.Add(new Microsoft.Data.SqlClient.SqlParameter("@p0", dto.nguoi_dung_id));
                command.Parameters.Add(new Microsoft.Data.SqlClient.SqlParameter("@p1", dto.mat_khau_cu));
                command.Parameters.Add(new Microsoft.Data.SqlClient.SqlParameter("@p2", dto.mat_khau_moi));

                await _context.Database.OpenConnectionAsync();
                using var reader = await command.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    var success = reader.GetInt32(reader.GetOrdinal("Success"));
                    var message = reader.GetString(reader.GetOrdinal("Message"));

                    if (success == 1)
                    {
                        return Ok(new { message = message });
                    }
                    else
                    {
                        return BadRequest(new { message = message });
                    }
                }

                return BadRequest(new { message = "Đổi mật khẩu thất bại!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
            }
        }




        private bool TaiKhoanExists(int id)
        {
            return _context.TaiKhoan.Any(e => e.tai_khoan_id == id);
        }
    }
}