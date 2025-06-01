



using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using phucvucongdong.Data;
using phucvucongdong.DTOs;
using phucvucongdong.Entities;
using AutoMapper;
using System;
using System.Linq;
using System.Threading.Tasks;
using phucvucongdong.DTO;

namespace phucvucongdong.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NopMinhChungHoatDongController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public NopMinhChungHoatDongController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("dang-ky-va-nop-minh-chung")]
        public async Task<IActionResult> DangKyVaNopMinhChung([FromBody] MinhChungHoatDongDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync(
                    "EXEC sp_NopMinhChungHoatDong2 @p0, @p1, @p2, @p3",
                    dto.nguoi_dung_id,
                    dto.hoat_dong_id,
                    dto.loai_minh_chung,
                    dto.duong_dan_minh_chung
                );

                if (result == 0)
                {
                    return BadRequest(new { message = "Không thể nộp minh chứng hoặc đăng ký không hợp lệ." });
                }

                return Ok(new { message = "Nộp minh chứng thành công!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
            }
        }
    }
}
