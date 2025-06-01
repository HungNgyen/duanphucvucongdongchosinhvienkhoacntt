using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace phucvucongdong.Migrations
{
    /// <inheritdoc />
    public partial class AddDanhMucPVCongDong : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MatKhau",
                schema: "pvcd",
                table: "TaiKhoan");

            migrationBuilder.DropColumn(
                name: "TenDangNhap",
                schema: "pvcd",
                table: "TaiKhoan");

            migrationBuilder.RenameTable(
                name: "HoatDong",
                newName: "HoatDong",
                newSchema: "pvcd");

            migrationBuilder.RenameTable(
                name: "DanhMucPVCongDong",
                newName: "DanhMucPVCongDong",
                newSchema: "pvcd");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "HoatDong",
                schema: "pvcd",
                newName: "HoatDong");

            migrationBuilder.RenameTable(
                name: "DanhMucPVCongDong",
                schema: "pvcd",
                newName: "DanhMucPVCongDong");

            migrationBuilder.AddColumn<string>(
                name: "MatKhau",
                schema: "pvcd",
                table: "TaiKhoan",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TenDangNhap",
                schema: "pvcd",
                table: "TaiKhoan",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
