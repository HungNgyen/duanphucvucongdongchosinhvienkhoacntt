using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.Entities.DTO
{
    public class TieuChiDto
    {
        public int tieu_chi_id { get; set; }
        public int? danh_muc_id { get; set; }
        public string ten_tieu_chi { get; set; }
        public string? mo_ta { get; set; }
        public int? diem { get; set; }
        public bool IsDelete { get; set; }
    }

 
}