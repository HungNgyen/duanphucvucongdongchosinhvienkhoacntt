using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.DTO
{
    public class LichSuDto
    {
        public int lich_su_id { get; set; }
        public int nguoi_dung_id { get; set; }
        public int hoat_dong_id { get; set; }
        public string ten_hoat_dong { get; set; }
        public string loai_hanh_dong { get; set; }


        public string mo_ta { get; set; }
        // public DateTime ngay_bat_dau { get; set; }
        // public DateTime ngay_ket_thuc { get; set; }

        public DateTime? thoi_gian_thuc_hien { get; set; }
    }
}



