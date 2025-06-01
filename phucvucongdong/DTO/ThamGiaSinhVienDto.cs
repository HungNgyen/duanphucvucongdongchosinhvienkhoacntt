using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.Entities.DTO
{

    public class ThamGiaSinhVienDto
    {
        public int sinh_vien_id { get; set; }

        public string? ho_ten_sinh_vien { get; set; }
        public string? ma_so_sinh_vien { get; set; }

        public int hoat_dong_id { get; set; }


        public string? ten_hoat_dong { get; set; }
        public string? mo_ta { get; set; }
        public DateTime? ngay_bat_dau { get; set; }
        public DateTime? ngay_ket_thuc { get; set; }
        public string? trang_thai { get; set; }
        public string? minh_chung { get; set; }
        public string? loai_hanh_dong { get; set; }
        public DateTime? thoi_gian_thuc_hien { get; set; }

        public int? diem { get; set; }
        public string? nam_hoc { get; set; }
        public int? hoc_ky { get; set; }




    }





    public class SinhVienNopMinhChung
    {
        public int nguoi_dung_id { get; set; }
        public int hoat_dong_id { get; set; }
        public string? loai_hanh_dong { get; set; }
        public string? minh_chung { get; set; }
        public DateTime thoi_gian_thuc_hien { get; set; }

    }

}