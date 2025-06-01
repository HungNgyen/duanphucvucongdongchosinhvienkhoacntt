using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.Model
{
  public class TaiKhoanLoginModel
  {
    public int nguoi_dung_id { get; set; }
    public int tai_khoan_id { get; set; }

    public string ten_dang_nhap { get; set; }
    public string phan_quyen { get; set; }
    public string trang_thai { get; set; }

    public string vai_tro { get; set; }
    public string? ho_ten_sinh_vien { get; set; }
    public string? ho_ten_giao_vien { get; set; }

    public int? sinh_vien_id { get; set; }

    public int? giao_vien_id { get; set; }
  }
}