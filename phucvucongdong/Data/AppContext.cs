using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using phucvucongdong.DTOs;
using phucvucongdong.Entities;
using phucvucongdong.Entities.DTO;
using phucvucongdong.Model;
using phucvucongdong.Models;

namespace phucvucongdong.Data
{
    public class AppDbContext : DbContext
    {
        // internal object NguoiDung;

        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<NguoiDung> NguoiDungs { get; set; }
        public DbSet<GiaoVien> GiaoViens { get; set; }
        public DbSet<GiaoVienDtoGet> GiaoVienDtoGets { get; set; }
        public DbSet<SinhVien> SinhViens { get; set; }
        public DbSet<DangKyGiaoVien> DangKyGiaoViens { get; set; }
        public DbSet<DanhMucPVCongDong> DanhMucPVCongDongs { get; set; }
        public DbSet<HoatDong> HoatDongs { get; set; }
        public DbSet<TieuChi> TieuChis { get; set; }
        public DbSet<ThamGiaSinhVien> ThamGiaSinhViens { get; set; }

        public DbSet<HoatDongDotXuat> HoatDongDotXuats { get; set; }

        public DbSet<TaiKhoan> TaiKhoan { get; set; }

        public DbSet<LichSu> LichSus { get; set; }

        //  public DbSet<TaiKhoanDto> TaiKhoanLoginResults { get; set; }



        public DbSet<TaiKhoanSinhVienViewModel> TaiKhoanSinhVienViewModel { get; set; }

        public DbSet<NguoiDungSinhVienDto> NguoiDungSinhVienDtos { get; set; }

        public DbSet<TaiKhoanViewSinhVienDto> TaiKhoanViewSinhVienDtos { get; set; }

        public DbSet<TaiKhoanViewGiaoVienDto> TaiKhoanViewGiaoVienDtos { get; set; }

        // public DbSet<GiaoVienDto> GiaoVienXacNhanMinhChung { get; set; }


        public DbSet<SinhVienTrongLopDto> SinhVienTrongLopDtos { get; set; }  // chỉ dùng để mapping kết quả SP

        public DbSet<LopPhuTrach> LopPhuTrachs { get; set; }


        public DbSet<DanhSachSinhVien> DanhSachSinhViens { get; set; }

        public DbSet<ChiTietHoatDongMaSinhVienThamGia> ChiTietHoatDongMaSinhVienThamGias { get; set; }

        public DbSet<GiaoVienXacNhanMinhChungCuaSinhVien> GiaoVienXacNhanMinhChungCuaSinhViens { get; set; }

        public DbSet<DangKyGiaoVienDto> DangKyGiaoVienDtos { get; set; }

        public DbSet<ThamGiaSinhVienDto> ThamGiaSinhVienDtos { get; set; }

        public DbSet<QuanSinh_LayDanhSachGiaoVien> QuanSinh_LayDanhSachGiaoViens { get; set; }

        public DbSet<QuanSinh_LayDanhSachLopCuaSinhVien> QuanSinh_LayDanhSachLopCuaSinhViens { get; set; }

        public DbSet<DanhSachSinhVienTheoLop> DanhSachSinhVienTheoLops { get; set; }

        public DbSet<HoatDongChiTietMaGiaoVienThamGia> HoatDongChiTietMaGiaoVienThamGias { get; set; }

        public DbSet<QuenMatKhau> QuenMatKhaus { get; set; }

        public DbSet<ThongTinCuaTaiKhoanQuenMatKhau> ThongTinCuaTaiKhoanQuenMatKhaus { get; set; }

        // public DbSet<SinhVienNopMinhChung> SinhVienNopMinhChungs { get; set; }

        public DbSet<ThemSinhVienBatBuoc> ThemSinhVienBatBuocs { get; set; }


        public DbSet<ThongTinGiaoVienSinhVien> ThongTinGiaoVienSinhViens { get; set; }

        public DbSet<ChangePasswordDto> ChangePasswordDtos { get; set; }

        public DbSet<ThongKeHoatDongTheoNamHocHocKy> ThongKeHoatDongTheoNamHocHocKys { get; set; }

