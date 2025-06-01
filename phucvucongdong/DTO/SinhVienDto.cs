using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.Entities.DTO
{
    public class SinhVienDto
    {

        public string? ma_so_sinh_vien { get; set; }

        public string? lop { get; set; }
        public string? nganh { get; set; }



        public string? mat_khau { get; set; }
        public string phan_quyen { get; set; }
        public string trang_thai { get; set; }
        public string ten_dang_nhap { get; set; }
        public string? ho_ten_sinh_vien { get; set; }
        public string vai_tro { get; set; }
        public string phong_ban { get; set; }
        public string thong_tin_lien_he { get; set; }
        public int diem { get; set; }




    }

    public class DanhSachSinhVien
    {
        public int sinh_vien_id { get; set; }
        public string? lop { get; set; }
        public string ma_so_sinh_vien { get; set; }
        public string ho_ten_sinh_vien { get; set; }
        public string? nganh { get; set; }
        public int? diem { get; set; }

    }

    public class ChiTietHoatDongMaSinhVienThamGia
    {
        public string? lop { get; set; }
        public string? ma_so_sinh_vien { get; set; }
        public string? ho_ten_sinh_vien { get; set; }
        public int? hoat_dong_id { get; set; }
        public string? ten_hoat_dong { get; set; }
        public string? loai_hanh_dong { get; set; }
        public int? diem { get; set; }
        public string? minh_chung { get; set; }
        public DateTime? thoi_gian_thuc_hien { get; set; }
    }

    public class SinhVienTaoHoatDongCaNhan

    {
        public string? ten_hoat_dong { get; set; }
        public string? mo_ta { get; set; }
        public DateTime? ngay_bat_dau { get; set; }
        public DateTime? ngay_ket_thuc { get; set; }
        public int? tieu_chi_id { get; set; }
        public int? nguoi_dung_id { get; set; }

    }


    public class DiemTheoNamHocHocKy
    {
        public string? ho_ten_sinh_vien { get; set; }
        public string? nam_hoc { get; set; }
        public int? hoc_ky { get; set; }
        public int? tong_diem { get; set; }

    }

}