



using System.Data;
using System.Text;
using System.Text.RegularExpressions;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using phucvucongdong.Data;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;
using phucvucongdong.Models;


[Authorize]
[ApiController]
[Route("api/[controller]")]
public class GiaoVienController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public GiaoVienController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // Lấy thông tin giáo viên theo ID

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGiaoVien(int id)
    {
        var giaoVien = await _context.GiaoViens
            .Include(gv => gv.NguoiDung)
            .ThenInclude(nd => nd.TaiKhoan)
            .Where(gv => gv.giao_vien_id == id)
            .FirstOrDefaultAsync();

        if (giaoVien == null) return NotFound("Không tìm thấy giáo viên!");

        return Ok(giaoVien);
    }



    // Xóa giáo viên
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGiaoVien(int id)
    {
        var giaoVien = await _context.GiaoViens
            .Include(gv => gv.NguoiDung)
            .FirstOrDefaultAsync(gv => gv.giao_vien_id == id);

        if (giaoVien == null) return NotFound();

        _context.GiaoViens.Remove(giaoVien);
        await _context.SaveChangesAsync();
        return NoContent();
    }






    [HttpGet]
    public async Task<ActionResult<IEnumerable<GiaoVienDto>>> GetAllGiaoVien()
    {
        var giaoviens = await _context.GiaoVienDtoGets
            .FromSqlRaw("EXEC sp_GetAllTaiKhoan_GiaoVien")
            .ToListAsync();

        return Ok(giaoviens);
    }



    [HttpPost("add-giaovien")]
    public async Task<IActionResult> AddGiaoVien([FromBody] GiaoVienDto dto)
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
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_TaiKhoanGiaoVienAdd @ho_ten_giao_vien, @vai_tro, @phong_ban, @thong_tin_lien_he, @ten_dang_nhap, @mat_khau, @phan_quyen, @trang_thai, @ma_so_giao_vien, @chuc_vu",
                new SqlParameter("@ho_ten_giao_vien", dto.ho_ten_giao_vien),
                new SqlParameter("@vai_tro", dto.vai_tro),
                new SqlParameter("@phong_ban", dto.phong_ban ?? (object)DBNull.Value),
                new SqlParameter("@thong_tin_lien_he", dto.thong_tin_lien_he ?? (object)DBNull.Value),
                new SqlParameter("@ten_dang_nhap", dto.ten_dang_nhap),
                new SqlParameter("@mat_khau", dto.mat_khau),
                new SqlParameter("@phan_quyen", dto.phan_quyen),
                new SqlParameter("@trang_thai", dto.trang_thai ?? "Hoạt động"),
                new SqlParameter("@ma_so_giao_vien", dto.ma_so_giao_vien),
                new SqlParameter("@chuc_vu", dto.chuc_vu ?? (object)DBNull.Value)
            );

            return Ok(new { message = "Thêm giáo viên thành công!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi thêm giáo viên", error = ex.Message });
        }
    }








    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGiaoVien(int id, [FromBody] GiaoVienDto dto)
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
            // ⚠ Kiểm tra giáo viên có tồn tại không
            var existingGiaoVien = await _context.GiaoViens.FindAsync(id);
            if (existingGiaoVien == null)
            {
                return NotFound(new { message = "Không tìm thấy giáo viên." });
            }

            // ⚠ Kiểm tra mã số giáo viên đã tồn tại nhưng không phải của giáo viên này
            bool isMaSoGiaoVienExists = await _context.GiaoViens
                .AnyAsync(gv => gv.ma_so_giao_vien == dto.ma_so_giao_vien && gv.giao_vien_id != id);
            if (isMaSoGiaoVienExists)
            {
                return BadRequest(new { message = "Mã số giáo viên đã tồn tại." });
            }

            // ⚠ Kiểm tra tên đăng nhập đã tồn tại nhưng không phải của giáo viên này
            bool isTenDangNhapExists = await _context.TaiKhoan
                .AnyAsync(tk => tk.ten_dang_nhap == dto.ten_dang_nhap && tk.nguoi_dung_id != existingGiaoVien.nguoi_dung_id);
            if (isTenDangNhapExists)
            {
                return BadRequest(new { message = "Tên đăng nhập đã tồn tại." });
            }

            // 🛠 Tạo biến OUTPUT để lấy số dòng bị ảnh hưởng
            var rowsAffectedParam = new SqlParameter("@rowsAffected", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };

            dto.vai_tro = dto.vai_tro?.Trim();

            Console.WriteLine($"== DEBUG VaiTro = '{dto.vai_tro}', Length = {dto.vai_tro.Length}, Bytes = {string.Join(",", Encoding.UTF8.GetBytes(dto.vai_tro))} ==");

            // ⚡ Gọi Stored Procedure
            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_TaiKhoanGiaoVienUpdate3 @giao_vien_id, @ho_ten_giao_vien, @vai_tro, @phong_ban, " +
                "@thong_tin_lien_he, @ten_dang_nhap, @mat_khau, @phan_quyen, @trang_thai, @ma_so_giao_vien, @chuc_vu, @rowsAffected OUTPUT",
                new SqlParameter("@giao_vien_id", id),
                new SqlParameter("@ho_ten_giao_vien", dto.ho_ten_giao_vien),
                new SqlParameter("@vai_tro", dto.vai_tro),
                new SqlParameter("@phong_ban", dto.phong_ban ?? (object)DBNull.Value),
                new SqlParameter("@thong_tin_lien_he", dto.thong_tin_lien_he ?? (object)DBNull.Value),
                new SqlParameter("@ten_dang_nhap", dto.ten_dang_nhap),
                new SqlParameter("@mat_khau", string.IsNullOrEmpty(dto.mat_khau) ? (object)DBNull.Value : dto.mat_khau),
                new SqlParameter("@phan_quyen", dto.phan_quyen),
                new SqlParameter("@trang_thai", dto.trang_thai ?? "Hoạt động"),
                new SqlParameter("@ma_so_giao_vien", dto.ma_so_giao_vien),
                new SqlParameter("@chuc_vu", dto.chuc_vu ?? (object)DBNull.Value),
                rowsAffectedParam
            );

            int rowsAffected = (int)rowsAffectedParam.Value;
            if (rowsAffected > 0)
            {
                return Ok(new { message = "Cập nhật giáo viên thành công!" });
            }
            else
            {
                return NotFound(new { message = "Không có dữ liệu nào được cập nhật." });
            }
        }
        catch (SqlException sqlEx)
        {
            return StatusCode(500, new { message = "Lỗi SQL khi cập nhật giáo viên", error = sqlEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi cập nhật giáo viên", error = ex.Message });
        }
    }




    [HttpGet("sinh-vien-lop-phu-trach/{giaoVienId}")]
    public async Task<ActionResult<IEnumerable<SinhVienTrongLopDto>>> GetSinhVienLopPhuTrach(int giaoVienId)
    {
        var result = await _context.SinhVienTrongLopDtos
            .FromSqlRaw("EXEC sp_GetSinhVienTrongLopPhuTrach @giao_vien_id = {0}", giaoVienId)
            .ToListAsync();

        return Ok(result);
    }



    [HttpGet("lop-phu-trach/{giao_vien_id}")]
    public async Task<ActionResult<IEnumerable<LopPhuTrach>>> GetLopPhuTrach(int giao_vien_id)
    {
        var result = await _context.LopPhuTrachs
            .FromSqlRaw("EXEC sp_GiaoVienGetLopPhuTrach @giao_vien_id = {0}", giao_vien_id)
            .ToListAsync();

        return Ok(result);
    }

    [HttpPost("xacnhanminhchungcuasinhvien")]
    public async Task<IActionResult> XacNhanMinhChung([FromBody] GiaoVienXacNhanMinhChungCuaSinhVien dto)
    {
        try
        {
            var sql = "EXEC sp_GiaoVienXacNhanMinhChungCuaSinhVien4 @sinh_vien_id, @hoat_dong_id, @xac_nhan";

            var parameters = new[]
            {
            new SqlParameter("@sinh_vien_id", dto.sinh_vien_id),
            new SqlParameter("@hoat_dong_id", dto.hoat_dong_id),
            new SqlParameter("@xac_nhan", dto.xac_nhan)
        };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);

            return Ok(new { message = "Cập nhật minh chứng thành công." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }





    [HttpGet("danh-sach-giao-vien")]
    public async Task<IActionResult> GetDanhSachGiaoVien([FromQuery] int nguoi_dung_id)
    {
        try
        {
            var giaoVienList = await _context
                .QuanSinh_LayDanhSachGiaoViens
                .FromSqlRaw("EXEC sp_QuanSinh_LayDanhSachGiaoVien @nguoi_dung_id = {0}", nguoi_dung_id)
                .ToListAsync();

            return Ok(giaoVienList);
        }
        catch (SqlException ex)
        {
            // Trả về thông báo lỗi khi người dùng không có quyền
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("thong-tin-giao-vien")]
    public async Task<IActionResult> GetThongTinGiaoVien([FromQuery] int giao_vien_id)
    {
        var result = await _context
            .QuanSinh_LayDanhSachGiaoViens
            .FromSqlRaw("EXEC sp_LayThongTinGiaoVien2 @giao_vien_id = {0}", giao_vien_id)
            .FirstOrDefaultAsync();

        if (result == null)
            return NotFound();

        return Ok(result);
    }



    [HttpGet("danh-sach-lop-sinh-vien")]
    public async Task<IActionResult> GetDanhLopSinhVien([FromQuery] int nguoi_dung_id)
    {
        try
        {
            var giaoVienList = await _context
                .QuanSinh_LayDanhSachLopCuaSinhViens
                .FromSqlRaw("EXEC sp_QuanSinh_LayDanhSachLopSinhVien @nguoi_dung_id = {0}", nguoi_dung_id)
                .ToListAsync();

            return Ok(giaoVienList);
        }
        catch (SqlException ex)
        {
            // Trả về thông báo lỗi khi người dùng không có quyền
            return BadRequest(new { message = ex.Message });
        }
    }



    [HttpGet("danh-sach-tat-ca-sinh-vien")]
    public async Task<IActionResult> GetTatCaSinhVien([FromQuery] int nguoi_dung_id)
    {
        try
        {
            var giaoVienList = await _context
                .DanhSachSinhVienTheoLops
                .FromSqlRaw("EXEC sp_QuanSinh_LayTatCaSinhVien @nguoi_dung_id = {0}", nguoi_dung_id)
                .ToListAsync();

            return Ok(giaoVienList);
        }
        catch (SqlException ex)
        {
            // Trả về thông báo lỗi khi người dùng không có quyền
            return BadRequest(new { message = ex.Message });
        }
    }




    [HttpGet("danh-sach-sinh-vien-theo-lop")]
    public async Task<IActionResult> GetDanhSachSinhVienTheoLop([FromQuery] string lop)
    {
        try
        {
            var sinhVienList = await _context
                .DanhSachSinhViens
                .FromSqlRaw("EXEC sp_QuanSinh_LayTatCaSinhVien2 @lop = {0}", lop)
                .ToListAsync();

            return Ok(sinhVienList);
        }
        catch (SqlException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }




    [HttpGet("hoat-dong-giao-vien-tham-gia/{giaoVienId}")]
    public async Task<IActionResult> GetHoatDongGiaoVienThamGia(int giaoVienId)
    {
        var result = await _context.HoatDongChiTietMaGiaoVienThamGias
            .FromSqlRaw("EXEC sp_GetHoatDongMaGiaoVienThamGia @giao_vien_id = {0}", giaoVienId)
            .ToListAsync();

        return Ok(result);
    }




    [HttpPost("giaovientaohoatdongcanhan")]
    public async Task<IActionResult> GiaoVienTaoHoatDongCaNhan([FromBody] HoatDongCaNhanCuaGiaoVien dto)
    {
        try
        {
            using (var connection = _context.Database.GetDbConnection())
            {
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "sp_GiaoVienTaoHoatDongCaNhan";
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





}
