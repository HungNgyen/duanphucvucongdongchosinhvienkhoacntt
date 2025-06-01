using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace phucvucongdong.Entities
{
    [Table("TieuChi", Schema = "pvcd")]
    public class TieuChi
    {
        [Key]
        public int tieu_chi_id { get; set; }

        public int? danh_muc_id { get; set; }

        // [Required]
        [StringLength(100)]
        public string ten_tieu_chi { get; set; }

        [StringLength(255)]
        public string? mo_ta { get; set; }

        public int? diem { get; set; }

        public bool IsDelete { get; set; }

        [ForeignKey(nameof(danh_muc_id))]
        public DanhMucPVCongDong DanhMucPVCongDong { get; set; }

        public ICollection<HoatDong> HoatDongs { get; set; }
    }
}