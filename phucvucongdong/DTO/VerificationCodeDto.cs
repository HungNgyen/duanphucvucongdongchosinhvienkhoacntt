using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace phucvucongdong.DTO
{
    public class VerificationCodeDto
    {
        public int nguoi_dung_id { get; set; } // Thêm để liên kết
        public string Email { get; set; }
        public string Code { get; set; }
        public int ExpiryMinutes { get; set; }
    }


    public class VerificationCodeResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Code { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public string ErrorMessage { get; set; }
    }
}