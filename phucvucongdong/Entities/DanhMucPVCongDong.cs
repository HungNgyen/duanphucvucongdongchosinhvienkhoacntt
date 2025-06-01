using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
namespace phucvucongdong.Entities
{
    [Table("DanhMucPVCongDong", Schema = "pvcd")]
    public class DanhMucPVCongDong
    {
        [Key]
        public int danh_muc_id { get; set; }

        [Required]
        [StringLength(100)]
        public string ten_danh_muc { get; set; }

        [StringLength(255)]
        public string? mo_ta { get; set; }

        public bool IsDelete { get; set; }

        public ICollection<TieuChi> TieuChis { get; set; }
    }
}