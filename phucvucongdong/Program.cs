

using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using phucvucongdong.Data;
using phucvucongdong.DTO;
using phucvucongdong.DTOs;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;
using phucvucongdong.Models;

namespace phucvucongdong;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddAuthorization();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // builder.Services.AddDbContext<AppDbContext>(op=>op.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Đọc chuỗi kết nối từ appsettings.json
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

        // Cấu hình DbContext với Entity Framework
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString));

        builder.Services.AddControllers();

        builder.Services.AddAutoMapper(typeof(MappingProfile));

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend",
                policy => policy.WithOrigins("http://localhost:3000") // URL của Frontend
                                .AllowAnyHeader()
                                .AllowAnyMethod());
        });


        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                };
            });
        builder.Services.AddAuthorization();


        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
 

        app.UseHttpsRedirection();
        app.UseCors("AllowFrontend");
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        var summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        app.MapGet("/weatherforecast", (HttpContext httpContext) =>
        {
            var forecast = Enumerable.Range(1, 5).Select(index =>
                new WeatherForecast
                {
                    Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = summaries[Random.Shared.Next(summaries.Length)]
                })
                .ToArray();
            return forecast;
        })
        .WithName("GetWeatherForecast")
        .WithOpenApi();

        app.Run();
    }


    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Định nghĩa ánh xạ cho từng Entity và DTO
            CreateMap<NguoiDung, NguoiDungDto>();
            CreateMap<NguoiDungDto, NguoiDung>();

            CreateMap<GiaoVien, GiaoVienDto>();
            CreateMap<GiaoVienDto, GiaoVien>();

            CreateMap<SinhVien, SinhVienDto>();
            CreateMap<SinhVienDto, SinhVien>();

            CreateMap<LichSu, LichSuDto>();
            CreateMap<LichSuDto, LichSu>();

            CreateMap<HoatDong, HoatDongDto>();
            CreateMap<HoatDongDto, HoatDong>();

            CreateMap<DangKyGiaoVien, DangKyGiaoVienDto>();
            CreateMap<DangKyGiaoVienDto, DangKyGiaoVien>();

            CreateMap<ThamGiaSinhVien, ThamGiaSinhVienDto>();
            CreateMap<ThamGiaSinhVienDto, ThamGiaSinhVien>();

            CreateMap<TieuChi, TieuChiDto>();
            CreateMap<TieuChiDto, TieuChi>();

            CreateMap<DanhMucPVCongDong, DanhMucPVCongDongDto>();
            CreateMap<DanhMucPVCongDongDto, DanhMucPVCongDong>();

            CreateMap<HoatDongDotXuat, HoatDongDotXuatDto>();
            CreateMap<HoatDongDotXuatDto, HoatDongDotXuat>();

            CreateMap<TaiKhoan, TaiKhoanDto>();
            // Không cần CreateTaiKhoanDto nếu không có chức năng tạo tài khoản
            CreateMap<UpdateTaiKhoanDto, TaiKhoan>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}






















