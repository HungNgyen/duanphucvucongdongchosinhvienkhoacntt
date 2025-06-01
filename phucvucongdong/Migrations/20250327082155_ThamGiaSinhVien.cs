using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace phucvucongdong.Migrations
{
    /// <inheritdoc />
    public partial class ThamGiaSinhVien : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_ThamGiaSinhVien_TrangThai",
                schema: "pvcd",
                table: "ThamGiaSinhVien");

            migrationBuilder.DropCheckConstraint(
                name: "chk_ma_so_giao_vien",
                table: "GiaoVien");

            migrationBuilder.AddColumn<int>(
                name: "LichSulich_su_id",
                table: "NguoiDung",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LichSulich_su_id",
                schema: "pvcd",
                table: "HoatDong",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "nguoi_tao_hoat_dong",
                schema: "pvcd",
                table: "HoatDong",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "so_luong_nguoi_nop_minh_chung",
                schema: "pvcd",
                table: "HoatDong",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "so_luong_nguoi_tham_gia",
                schema: "pvcd",
                table: "HoatDong",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GiaoVienDtoGets",
                columns: table => new
                {
                    nguoi_dung_id = table.Column<int>(type: "int", nullable: false),
                    giao_vien_id = table.Column<int>(type: "int", nullable: false),
                    ma_so_giao_vien = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    chuc_vu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phan_quyen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    trang_thai = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ten_dang_nhap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ho_ten = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    vai_tro = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phong_ban = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    thong_tin_lien_he = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "TaiKhoanSinhVienViewModel",
                columns: table => new
                {
                    nguoi_dung_id = table.Column<int>(type: "int", nullable: false),
                    sinh_vien_id = table.Column<int>(type: "int", nullable: false),
                    ma_so_sinh_vien = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lop = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    nganh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phan_quyen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    trang_thai = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ten_dang_nhap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ho_ten = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    vai_tro = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phong_ban = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    thong_tin_lien_he = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.AddCheckConstraint(
                name: "CK_ThamGiaSinhVien_TrangThai",
                schema: "pvcd",
                table: "ThamGiaSinhVien",
                sql: "[TrangThai] IN ('Hoàn thành','Chua hoàn thành')");

            migrationBuilder.CreateIndex(
                name: "IX_NguoiDung_LichSulich_su_id",
                table: "NguoiDung",
                column: "LichSulich_su_id");

            migrationBuilder.CreateIndex(
                name: "IX_HoatDong_LichSulich_su_id",
                schema: "pvcd",
                table: "HoatDong",
                column: "LichSulich_su_id");

            migrationBuilder.AddForeignKey(
                name: "FK_HoatDong_LichSu_LichSulich_su_id",
                schema: "pvcd",
                table: "HoatDong",
                column: "LichSulich_su_id",
                principalSchema: "pvcd",
                principalTable: "LichSu",
                principalColumn: "lich_su_id");

            migrationBuilder.AddForeignKey(
                name: "FK_NguoiDung_LichSu_LichSulich_su_id",
                table: "NguoiDung",
                column: "LichSulich_su_id",
                principalSchema: "pvcd",
                principalTable: "LichSu",
                principalColumn: "lich_su_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HoatDong_LichSu_LichSulich_su_id",
                schema: "pvcd",
                table: "HoatDong");

            migrationBuilder.DropForeignKey(
                name: "FK_NguoiDung_LichSu_LichSulich_su_id",
                table: "NguoiDung");

            migrationBuilder.DropTable(
                name: "GiaoVienDtoGets");

            migrationBuilder.DropTable(
                name: "TaiKhoanSinhVienViewModel");

            migrationBuilder.DropCheckConstraint(
                name: "CK_ThamGiaSinhVien_TrangThai",
                schema: "pvcd",
                table: "ThamGiaSinhVien");

            migrationBuilder.DropIndex(
                name: "IX_NguoiDung_LichSulich_su_id",
                table: "NguoiDung");

            migrationBuilder.DropIndex(
                name: "IX_HoatDong_LichSulich_su_id",
                schema: "pvcd",
                table: "HoatDong");

            migrationBuilder.DropColumn(
                name: "LichSulich_su_id",
                table: "NguoiDung");

            migrationBuilder.DropColumn(
                name: "LichSulich_su_id",
                schema: "pvcd",
                table: "HoatDong");

            migrationBuilder.DropColumn(
                name: "nguoi_tao_hoat_dong",
                schema: "pvcd",
                table: "HoatDong");

            migrationBuilder.DropColumn(
                name: "so_luong_nguoi_nop_minh_chung",
                schema: "pvcd",
                table: "HoatDong");

            migrationBuilder.DropColumn(
                name: "so_luong_nguoi_tham_gia",
                schema: "pvcd",
                table: "HoatDong");

            migrationBuilder.AddCheckConstraint(
                name: "CK_ThamGiaSinhVien_TrangThai",
                schema: "pvcd",
                table: "ThamGiaSinhVien",
                sql: "[TrangThai] IN ('Hoàn thành','Chưa hoàn thành')");

            migrationBuilder.AddCheckConstraint(
                name: "chk_ma_so_giao_vien",
                table: "GiaoVien",
                sql: "ma_so_giao_vien LIKE '[A-Z][A-Z][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'");
        }
    }
}
