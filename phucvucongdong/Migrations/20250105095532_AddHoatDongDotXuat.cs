using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace phucvucongdong.Migrations
{
    /// <inheritdoc />
    public partial class AddHoatDongDotXuat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GiaoVien_Nguoidung_NguoiDungId",
                table: "GiaoVien");

            migrationBuilder.DropForeignKey(
                name: "FK_SinhVien_Nguoidung_NguoiDungId",
                table: "SinhVien");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Nguoidung",
                table: "Nguoidung");

            migrationBuilder.RenameTable(
                name: "Nguoidung",
                newName: "NguoiDung");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NguoiDung",
                table: "NguoiDung",
                column: "NguoiDungId");

            migrationBuilder.CreateTable(
                name: "HoatDongDotXuat",
                columns: table => new
                {
                    NguoiDungId = table.Column<int>(type: "int", nullable: false),
                    TenHoatDong = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    NamHoc = table.Column<int>(type: "int", nullable: false),
                    HocKy = table.Column<int>(type: "int", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MinhChung = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoatDongDotXuat", x => new { x.NguoiDungId, x.TenHoatDong, x.NamHoc, x.HocKy });
                    table.CheckConstraint("CK_HoatDongDotXuat_HocKy", "[HocKy] >= 1 AND [HocKy] <= 2");
                    table.ForeignKey(
                        name: "FK_HoatDongDotXuat_NguoiDung_NguoiDungId",
                        column: x => x.NguoiDungId,
                        principalTable: "NguoiDung",
                        principalColumn: "NguoiDungId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddCheckConstraint(
                name: "CK_TieuChi_Diem",
                table: "TieuChi",
                sql: "[Diem] >= 0");

            migrationBuilder.AddForeignKey(
                name: "FK_GiaoVien_NguoiDung_NguoiDungId",
                table: "GiaoVien",
                column: "NguoiDungId",
                principalTable: "NguoiDung",
                principalColumn: "NguoiDungId");

            migrationBuilder.AddForeignKey(
                name: "FK_SinhVien_NguoiDung_NguoiDungId",
                table: "SinhVien",
                column: "NguoiDungId",
                principalTable: "NguoiDung",
                principalColumn: "NguoiDungId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GiaoVien_NguoiDung_NguoiDungId",
                table: "GiaoVien");

            migrationBuilder.DropForeignKey(
                name: "FK_SinhVien_NguoiDung_NguoiDungId",
                table: "SinhVien");

            migrationBuilder.DropTable(
                name: "HoatDongDotXuat");

            migrationBuilder.DropCheckConstraint(
                name: "CK_TieuChi_Diem",
                table: "TieuChi");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NguoiDung",
                table: "NguoiDung");

            migrationBuilder.RenameTable(
                name: "NguoiDung",
                newName: "Nguoidung");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Nguoidung",
                table: "Nguoidung",
                column: "NguoiDungId");

            migrationBuilder.AddForeignKey(
                name: "FK_GiaoVien_Nguoidung_NguoiDungId",
                table: "GiaoVien",
                column: "NguoiDungId",
                principalTable: "Nguoidung",
                principalColumn: "NguoiDungId");

            migrationBuilder.AddForeignKey(
                name: "FK_SinhVien_Nguoidung_NguoiDungId",
                table: "SinhVien",
                column: "NguoiDungId",
                principalTable: "Nguoidung",
                principalColumn: "NguoiDungId");
        }
    }
}
