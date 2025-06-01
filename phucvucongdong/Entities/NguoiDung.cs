using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using phucvucongdong.Models;


namespace phucvucongdong.Entities
{
    [Table("NguoiDung")]
    public class NguoiDung
    {
 

        [Key]
        [Column("nguoi_dung_id")]
        public int nguoi_dung_id { get; set; }

   

        [StringLength(50)]
        public string? vai_tro { get; set; }

        [StringLength(100)]
        public string? phong_ban { get; set; }

        [StringLength(255)]
        public string? thong_tin_lien_he { get; set; }

     


        [JsonIgnore]
        public virtual SinhVien? SinhVien { get; set; }
      




        [JsonIgnore] 
        public virtual TaiKhoan TaiKhoan { get; set; }

        



        [JsonIgnore] 
        public virtual GiaoVien? GiaoVien { get; set; }






        [JsonIgnore]
        public virtual ICollection<LichSu> LichSus { get; set; } = new List<LichSu>();

    }
}