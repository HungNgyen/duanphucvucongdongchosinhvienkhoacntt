using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace phucvucongdong.Entities
{
    [Table("SinhVien")]
    public class SinhVien
    {
        [Key]
        [Column("sinh_vien_id")]
        public int sinh_vien_id { get; set; }

        public int? nguoi_dung_id { get; set; }

        [Column(TypeName = "char(9)")]

        public string? ma_so_sinh_vien { get; set; }

        [StringLength(50)]
        public string? ho_ten_sinh_vien { get; set; }

        [StringLength(50)]
        public string? lop { get; set; }

        [StringLength(100)]
        public string? nganh { get; set; }

        public int? diem { get; set; }

        [ForeignKey(nameof(nguoi_dung_id))]
        public virtual NguoiDung NguoiDung { get; set; }





        [JsonIgnore]
        public virtual ICollection<ThamGiaSinhVien> ThamGiaSinhViens { get; set; } = new List<ThamGiaSinhVien>();


    }
}