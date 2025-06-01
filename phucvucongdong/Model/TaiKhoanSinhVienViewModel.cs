using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.Model
{
    public class TaiKhoanSinhVienViewModel
    {
        public int nguoi_dung_id { get; set; }
        public int sinh_vien_id { get; set; }
        public string? ma_so_sinh_vien { get; set; }
        public string? lop { get; set; }
        public string? nganh { get; set; }
        public string phan_quyen { get; set; }
        public string trang_thai { get; set; }
        public string ten_dang_nhap { get; set; }
        public string? ho_ten_sinh_vien { get; set; }
        public string vai_tro { get; set; }
        public string phong_ban { get; set; }
        public string thong_tin_lien_he { get; set; }

    }
}