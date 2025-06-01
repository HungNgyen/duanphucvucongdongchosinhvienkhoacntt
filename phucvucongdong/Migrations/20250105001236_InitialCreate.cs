using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace phucvucongdong.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DanhMucPVCongDong",
                columns: table => new
                {
                    DanhMucId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenDanhMuc = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhMucPVCongDong", x => x.DanhMucId);
                });

            migrationBuilder.CreateTable(
                name: "Nguoidung",
                columns: table => new
                {
                    NguoiDungId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HoTen = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    VaiTro = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PhongBan = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ThongTinLienHe = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nguoidung", x => x.NguoiDungId);
                });

            migrationBuilder.CreateTable(
                name: "TieuChi",
                columns: table => new
                {
                    TieuChiId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DanhMucId = table.Column<int>(type: "int", nullable: true),
                    TenTieuChi = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Diem = table.Column<int>(type: "int", nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TieuChi", x => x.TieuChiId);
                    table.ForeignKey(
                        name: "FK_TieuChi_DanhMucPVCongDong_DanhMucId",
                        column: x => x.DanhMucId,
                        principalTable: "DanhMucPVCongDong",
                        principalColumn: "DanhMucId");
                });

            migrationBuilder.CreateTable(
                name: "GiaoVien",
                columns: table => new
                {
                    GiaoVienId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NguoiDungId = table.Column<int>(type: "int", nullable: true),
                    ChucVu = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiaoVien", x => x.GiaoVienId);
                    table.ForeignKey(
                        name: "FK_GiaoVien_Nguoidung_NguoiDungId",
                        column: x => x.NguoiDungId,
                        principalTable: "Nguoidung",
                        principalColumn: "NguoiDungId");
                });

            migrationBuilder.CreateTable(
                name: "SinhVien",
                columns: table => new
                {
                    SinhVienId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NguoiDungId = table.Column<int>(type: "int", nullable: true),
                    Lop = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Nganh = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SinhVien", x => x.SinhVienId);
                    table.ForeignKey(
                        name: "FK_SinhVien_Nguoidung_NguoiDungId",
                        column: x => x.NguoiDungId,
                        principalTable: "Nguoidung",
                        principalColumn: "NguoiDungId");
                });

            migrationBuilder.CreateTable(
                name: "HoatDong",
                columns: table => new
                {
                    HoatDongId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TieuChiId = table.Column<int>(type: "int", nullable: true),
                    TenHoatDong = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoatDong", x => x.HoatDongId);
                    table.ForeignKey(
                        name: "FK_HoatDong_TieuChi_TieuChiId",
                        column: x => x.TieuChiId,
                        principalTable: "TieuChi",
                        principalColumn: "TieuChiId");
                });

            migrationBuilder.CreateTable(
                name: "DangKyGiaoVien",
                columns: table => new
                {
                    GiaoVienId = table.Column<int>(type: "int", nullable: false),
                    HoatDongId = table.Column<int>(type: "int", nullable: false),
                    NamHoc = table.Column<int>(type: "int", nullable: false),
                    TrangThai = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Diem = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DangKyGiaoVien", x => new { x.GiaoVienId, x.HoatDongId, x.NamHoc });
                    table.CheckConstraint("CK_DangKyGiaoVien_TrangThai", "[TrangThai] IN ('0', '1', '2')");
                    table.ForeignKey(
                        name: "FK_DangKyGiaoVien_GiaoVien_GiaoVienId",
                        column: x => x.GiaoVienId,
                        principalTable: "GiaoVien",
                        principalColumn: "GiaoVienId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DangKyGiaoVien_HoatDong_HoatDongId",
                        column: x => x.HoatDongId,
                        principalTable: "HoatDong",
                        principalColumn: "HoatDongId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ThamGiaSinhVien",
                columns: table => new
                {
                    SinhVienId = table.Column<int>(type: "int", nullable: false),
                    HoatDongId = table.Column<int>(type: "int", nullable: false),
                    TrangThai = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MinhChung = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThamGiaSinhVien", x => new { x.SinhVienId, x.HoatDongId });
                    table.ForeignKey(
                        name: "FK_ThamGiaSinhVien_HoatDong_HoatDongId",
                        column: x => x.HoatDongId,
                        principalTable: "HoatDong",
                        principalColumn: "HoatDongId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ThamGiaSinhVien_SinhVien_SinhVienId",
                        column: x => x.SinhVienId,
                        principalTable: "SinhVien",
                        principalColumn: "SinhVienId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DangKyGiaoVien_HoatDongId",
                table: "DangKyGiaoVien",
                column: "HoatDongId");

            migrationBuilder.CreateIndex(
                name: "IX_GiaoVien_NguoiDungId",
                table: "GiaoVien",
                column: "NguoiDungId");

            migrationBuilder.CreateIndex(
                name: "IX_HoatDong_TieuChiId",
                table: "HoatDong",
                column: "TieuChiId");

            migrationBuilder.CreateIndex(
                name: "IX_SinhVien_NguoiDungId",
                table: "SinhVien",
                column: "NguoiDungId");

            migrationBuilder.CreateIndex(
                name: "IX_ThamGiaSinhVien_HoatDongId",
                table: "ThamGiaSinhVien",
                column: "HoatDongId");

            migrationBuilder.CreateIndex(
                name: "IX_TieuChi_DanhMucId",
                table: "TieuChi",
                column: "DanhMucId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DangKyGiaoVien");

            migrationBuilder.DropTable(
                name: "ThamGiaSinhVien");

            migrationBuilder.DropTable(
                name: "GiaoVien");

            migrationBuilder.DropTable(
                name: "HoatDong");

            migrationBuilder.DropTable(
                name: "SinhVien");

            migrationBuilder.DropTable(
                name: "TieuChi");

            migrationBuilder.DropTable(
                name: "Nguoidung");

            migrationBuilder.DropTable(
                name: "DanhMucPVCongDong");
        }
    }
}
