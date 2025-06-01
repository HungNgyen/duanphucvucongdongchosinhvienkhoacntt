using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.Entities
{
    public class VerificationCode
    {
        public int Id { get; set; }
        public int nguoi_dung_id { get; set; }
        public string Email { get; set; }
        public string Code { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime CreatedAt { get; set; }

        public NguoiDung NguoiDung { get; set; }
    }
}