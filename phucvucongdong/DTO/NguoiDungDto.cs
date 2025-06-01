using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.Entities.DTO
{
    public class NguoiDungDto
    {
        public int nguoi_dung_id { get; set; }
        // public string ho_ten { get; set; }
        public string? vai_tro { get; set; }
        public string? phong_ban { get; set; }
        public string? thong_tin_lien_he { get; set; }
    }



    public class NguoiDungSinhVienDto
    {
        public int nguoi_dung_id { get; set; }
        public int? sinh_vien_id { get; set; }
        // public string ho_ten { get; set; }
        public string? vai_tro { get; set; }
        public string? phong_ban { get; set; }
        public string? thong_tin_lien_he { get; set; }
    }
}