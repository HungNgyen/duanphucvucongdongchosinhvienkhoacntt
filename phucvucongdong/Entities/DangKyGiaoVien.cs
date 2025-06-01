using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace phucvucongdong.Entities
{

    [Table("DangKyGiaoVien", Schema = "pvcd")]
    // [PrimaryKey(nameof(giao_vien_id), nameof(hoat_dong_id), nameof(nam_hoc))]
    public class DangKyGiaoVien
    {
        [Key]
        [Column(Order = 1)]
        public int giao_vien_id { get; set; }
        [Key]
        [Column(Order = 2)]
        public int hoat_dong_id { get; set; }
        [Key]
        [Column(Order = 3)]
        public int nam_hoc { get; set; }

        public string? trang_thai { get; set; }
        public string? minh_chung { get; set; }
        public string? loai_hanh_dong { get; set; }
        public DateTime? thoi_gian_thuc_hien { get; set; }

        //     public int? diem { get; set; }

        [ForeignKey(nameof(giao_vien_id))]
        public virtual GiaoVien? GiaoVien { get; set; }

        [ForeignKey(nameof(hoat_dong_id))]
        public virtual HoatDong? HoatDong { get; set; }
    }
}