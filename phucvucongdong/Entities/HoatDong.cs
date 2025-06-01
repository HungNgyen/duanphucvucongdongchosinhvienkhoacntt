using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace phucvucongdong.Entities
{
    [Table("HoatDong", Schema = "pvcd")]
    public class HoatDong
    {
        [Key]
        public int hoat_dong_id { get; set; }

        public int? tieu_chi_id { get; set; }

        [Required]
        [StringLength(100)]
        public string ten_hoat_dong { get; set; }

        [StringLength(255)]
        public string? mo_ta { get; set; }
        public string? nam_hoc { get; set; }
        public int? hoc_ky { get; set; }
        public DateTime ngay_bat_dau { get; set; }
        public DateTime ngay_ket_thuc { get; set; }

        public bool IsDelete { get; set; }




        public int? so_luong_nguoi_tham_gia { get; set; }
        public int? so_luong_nguoi_nop_minh_chung { get; set; }
        public int? nguoi_tao_hoat_dong { get; set; }

        public int? tong_so_nguoi_tham_gia { get; set; }

        public bool? is_hidden { get; set; }

        // public byte[]? hinh_anh { get; set; }

        // [NotMapped]
        // public string? hinh_anh_base64 { get; set; }


        [ForeignKey(nameof(tieu_chi_id))]
        public TieuChi TieuChi { get; set; }


        [JsonIgnore]
        public virtual ICollection<ThamGiaSinhVien> ThamGiaSinhViens { get; set; } = new List<ThamGiaSinhVien>();


        [JsonIgnore]
        public virtual ICollection<DangKyGiaoVien> DangKyGiaoViens { get; set; } = new List<DangKyGiaoVien>();


    }
}