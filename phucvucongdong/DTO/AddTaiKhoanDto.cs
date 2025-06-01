using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.DTOs
{
    public class AddTaiKhoanDto
    {
        internal int sinh_vien_id;
        internal string lop;
        internal string nganh;
        internal int giao_vien_id;
        internal string chuc_vu;

        // Thông tin NguoiDung
        public string ho_ten { get; set; }
        public string vai_tro { get; set; }
        public string phong_ban { get; set; }
        public string thong_tin_lien_he { get; set; }

        // Thông tin TaiKhoan
        public string ten_dang_nhap { get; set; }
        public string mat_khau { get; set; }
        public string phan_quyen { get; set; }
        public string trang_thai { get; set; }
    }
}
