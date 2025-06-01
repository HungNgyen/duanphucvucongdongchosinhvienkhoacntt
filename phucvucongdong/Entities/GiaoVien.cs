using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace phucvucongdong.Entities
{
    [Table("GiaoVien")]
    public class GiaoVien
    {
        [Key]
        [Column("giao_vien_id")]
        public int giao_vien_id { get; set; }

        public int? nguoi_dung_id { get; set; }

        [Column(TypeName = "char(9)")]
        public string? ma_so_giao_vien { get; set; }

        [StringLength(50)]
        public string? ho_ten_giao_vien { get; set; }

        [StringLength(100)]
        public string? chuc_vu { get; set; }

        public string? lop_phu_trach { get; set; }


        [ForeignKey(nameof(nguoi_dung_id))]
        public virtual NguoiDung NguoiDung { get; set; }

        [JsonIgnore]
        public virtual ICollection<DangKyGiaoVien> DangKyGiaoViens { get; set; } = new List<DangKyGiaoVien>();
    }
}