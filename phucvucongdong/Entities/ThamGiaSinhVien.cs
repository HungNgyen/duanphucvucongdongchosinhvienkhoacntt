using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using phucvucongdong.Entities;

namespace phucvucongdong.Entities
{

    [Table("ThamGiaSinhVien", Schema = "pvcd")]
    public class ThamGiaSinhVien
    {

        [Key]
        [Column(Order = 1)]
        public int sinh_vien_id { get; set; }


        [Key]
        [Column(Order = 2)]
        public int hoat_dong_id { get; set; }


        public string? trang_thai { get; set; }
        public string? minh_chung { get; set; }
        public string? loai_hanh_dong { get; set; }
        public DateTime? thoi_gian_thuc_hien { get; set; }


        [ForeignKey(nameof(sinh_vien_id))]

        public virtual SinhVien? SinhVien { get; set; }


        [ForeignKey(nameof(hoat_dong_id))]
        public virtual HoatDong? HoatDong { get; set; }
    }
}


