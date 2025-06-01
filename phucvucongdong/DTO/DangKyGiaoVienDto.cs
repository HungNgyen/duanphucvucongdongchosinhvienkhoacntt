using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.Entities.DTO
{
    public class DangKyGiaoVienDto
    {
        public int giao_vien_id { get; set; }
        public int hoat_dong_id { get; set; }
        public int nam_hoc { get; set; }


        public string? ten_hoat_dong { get; set; }
        public string? mo_ta { get; set; }
        public DateTime? ngay_bat_dau { get; set; }
        public DateTime? ngay_ket_thuc { get; set; }

        public string? trang_thai { get; set; }

        public string? minh_chung { get; set; }
        public string? loai_hanh_dong { get; set; }
        public DateTime? thoi_gian_thuc_hien { get; set; }
        public int? diem { get; set; }

    }

    public class GiaoVienNopMinhChung
    {
        public int nguoi_dung_id { get; set; }
        public int hoat_dong_id { get; set; }
        public string? loai_hanh_dong { get; set; }
        public string? minh_chung { get; set; }

    }



}