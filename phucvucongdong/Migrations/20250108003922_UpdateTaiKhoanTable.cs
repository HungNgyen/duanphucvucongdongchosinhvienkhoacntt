using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace phucvucongdong.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTaiKhoanTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DangKyGiaoVien_GiaoVien_GiaoVienId",
                table: "DangKyGiaoVien");

            migrationBuilder.DropForeignKey(
                name: "FK_DangKyGiaoVien_HoatDong_HoatDongId",
                table: "DangKyGiaoVien");

            migrationBuilder.DropForeignKey(
                name: "FK_GiaoVien_NguoiDung_NguoiDungId",
                table: "GiaoVien");

            migrationBuilder.DropForeignKey(
                name: "FK_HoatDong_TieuChi_TieuChiId",
                table: "HoatDong");

            migrationBuilder.DropForeignKey(
                name: "FK_HoatDongDotXuat_NguoiDung_NguoiDungId",
                table: "HoatDongDotXuat");

            migrationBuilder.DropForeignKey(
                name: "FK_SinhVien_NguoiDung_NguoiDungId",
                table: "SinhVien");

            migrationBuilder.DropForeignKey(
                name: "FK_ThamGiaSinhVien_HoatDong_HoatDongId",
                table: "ThamGiaSinhVien");

            migrationBuilder.DropForeignKey(
                name: "FK_ThamGiaSinhVien_SinhVien_SinhVienId",
                table: "ThamGiaSinhVien");

            migrationBuilder.DropForeignKey(
                name: "FK_TieuChi_DanhMucPVCongDong_DanhMucId",
                table: "TieuChi");

            migrationBuilder.DropColumn(
                name: "MoTa",
                table: "TieuChi");

            migrationBuilder.DropColumn(
                name: "MinhChung",
                table: "ThamGiaSinhVien");

            migrationBuilder.DropColumn(
                name: "TrangThai",
                table: "ThamGiaSinhVien");

            migrationBuilder.DropColumn(
                name: "MinhChung",
                table: "HoatDongDotXuat");

            migrationBuilder.DropColumn(
                name: "MoTa",
                table: "HoatDongDotXuat");

            migrationBuilder.DropColumn(
                name: "MoTa",
                table: "HoatDong");

            migrationBuilder.DropColumn(
                name: "ChucVu",
                table: "GiaoVien");

            migrationBuilder.DropColumn(
                name: "MoTa",
                table: "DanhMucPVCongDong");

            migrationBuilder.EnsureSchema(
                name: "pvcd");

            migrationBuilder.RenameColumn(
                name: "Diem",
                table: "TieuChi",
                newName: "diem");

            migrationBuilder.RenameColumn(
                name: "TenTieuChi",
                table: "TieuChi",
                newName: "ten_tieu_chi");

            migrationBuilder.RenameColumn(
                name: "DanhMucId",
                table: "TieuChi",
                newName: "danh_muc_id");

            migrationBuilder.RenameColumn(
                name: "TieuChiId",
                table: "TieuChi",
                newName: "tieu_chi_id");

            migrationBuilder.RenameIndex(
                name: "IX_TieuChi_DanhMucId",
                table: "TieuChi",
                newName: "IX_TieuChi_danh_muc_id");

            migrationBuilder.RenameColumn(
                name: "HoatDongId",
                table: "ThamGiaSinhVien",
                newName: "hoat_dong_id");

            migrationBuilder.RenameColumn(
                name: "SinhVienId",
                table: "ThamGiaSinhVien",
                newName: "sinh_vien_id");

            migrationBuilder.RenameIndex(
                name: "IX_ThamGiaSinhVien_HoatDongId",
                table: "ThamGiaSinhVien",
                newName: "IX_ThamGiaSinhVien_hoat_dong_id");

            migrationBuilder.RenameColumn(
                name: "Nganh",
                table: "SinhVien",
                newName: "nganh");

            migrationBuilder.RenameColumn(
                name: "Lop",
                table: "SinhVien",
                newName: "lop");

            migrationBuilder.RenameColumn(
                name: "NguoiDungId",
                table: "SinhVien",
                newName: "nguoi_dung_id");

            migrationBuilder.RenameColumn(
                name: "SinhVienId",
                table: "SinhVien",
                newName: "sinh_vien_id");

            migrationBuilder.RenameIndex(
                name: "IX_SinhVien_NguoiDungId",
                table: "SinhVien",
                newName: "IX_SinhVien_nguoi_dung_id");

            migrationBuilder.RenameColumn(
                name: "HocKy",
                table: "HoatDongDotXuat",
                newName: "hoc_ky");

            migrationBuilder.RenameColumn(
                name: "NamHoc",
                table: "HoatDongDotXuat",
                newName: "nam_hoc");

            migrationBuilder.RenameColumn(
                name: "TenHoatDong",
                table: "HoatDongDotXuat",
                newName: "ten_hoat_dong");

            migrationBuilder.RenameColumn(
                name: "NguoiDungId",
                table: "HoatDongDotXuat",
                newName: "nguoi_dung_id");

            migrationBuilder.RenameColumn(
                name: "TieuChiId",
                table: "HoatDong",
                newName: "tieu_chi_id");

            migrationBuilder.RenameColumn(
                name: "TenHoatDong",
                table: "HoatDong",
                newName: "ten_hoat_dong");

            migrationBuilder.RenameColumn(
                name: "HoatDongId",
                table: "HoatDong",
                newName: "hoat_dong_id");

            migrationBuilder.RenameIndex(
                name: "IX_HoatDong_TieuChiId",
                table: "HoatDong",
                newName: "IX_HoatDong_tieu_chi_id");

            migrationBuilder.RenameColumn(
                name: "NguoiDungId",
                table: "GiaoVien",
                newName: "nguoi_dung_id");

            migrationBuilder.RenameColumn(
                name: "GiaoVienId",
                table: "GiaoVien",
                newName: "giao_vien_id");

            migrationBuilder.RenameIndex(
                name: "IX_GiaoVien_NguoiDungId",
                table: "GiaoVien",
                newName: "IX_GiaoVien_nguoi_dung_id");

            migrationBuilder.RenameColumn(
                name: "TenDanhMuc",
                table: "DanhMucPVCongDong",
                newName: "ten_danh_muc");

            migrationBuilder.RenameColumn(
                name: "DanhMucId",
                table: "DanhMucPVCongDong",
                newName: "danh_muc_id");

            migrationBuilder.RenameColumn(
                name: "Diem",
                table: "DangKyGiaoVien",
                newName: "diem");

            migrationBuilder.RenameColumn(
                name: "TrangThai",
                table: "DangKyGiaoVien",
                newName: "trang_thai");

            migrationBuilder.RenameColumn(
                name: "NamHoc",
                table: "DangKyGiaoVien",
                newName: "nam_hoc");

            migrationBuilder.RenameColumn(
                name: "HoatDongId",
                table: "DangKyGiaoVien",
                newName: "hoat_dong_id");

            migrationBuilder.RenameColumn(
                name: "GiaoVienId",
                table: "DangKyGiaoVien",
                newName: "giao_vien_id");

            migrationBuilder.RenameIndex(
                name: "IX_DangKyGiaoVien_HoatDongId",
                table: "DangKyGiaoVien",
                newName: "IX_DangKyGiaoVien_hoat_dong_id");

            migrationBuilder.AddColumn<string>(
                name: "mo_ta",
                table: "TieuChi",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "minh_chung",
                table: "ThamGiaSinhVien",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "trang_thai",
                table: "ThamGiaSinhVien",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "nganh",
                table: "SinhVien",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "lop",
                table: "SinhVien",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "vai_tro",
                table: "NguoiDung",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "thong_tin_lien_he",
                table: "NguoiDung",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "phong_ban",
                table: "NguoiDung",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<string>(
                name: "minh_chung",
                table: "HoatDongDotXuat",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "mo_ta",
                table: "HoatDongDotXuat",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "mo_ta",
                table: "HoatDong",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "chuc_vu",
                table: "GiaoVien",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "mo_ta",
                table: "DanhMucPVCongDong",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TaiKhoan",
                schema: "pvcd",
                columns: table => new
                {
                    tai_khoan_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nguoi_dung_id = table.Column<int>(type: "int", nullable: false),
                    ten_dang_nhap = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    mat_khau = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    phan_quyen = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    trang_thai = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ngay_tao = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaiKhoan", x => x.tai_khoan_id);
                    table.ForeignKey(
                        name: "FK_TaiKhoan_NguoiDung_nguoi_dung_id",
                        column: x => x.nguoi_dung_id,
                        principalTable: "NguoiDung",
                        principalColumn: "nguoi_dung_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaiKhoan_nguoi_dung_id",
                schema: "pvcd",
                table: "TaiKhoan",
                column: "nguoi_dung_id");

            migrationBuilder.AddForeignKey(
                name: "FK_DangKyGiaoVien_GiaoVien_giao_vien_id",
                table: "DangKyGiaoVien",
                column: "giao_vien_id",
                principalTable: "GiaoVien",
                principalColumn: "giao_vien_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DangKyGiaoVien_HoatDong_hoat_dong_id",
                table: "DangKyGiaoVien",
                column: "hoat_dong_id",
                principalTable: "HoatDong",
                principalColumn: "hoat_dong_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GiaoVien_NguoiDung_nguoi_dung_id",
                table: "GiaoVien",
                column: "nguoi_dung_id",
                principalTable: "NguoiDung",
                principalColumn: "nguoi_dung_id");

            migrationBuilder.AddForeignKey(
                name: "FK_HoatDong_TieuChi_tieu_chi_id",
                table: "HoatDong",
                column: "tieu_chi_id",
                principalTable: "TieuChi",
                principalColumn: "tieu_chi_id");

            migrationBuilder.AddForeignKey(
                name: "FK_HoatDongDotXuat_NguoiDung_nguoi_dung_id",
                table: "HoatDongDotXuat",
                column: "nguoi_dung_id",
                principalTable: "NguoiDung",
                principalColumn: "nguoi_dung_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SinhVien_NguoiDung_nguoi_dung_id",
                table: "SinhVien",
                column: "nguoi_dung_id",
                principalTable: "NguoiDung",
                principalColumn: "nguoi_dung_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ThamGiaSinhVien_HoatDong_hoat_dong_id",
                table: "ThamGiaSinhVien",
                column: "hoat_dong_id",
                principalTable: "HoatDong",
                principalColumn: "hoat_dong_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ThamGiaSinhVien_SinhVien_sinh_vien_id",
                table: "ThamGiaSinhVien",
                column: "sinh_vien_id",
                principalTable: "SinhVien",
                principalColumn: "sinh_vien_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TieuChi_DanhMucPVCongDong_danh_muc_id",
                table: "TieuChi",
                column: "danh_muc_id",
                principalTable: "DanhMucPVCongDong",
                principalColumn: "danh_muc_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DangKyGiaoVien_GiaoVien_giao_vien_id",
                table: "DangKyGiaoVien");

            migrationBuilder.DropForeignKey(
                name: "FK_DangKyGiaoVien_HoatDong_hoat_dong_id",
                table: "DangKyGiaoVien");

            migrationBuilder.DropForeignKey(
                name: "FK_GiaoVien_NguoiDung_nguoi_dung_id",
                table: "GiaoVien");

            migrationBuilder.DropForeignKey(
                name: "FK_HoatDong_TieuChi_tieu_chi_id",
                table: "HoatDong");

            migrationBuilder.DropForeignKey(
                name: "FK_HoatDongDotXuat_NguoiDung_nguoi_dung_id",
                table: "HoatDongDotXuat");

            migrationBuilder.DropForeignKey(
                name: "FK_SinhVien_NguoiDung_nguoi_dung_id",
                table: "SinhVien");

            migrationBuilder.DropForeignKey(
                name: "FK_ThamGiaSinhVien_HoatDong_hoat_dong_id",
                table: "ThamGiaSinhVien");

            migrationBuilder.DropForeignKey(
                name: "FK_ThamGiaSinhVien_SinhVien_sinh_vien_id",
                table: "ThamGiaSinhVien");

            migrationBuilder.DropForeignKey(
                name: "FK_TieuChi_DanhMucPVCongDong_danh_muc_id",
                table: "TieuChi");

            migrationBuilder.DropTable(
                name: "TaiKhoan",
                schema: "pvcd");

            migrationBuilder.DropColumn(
                name: "mo_ta",
                table: "TieuChi");

            migrationBuilder.DropColumn(
                name: "minh_chung",
                table: "ThamGiaSinhVien");

            migrationBuilder.DropColumn(
                name: "trang_thai",
                table: "ThamGiaSinhVien");

            migrationBuilder.DropColumn(
                name: "minh_chung",
                table: "HoatDongDotXuat");

            migrationBuilder.DropColumn(
                name: "mo_ta",
                table: "HoatDongDotXuat");

            migrationBuilder.DropColumn(
                name: "mo_ta",
                table: "HoatDong");

            migrationBuilder.DropColumn(
                name: "chuc_vu",
                table: "GiaoVien");

            migrationBuilder.DropColumn(
                name: "mo_ta",
                table: "DanhMucPVCongDong");

            migrationBuilder.RenameColumn(
                name: "diem",
                table: "TieuChi",
                newName: "Diem");

            migrationBuilder.RenameColumn(
                name: "ten_tieu_chi",
                table: "TieuChi",
                newName: "TenTieuChi");

            migrationBuilder.RenameColumn(
                name: "danh_muc_id",
                table: "TieuChi",
                newName: "DanhMucId");

            migrationBuilder.RenameColumn(
                name: "tieu_chi_id",
                table: "TieuChi",
                newName: "TieuChiId");

            migrationBuilder.RenameIndex(
                name: "IX_TieuChi_danh_muc_id",
                table: "TieuChi",
                newName: "IX_TieuChi_DanhMucId");

            migrationBuilder.RenameColumn(
                name: "hoat_dong_id",
                table: "ThamGiaSinhVien",
                newName: "HoatDongId");

            migrationBuilder.RenameColumn(
                name: "sinh_vien_id",
                table: "ThamGiaSinhVien",
                newName: "SinhVienId");

            migrationBuilder.RenameIndex(
                name: "IX_ThamGiaSinhVien_hoat_dong_id",
                table: "ThamGiaSinhVien",
                newName: "IX_ThamGiaSinhVien_HoatDongId");

            migrationBuilder.RenameColumn(
                name: "nganh",
                table: "SinhVien",
                newName: "Nganh");

            migrationBuilder.RenameColumn(
                name: "lop",
                table: "SinhVien",
                newName: "Lop");

            migrationBuilder.RenameColumn(
                name: "nguoi_dung_id",
                table: "SinhVien",
                newName: "NguoiDungId");

            migrationBuilder.RenameColumn(
                name: "sinh_vien_id",
                table: "SinhVien",
                newName: "SinhVienId");

            migrationBuilder.RenameIndex(
                name: "IX_SinhVien_nguoi_dung_id",
                table: "SinhVien",
                newName: "IX_SinhVien_NguoiDungId");

            migrationBuilder.RenameColumn(
                name: "hoc_ky",
                table: "HoatDongDotXuat",
                newName: "HocKy");

            migrationBuilder.RenameColumn(
                name: "nam_hoc",
                table: "HoatDongDotXuat",
                newName: "NamHoc");

            migrationBuilder.RenameColumn(
                name: "ten_hoat_dong",
                table: "HoatDongDotXuat",
                newName: "TenHoatDong");

            migrationBuilder.RenameColumn(
                name: "nguoi_dung_id",
                table: "HoatDongDotXuat",
                newName: "NguoiDungId");

            migrationBuilder.RenameColumn(
                name: "tieu_chi_id",
                table: "HoatDong",
                newName: "TieuChiId");

            migrationBuilder.RenameColumn(
                name: "ten_hoat_dong",
                table: "HoatDong",
                newName: "TenHoatDong");

            migrationBuilder.RenameColumn(
                name: "hoat_dong_id",
                table: "HoatDong",
                newName: "HoatDongId");

            migrationBuilder.RenameIndex(
                name: "IX_HoatDong_tieu_chi_id",
                table: "HoatDong",
                newName: "IX_HoatDong_TieuChiId");

            migrationBuilder.RenameColumn(
                name: "nguoi_dung_id",
                table: "GiaoVien",
                newName: "NguoiDungId");

            migrationBuilder.RenameColumn(
                name: "giao_vien_id",
                table: "GiaoVien",
                newName: "GiaoVienId");

            migrationBuilder.RenameIndex(
                name: "IX_GiaoVien_nguoi_dung_id",
                table: "GiaoVien",
                newName: "IX_GiaoVien_NguoiDungId");

            migrationBuilder.RenameColumn(
                name: "ten_danh_muc",
                table: "DanhMucPVCongDong",
                newName: "TenDanhMuc");

            migrationBuilder.RenameColumn(
                name: "danh_muc_id",
                table: "DanhMucPVCongDong",
                newName: "DanhMucId");

            migrationBuilder.RenameColumn(
                name: "diem",
                table: "DangKyGiaoVien",
                newName: "Diem");

            migrationBuilder.RenameColumn(
                name: "trang_thai",
                table: "DangKyGiaoVien",
                newName: "TrangThai");

            migrationBuilder.RenameColumn(
                name: "nam_hoc",
                table: "DangKyGiaoVien",
                newName: "NamHoc");

            migrationBuilder.RenameColumn(
                name: "hoat_dong_id",
                table: "DangKyGiaoVien",
                newName: "HoatDongId");

            migrationBuilder.RenameColumn(
                name: "giao_vien_id",
                table: "DangKyGiaoVien",
                newName: "GiaoVienId");

            migrationBuilder.RenameIndex(
                name: "IX_DangKyGiaoVien_hoat_dong_id",
                table: "DangKyGiaoVien",
                newName: "IX_DangKyGiaoVien_HoatDongId");

            migrationBuilder.AddColumn<string>(
                name: "MoTa",
                table: "TieuChi",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MinhChung",
                table: "ThamGiaSinhVien",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TrangThai",
                table: "ThamGiaSinhVien",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Nganh",
                table: "SinhVien",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Lop",
                table: "SinhVien",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "vai_tro",
                table: "NguoiDung",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "thong_tin_lien_he",
                table: "NguoiDung",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "phong_ban",
                table: "NguoiDung",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MinhChung",
                table: "HoatDongDotXuat",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MoTa",
                table: "HoatDongDotXuat",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MoTa",
                table: "HoatDong",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ChucVu",
                table: "GiaoVien",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MoTa",
                table: "DanhMucPVCongDong",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_DangKyGiaoVien_GiaoVien_GiaoVienId",
                table: "DangKyGiaoVien",
                column: "GiaoVienId",
                principalTable: "GiaoVien",
                principalColumn: "GiaoVienId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DangKyGiaoVien_HoatDong_HoatDongId",
                table: "DangKyGiaoVien",
                column: "HoatDongId",
                principalTable: "HoatDong",
                principalColumn: "HoatDongId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GiaoVien_NguoiDung_NguoiDungId",
                table: "GiaoVien",
                column: "NguoiDungId",
                principalTable: "NguoiDung",
                principalColumn: "nguoi_dung_id");

            migrationBuilder.AddForeignKey(
                name: "FK_HoatDong_TieuChi_TieuChiId",
                table: "HoatDong",
                column: "TieuChiId",
                principalTable: "TieuChi",
                principalColumn: "TieuChiId");

            migrationBuilder.AddForeignKey(
                name: "FK_HoatDongDotXuat_NguoiDung_NguoiDungId",
                table: "HoatDongDotXuat",
                column: "NguoiDungId",
                principalTable: "NguoiDung",
                principalColumn: "nguoi_dung_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SinhVien_NguoiDung_NguoiDungId",
                table: "SinhVien",
                column: "NguoiDungId",
                principalTable: "NguoiDung",
                principalColumn: "nguoi_dung_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ThamGiaSinhVien_HoatDong_HoatDongId",
                table: "ThamGiaSinhVien",
                column: "HoatDongId",
                principalTable: "HoatDong",
                principalColumn: "HoatDongId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ThamGiaSinhVien_SinhVien_SinhVienId",
                table: "ThamGiaSinhVien",
                column: "SinhVienId",
                principalTable: "SinhVien",
                principalColumn: "SinhVienId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TieuChi_DanhMucPVCongDong_DanhMucId",
                table: "TieuChi",
                column: "DanhMucId",
                principalTable: "DanhMucPVCongDong",
                principalColumn: "DanhMucId");
        }
    }
}
