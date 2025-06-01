using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace phucvucongdong.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNguoiDung : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MatKhau",
                schema: "pvcd",
                table: "TaiKhoan");

            migrationBuilder.DropColumn(
                name: "TenDangNhap",
                schema: "pvcd",
                table: "TaiKhoan");
        }
    }
}
