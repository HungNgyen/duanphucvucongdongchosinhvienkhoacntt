using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace phucvucongdong.Entities
{
    [Table("MinhChungHoatDong")]
    public class MinhChungHoatDongEntities
    {
        [Key]
        [Column(Order = 0)]
        public int hoat_dong_id { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string loai_minh_chung { get; set; }

        [StringLength(255)]
        public string? duong_dan_minh_chung { get; set; }

        [ForeignKey("hoat_dong_id")]
        public HoatDong HoatDong { get; set; }
    }
}