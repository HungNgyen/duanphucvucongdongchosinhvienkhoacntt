

namespace phucvucongdong.DTOs
{
    public class TaiKhoanDto
    {
        public string ten_dang_nhap { get; set; }

        public string mat_khau { get; set; }

    }

}

public class ThongTinTaiKhoanSinhVien
{
    public int nguoi_dung_id { get; set; }
    public int tai_khoan_id { get; set; }
    public string ten_dang_nhap { get; set; }
    public string phan_quyen { get; set; }
    public string trang_thai { get; set; }

    public string vai_tro { get; set; }
    public string? ho_ten_sinh_vien { get; set; }
    public int? diem { get; set; }
    public int? sinh_vien_id { get; set; }

    public string? nam_hoc { get; set; }
    public int? hoc_ky { get; set; }
}


public class ThongTinTaiKhoanGiaoVien
{
    public int nguoi_dung_id { get; set; }
    public int tai_khoan_id { get; set; }
    public string ten_dang_nhap { get; set; }
    public string phan_quyen { get; set; }
    public string trang_thai { get; set; }

    public string vai_tro { get; set; }
    public string? ho_ten_giao_vien { get; set; }
    public int? diem { get; set; }
    public string? lop_phu_trach { get; set; }
    public int? giao_vien_id { get; set; }
}




public class TaiKhoanLoginResult
{
    internal string? nam_hoc;
    internal int? hoc_ky;

    public int? tai_khoan_id { get; set; }
    public int? nguoi_dung_id { get; set; }
    public int? sinh_vien_id { get; set; }
    public int? giao_vien_id { get; set; }
    public string? ten_dang_nhap { get; set; }
    public string? phan_quyen { get; set; }
    public string? ho_ten_sinh_vien { get; set; }
    public string? ho_ten_giao_vien { get; set; }
    public int? diem { get; set; }
    // public string? lop_phu_trach { get; set; }
    public string? vai_tro { get; set; }
    public string? trang_thai { get; set; }

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

public class TaiKhoanViewSinhVienDto
{
    public int tai_khoan_id { get; set; }
    public int nguoi_dung_id { get; set; }
    public int? sinh_vien_id { get; set; }
    public string? ho_ten_sinh_vien { get; set; }
    public string ten_dang_nhap { get; set; }

    public string phan_quyen { get; set; }
    public string trang_thai { get; set; }
    public string vai_tro { get; set; }
    public string phong_ban { get; set; }
    public string thong_tin_lien_he { get; set; }

}



public class TaiKhoanViewGiaoVienDto
{
    public int tai_khoan_id { get; set; }
    public int nguoi_dung_id { get; set; }
    public int? giao_vien_id { get; set; }
    public string? ho_ten_giao_vien { get; set; }
    public string ten_dang_nhap { get; set; }

    public string phan_quyen { get; set; }
    public string trang_thai { get; set; }
    public string vai_tro { get; set; }
    public string phong_ban { get; set; }
    public string thong_tin_lien_he { get; set; }
}


public class QuenMatKhau
{
    public string? ma_so_giao_vien { get; set; }
    public string? ma_so_sinh_vien { get; set; }


}

public class ThongTinCuaTaiKhoanQuenMatKhau
{
    public string? ma_so_giao_vien { get; set; }
    public string? ma_so_sinh_vien { get; set; }
    public string? ho_ten_giao_vien { get; set; }
    public string? ho_ten_sinh_vien { get; set; }
    public string? thong_tin_lien_he { get; set; }
    public string? ThongBao { get; set; }


}


public class ThongTinGiaoVienSinhVien
{
    public string? ma_so_sinh_vien { get; set; }
    public string? ho_ten_sinh_vien { get; set; }
    public string? lop { get; set; }
    public string? ma_so_giao_vien { get; set; }
    public string? ho_ten_giao_vien { get; set; }
    public string? thong_tin_lien_he { get; set; }
    public string? ThongBao { get; set; }
}

public class ChangePasswordDto
{
    public int nguoi_dung_id { get; set; }
    public string mat_khau_cu { get; set; }
    public string mat_khau_moi { get; set; }
}