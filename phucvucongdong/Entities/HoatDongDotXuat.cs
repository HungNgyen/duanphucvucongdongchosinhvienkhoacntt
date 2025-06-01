using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace phucvucongdong.Entities
{


    public class HoatDongDotXuat
    {
        [Key]
        [Column(Order = 0)]
        public int nguoi_dung_id { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(100)]
        public string ten_hoat_dong { get; set; }

        [Key]
        [Column(Order = 2)]
        public int nam_hoc { get; set; }

        [Key]
        [Column(Order = 3)]
        public int hoc_ky { get; set; }

        [StringLength(255)]
        public string? mo_ta { get; set; }

        [StringLength(255)]
        public string? minh_chung { get; set; }

        // Foreign key relationships
        [ForeignKey(nameof(nguoi_dung_id))]
        public NguoiDung NguoiDung { get; set; }
    }

}