        public DbSet<DiemTheoNamHocHocKy> DiemTheoNamHocHocKys { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // base.OnModelCreating(modelBuilder);

            // Bảng TieuChi
            modelBuilder.Entity<TieuChi>()
                .ToTable("TieuChi", "pvcd", t => t.HasCheckConstraint("CK_TieuChi_Diem", "[Diem] >= 0"));

            // Bảng DangKyGiaoVien
            modelBuilder.Entity<DangKyGiaoVien>()
                .ToTable("DangKyGiaoVien", "pvcd", t => t.HasCheckConstraint("CK_DangKyGiaoVien_TrangThai", "[TrangThai] IN ('0', '1', '2')"));

            // Bảng ThamGiaSinhVien
            modelBuilder.Entity<ThamGiaSinhVien>()
                .ToTable("ThamGiaSinhVien", "pvcd", t => t.HasCheckConstraint("CK_ThamGiaSinhVien_TrangThai", "[TrangThai] IN ('Hoàn thành','Chua hoàn thành')"));

            // Bảng HoatDongDotXuat
            modelBuilder.Entity<HoatDongDotXuat>()
        .ToTable("HoatDongDotXuat", t => t.HasCheckConstraint("CK_HoatDongDotXuat_HocKy", "[HocKy] >= 1 AND [HocKy] <= 2"))
        .HasKey(h => new { h.nguoi_dung_id, h.ten_hoat_dong, h.nam_hoc, h.hoc_ky });







            modelBuilder.Entity<LichSu>()
                         .HasKey(ls => ls.lich_su_id);






            modelBuilder.Entity<NguoiDung>()
               .HasKey(nd => nd.nguoi_dung_id); // Khóa chính

            // Cấu hình bảng TaiKhoan (1:1 với NguoiDung)
            modelBuilder.Entity<TaiKhoan>()
                .HasKey(tk => tk.tai_khoan_id); // Khóa chính

            modelBuilder.Entity<TaiKhoan>()
                .HasOne(tk => tk.NguoiDung) // Một tài khoản có một người dùng
                .WithOne(nd => nd.TaiKhoan) // Một người dùng có một tài khoản
                .HasForeignKey<TaiKhoan>(tk => tk.nguoi_dung_id) // Khóa ngoại
                .OnDelete(DeleteBehavior.Cascade); // Xóa người dùng => Xóa tài khoản

            // Cấu hình bảng SinhVien (1:1 với NguoiDung, tùy chọn)
            modelBuilder.Entity<SinhVien>()
                .HasKey(sv => sv.sinh_vien_id); // Khóa chính

            modelBuilder.Entity<SinhVien>()
                .HasOne(sv => sv.NguoiDung) // Một sinh viên có một người dùng
                .WithOne(nd => nd.SinhVien) // Một người dùng có thể có một sinh viên
                .HasForeignKey<SinhVien>(sv => sv.nguoi_dung_id) // Khóa ngoại
                .OnDelete(DeleteBehavior.Cascade); // Xóa người dùng => Xóa sinh viên

            modelBuilder.Entity<GiaoVien>()
                           .HasKey(gv => gv.giao_vien_id);


            modelBuilder.Entity<GiaoVien>()
                     .HasOne(gv => gv.NguoiDung) // Một sinh viên có một người dùng
                     .WithOne(nd => nd.GiaoVien) // Một người dùng có thể có một sinh viên
                     .HasForeignKey<GiaoVien>(gv => gv.nguoi_dung_id) // Khóa ngoại
                     .OnDelete(DeleteBehavior.Cascade); // Xóa người dùng => Xóa sinh viên













            modelBuilder.Entity<DangKyGiaoVien>()
                .HasKey(t => new { t.giao_vien_id, t.hoat_dong_id, t.nam_hoc });


            modelBuilder.Entity<DangKyGiaoVien>()
                           .HasOne(t => t.GiaoVien)
                           .WithMany(s => s.DangKyGiaoViens) // TÊN ĐÚNG: là ICollection<ThamGiaSinhVien>
                           .HasForeignKey(t => t.giao_vien_id)
                           .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DangKyGiaoVien>()
                .HasOne(t => t.HoatDong)
                .WithMany(h => h.DangKyGiaoViens)
                .HasForeignKey(t => t.hoat_dong_id)
                .OnDelete(DeleteBehavior.Cascade);










            modelBuilder.Entity<SinhVien>()
                    .HasIndex(sv => sv.ma_so_sinh_vien)
                    .IsUnique();

            modelBuilder.Entity<GiaoVien>()
                                .HasIndex(sv => sv.ma_so_giao_vien)
                                .IsUnique();


            modelBuilder.Entity<TaiKhoan>()
                .HasIndex(tk => tk.ten_dang_nhap)
                .IsUnique();








            modelBuilder.Entity<GiaoVien>()
                              .HasIndex(sv => sv.ma_so_giao_vien)
                              .IsUnique();



            modelBuilder.Entity<ThamGiaSinhVien>()
                .HasKey(t => new { t.sinh_vien_id, t.hoat_dong_id });





            modelBuilder.Entity<ThamGiaSinhVien>()
                           .HasOne(t => t.SinhVien)
                           .WithMany(s => s.ThamGiaSinhViens) // TÊN ĐÚNG: là ICollection<ThamGiaSinhVien>
                           .HasForeignKey(t => t.sinh_vien_id)
                           .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ThamGiaSinhVien>()
                .HasOne(t => t.HoatDong)
                .WithMany(h => h.ThamGiaSinhViens)
                .HasForeignKey(t => t.hoat_dong_id)
                .OnDelete(DeleteBehavior.Cascade);





            // modelBuilder.Entity<VerificationCode>()
            //                 .HasOne(v => v.NguoiDung)
            //                 .WithMany() // Nếu NguoiDung không có danh sách mã xác nhận
            //                 .HasForeignKey(v => v.nguoi_dung_id)
            //                 .OnDelete(DeleteBehavior.SetNull);









            modelBuilder.Entity<TaiKhoanSinhVienViewModel>().HasNoKey(); // Vì đây là view hoặc stored procedure
            modelBuilder.Entity<GiaoVienDtoGet>().HasNoKey();
            // modelBuilder.Entity<ThamGiaSinhVien>().HasNoKey();

            // modelBuilder.Entity<ThamGiaSinhVienDto>().HasNoKey();

            modelBuilder.Entity<NguoiDungSinhVienDto>().HasNoKey();
            modelBuilder.Entity<TaiKhoanViewSinhVienDto>().HasNoKey();
            modelBuilder.Entity<TaiKhoanViewGiaoVienDto>().HasNoKey();
            modelBuilder.Entity<ThamGiaSinhVienDto>().HasNoKey();
            modelBuilder.Entity<DangKyGiaoVienDto>().HasNoKey();
            modelBuilder.Entity<SinhVienTrongLopDto>().HasNoKey();
            modelBuilder.Entity<LopPhuTrach>().HasNoKey();
            modelBuilder.Entity<DanhSachSinhVien>().HasNoKey();
            modelBuilder.Entity<ChiTietHoatDongMaSinhVienThamGia>().HasNoKey();
            modelBuilder.Entity<GiaoVienXacNhanMinhChungCuaSinhVien>().HasNoKey();
            modelBuilder.Entity<QuanSinh_LayDanhSachGiaoVien>().HasNoKey();
            modelBuilder.Entity<QuanSinh_LayDanhSachLopCuaSinhVien>().HasNoKey();
            modelBuilder.Entity<DanhSachSinhVienTheoLop>().HasNoKey();
            modelBuilder.Entity<HoatDongChiTietMaGiaoVienThamGia>().HasNoKey();
            modelBuilder.Entity<QuenMatKhau>().HasNoKey();
            modelBuilder.Entity<ThongTinCuaTaiKhoanQuenMatKhau>().HasNoKey();
            //   modelBuilder.Entity<SinhVienNopMinhChung>().HasNoKey();

            modelBuilder.Entity<ThemSinhVienBatBuoc>().HasNoKey();


            modelBuilder.Entity<ThongTinGiaoVienSinhVien>().HasNoKey();


            modelBuilder.Entity<ChangePasswordDto>().HasNoKey();

            modelBuilder.Entity<ThongKeHoatDongTheoNamHocHocKy>().HasNoKey();

            modelBuilder.Entity<DiemTheoNamHocHocKy>().HasNoKey();



            base.OnModelCreating(modelBuilder);

        }





        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
            base.OnConfiguring(optionsBuilder);
        }

    }
}
