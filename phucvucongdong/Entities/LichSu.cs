











using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace phucvucongdong.Entities
{
    [Table("LichSu", Schema = "pvcd")]
    public class LichSu
    {
        [Key]
        [Column("lich_su_id")]
        public int lich_su_id { get; set; }


        public int nguoi_dung_id { get; set; }


        public int hoat_dong_id { get; set; }

        public string loai_hanh_dong { get; set; }
        public string mo_ta { get; set; }
        public DateTime thoi_gian_thuc_hien { get; set; }

        // Navigation properties
        [ForeignKey(nameof(nguoi_dung_id))]
        public virtual NguoiDung NguoiDungs { get; set; }


        [ForeignKey(nameof(hoat_dong_id))]
        public virtual HoatDong HoatDong { get; set; }





    }
}
