using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using phucvucongdong.Data;
using phucvucongdong.DTO;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;
using System.Collections.Generic;
using System.Linq;

namespace phucvucongdong.Controller
{

    [ApiController]
    [Route("api/[controller]")]
    public class LichSuController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public LichSuController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllLichSu()
        {
            var lichSus = await _context.LichSus
                .FromSqlRaw("EXEC sp_LichSuGetAll")
                .ToListAsync();

            return Ok(lichSus);
        }




        [HttpGet("get-by-user/{userId}")]
        public async Task<IActionResult> GetLichSuByUser(int userId)
        {
            var lichSu = _context.LichSus
                .FromSqlRaw("EXEC sp_LichSuGetByNguoiDung3 @p0", userId)
                .ToList();

            if (lichSu == null || !lichSu.Any())
            {
                return NotFound("Không có lịch sử nào cho người dùng này.");
            }

            // Load dữ liệu cho navigation properties
            foreach (var ls in lichSu)
            {
                _context.Entry(ls).Reference(ls => ls.NguoiDungs).Load();
                _context.Entry(ls).Reference(ls => ls.HoatDong).Load();
            }

            return Ok(lichSu);
        }









    }

}
