using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using phucvucongdong.Entities;

namespace phucvucongdong.Models
{
    [Table("TaiKhoan", Schema = "pvcd")]
    public class TaiKhoan
    {
       

        [Key]
        public int tai_khoan_id { get; set; }

        [Required]
        public int nguoi_dung_id { get; set; } 

        [Required]
        [MaxLength(100)]
        public string ten_dang_nhap { get; set; }

        [Required]
        [MaxLength(255)]
        public string mat_khau { get; set; }


        [MaxLength(50)]
        public string phan_quyen { get; set; }

        [MaxLength(50)]
        public string trang_thai { get; set; } = "Active";

        public DateTime ngay_tao { get; set; } = DateTime.Now;

        // Navigation property
        [ForeignKey("nguoi_dung_id")]
        public NguoiDung NguoiDung { get; set; }
    
    }
}
