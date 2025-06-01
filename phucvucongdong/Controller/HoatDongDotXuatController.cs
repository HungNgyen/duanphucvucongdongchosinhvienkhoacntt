using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using phucvucongdong.Data;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;


[ApiController]
[Route("api/[controller]")]
public class HoatDongDotXuatController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public HoatDongDotXuatController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var entities = _context.HoatDongDotXuats.ToList();
        var dtos = _mapper.Map<List<HoatDongDotXuatDto>>(entities);
        return Ok(dtos);
    }

    [HttpPost]
    public IActionResult Create(HoatDongDotXuatDto dto)
    {
        var entity = _mapper.Map<HoatDongDotXuat>(dto);
        _context.HoatDongDotXuats.Add(entity);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAll), new { id = entity.nguoi_dung_id }, dto);
    }
}
