

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using phucvucongdong.Data;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;
using Microsoft.EntityFrameworkCore;

namespace phucvucongdong.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TieuChiController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public TieuChiController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var danhMucList = await _context.TieuChis
                    .FromSqlRaw("EXEC sp_TieuChiGetAll")
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
                var tieuChi = _context.TieuChis
                    .FromSqlRaw("EXEC sp_TieuChiGetById @p0", id)
                    .AsEnumerable()
                    .FirstOrDefault();

                if (tieuChi == null) return NotFound();

                var dto = _mapper.Map<TieuChiDto>(tieuChi);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
            }
        }





        // Thêm tiêu chí mới
        [HttpPost]
        public async Task<IActionResult> Create(TieuChiDto dto)
        {
            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync(
                    "EXEC sp_TieuChiAdd @p0, @p1, @p2, @p3, @p4",
                    new object[]
                    {

                        dto.danh_muc_id ?? (object)DBNull.Value,
                        dto.ten_tieu_chi,
                        dto.mo_ta ?? (object)DBNull.Value,
                        dto.diem ?? (object)DBNull.Value,
                        dto.IsDelete
                    });

                if (result == 0) return BadRequest(new { message = "Thêm thất bại!" });

                return Ok(new { message = "Thêm tiêu chí thành công!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
            }
        }







        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TieuChiDto dto)
        {
            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync(
                    "EXEC sp_TieuChiUpdate @p0, @p1, @p2, @p3, @p4, @p5",
                    new object[]
                    {
                        id,
                        dto.danh_muc_id ?? (object)DBNull.Value,
                        dto.ten_tieu_chi,
                        dto.mo_ta ?? (object)DBNull.Value,
                        dto.diem ?? (object)DBNull.Value,
                        dto.IsDelete
                    });

                if (result == 0) return BadRequest(new { success = false, message = "Cập nhật thất bại!" });

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
                    "EXEC sp_TieuChiDelete @p0",
                    new object[] { id });

                if (result == 0) return BadRequest(new { success = false, message = "Xóa thất bại!" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
            }
        }





    }
}
