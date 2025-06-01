using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.DTO
{
    public class MinhChungHoatDongDto
    {
        public int nguoi_dung_id { get; set; }
        public int hoat_dong_id { get; set; }
        public string loai_minh_chung { get; set; }
        public string? duong_dan_minh_chung { get; set; }


    }
}