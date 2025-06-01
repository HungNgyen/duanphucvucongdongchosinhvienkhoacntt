using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace phucvucongdong.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNguoiDungTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VaiTro",
                table: "NguoiDung",
                newName: "vai_tro");

            migrationBuilder.RenameColumn(
                name: "ThongTinLienHe",
                table: "NguoiDung",
                newName: "thong_tin_lien_he");

            migrationBuilder.RenameColumn(
                name: "PhongBan",
                table: "NguoiDung",
                newName: "phong_ban");

            migrationBuilder.RenameColumn(
                name: "HoTen",
                table: "NguoiDung",
                newName: "ho_ten");

            migrationBuilder.RenameColumn(
                name: "NguoiDungId",
                table: "NguoiDung",
                newName: "nguoi_dung_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "vai_tro",
                table: "NguoiDung",
                newName: "VaiTro");

            migrationBuilder.RenameColumn(
                name: "thong_tin_lien_he",
                table: "NguoiDung",
                newName: "ThongTinLienHe");

            migrationBuilder.RenameColumn(
                name: "phong_ban",
                table: "NguoiDung",
                newName: "PhongBan");

            migrationBuilder.RenameColumn(
                name: "ho_ten",
                table: "NguoiDung",
                newName: "HoTen");

            migrationBuilder.RenameColumn(
                name: "nguoi_dung_id",
                table: "NguoiDung",
                newName: "NguoiDungId");
        }
    }
}
