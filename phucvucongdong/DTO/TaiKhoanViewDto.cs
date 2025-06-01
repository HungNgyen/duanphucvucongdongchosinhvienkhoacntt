using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.DTO
{
    public class TaiKhoanViewDto
    {
        public int tai_khoan_id { get; set; }
        public string ten_dang_nhap { get; set; }

        public string phan_quyen { get; set; }
        public string trang_thai { get; set; }
        public string vai_tro { get; set; }
    }


    public class UpdateTaiKhoanDto
    {
        public string mat_khau { get; set; }
        public string phan_quyen { get; set; }
        public string trang_thai { get; set; }
        public string ten_dang_nhap { get; set; }
        public string ho_ten { get; set; }
        public string vai_tro { get; set; }
        public string phong_ban { get; set; }
        public string thong_tin_lien_he { get; set; }
    }
}