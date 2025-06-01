using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.DTO
{
    public class HoatDongDtoUpdate
    {

        public int? tieu_chi_id { get; set; }
        public string ten_hoat_dong { get; set; }
        public string? mo_ta { get; set; }
        public string nam_hoc { get; set; }
        public int hoc_ky { get; set; }
        public int? tong_so_nguoi_tham_gia { get; set; }

        public DateTime ngay_bat_dau { get; set; }
        public DateTime ngay_ket_thuc { get; set; }
        public bool IsDelete { get; set; }
        public bool? is_hidden { get; set; }
    }
}