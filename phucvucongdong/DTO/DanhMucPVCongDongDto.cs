using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.Entities.DTO
{
    public class DanhMucPVCongDongDto
    {
        public int danh_muc_id { get; set; }
        public string ten_danh_muc { get; set; }
        public string? mo_ta { get; set; }
        public bool IsDelete { get; set; }
    }



    public class DanhMucPVCongDongAddDto
    {
      
        public string ten_danh_muc { get; set; }
        public string? mo_ta { get; set; }
        public bool IsDelete { get; set; }
    }

    public class DanhMucPVCongDongUpdateDto
    {
        public int danh_muc_id { get; set; }
        public string ten_danh_muc { get; set; }
        public string? mo_ta { get; set; }
        public bool IsDelete { get; set; }
    }

    public class DanhMucPVCongDongDeleteDto
    {
        public int danh_muc_id { get; set; }
        public string ten_danh_muc { get; set; }
        public string? mo_ta { get; set; }
        public bool IsDelete { get; set; }
    }


}