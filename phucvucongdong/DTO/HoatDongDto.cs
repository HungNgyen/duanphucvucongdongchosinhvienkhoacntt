using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.Entities.DTO
{
    public class HoatDongDto
    {
        //  public int nguoi_dung_id { get; set; }
        public int hoat_dong_id { get; set; }
        public int? tieu_chi_id { get; set; }
        public string ten_hoat_dong { get; set; }
        public string? mo_ta { get; set; }
        public string? nam_hoc { get; set; }
        public int? hoc_ky { get; set; }
        public DateTime? ngay_bat_dau { get; set; }
        public DateTime? ngay_ket_thuc { get; set; }
        public bool? IsDelete { get; set; }
        public int? diem { get; set; }

        public int? nguoi_tao_hoat_dong { get; set; }
        public int? so_luong_nguoi_tham_gia { get; set; }
        public int? tong_so_nguoi_tham_gia { get; set; }
        public int? so_luong_nguoi_nop_minh_chung { get; set; }
        public bool? is_hidden { get; set; }



    }



    public class ThemSinhVienBatBuoc
    {
        public int hoat_dong_id { get; set; }
        public string lop { get; set; }

    }

    public class ThongKeHoatDongTheoNamHocHocKy
    {
        public string? nam_hoc { get; set; }
        public int? hoc_ky { get; set; }
        public int? so_luong_nguoi_tham_gia { get; set; }
        public int? so_luong_hoat_dong { get; set; }
        public int? so_luong_nguoi_nop_minh_chung { get; set; }

    }

}