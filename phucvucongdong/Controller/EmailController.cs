



// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Configuration;
// using phucvucongdong.Data;
// using phucvucongdong.DTO;
// using Google.Apis.Auth.OAuth2;
// using Google.Apis.Gmail.v1;
// using Google.Apis.Gmail.v1.Data;
// using Google.Apis.Services;
// using System;
// using System.Text;
// using System.Threading.Tasks;
// using Google.Apis.Auth.OAuth2.Flows;
// using Google.Apis.Auth.OAuth2.Responses;

// namespace phucvucongdong.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class EmailController : ControllerBase
//     {
//         private readonly AppDbContext _context;
//         private readonly IConfiguration _configuration;

//         public EmailController(AppDbContext context, IConfiguration configuration)
//         {
//             _context = context;
//             _configuration = configuration;
//         }



//         [HttpPost("send-email")]
//         [AllowAnonymous]
//         public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
//         {
//             try
//             {
//                 if (string.IsNullOrEmpty(request.To) || string.IsNullOrEmpty(request.Subject) || string.IsNullOrEmpty(request.Body))
//                 {
//                     return BadRequest(new { message = "Missing required fields" });
//                 }

//                 var clientId = _configuration["Gmail:ClientId"];
//                 var clientSecret = _configuration["Gmail:ClientSecret"];
//                 var refreshToken = _configuration["Gmail:RefreshToken"];
//                 var fromEmail = _configuration["Gmail:FromEmail"];

//                 // Tạo flow để lấy access token từ refresh token
//                 var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
//                 {
//                     ClientSecrets = new ClientSecrets
//                     {
//                         ClientId = clientId,
//                         ClientSecret = clientSecret
//                     },
//                     Scopes = new[] { GmailService.Scope.GmailSend }
//                 });

//                 // Tạo token request để lấy access token từ refresh token
//                 var token = new TokenResponse
//                 {
//                     RefreshToken = refreshToken
//                 };
//                 var userCredential = new UserCredential(flow, "user", token);

//                 // Tạo Gmail service
//                 var service = new GmailService(new BaseClientService.Initializer
//                 {
//                     HttpClientInitializer = userCredential,
//                     ApplicationName = "PhucVuCongDong"
//                 });

//                 var emailContent = $"From: {fromEmail}\n" +
//                                   $"To: {request.To}\n" +
//                                   "Content-Type: text/plain; charset=utf-8\n" +
//                                   "MIME-Version: 1.0\n" +
//                                   $"Subject: {request.Subject}\n\n" +
//                                   request.Body;

//                 var message = new Message
//                 {
//                     Raw = Convert.ToBase64String(Encoding.UTF8.GetBytes(emailContent))
//                         .Replace('+', '-')
//                         .Replace('/', '_')
//                         .Replace("=", "")
//                 };

//                 await service.Users.Messages.Send(message, "me").ExecuteAsync();
//                 return Ok(new { message = "Email sent successfully" });
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, new { message = "Gmail API error", error = ex.Message });
//             }
//         }

//         [HttpPost("save-verification-code")]
//         [AllowAnonymous]
//         public async Task<IActionResult> SaveVerificationCode([FromBody] VerificationCodeDto request)
//         {
//             try
//             {
//                 if (request.nguoi_dung_id <= 0 || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Code))
//                 {
//                     return BadRequest(new { message = "Missing required fields" });
//                 }

//                 var result = await _context.Database.ExecuteSqlRawAsync(
//                     "EXEC sp_SaveVerificationCode @p0, @p1, @p2, @p3",
//                     new object[]
//                     {
//                         request.nguoi_dung_id,
//                         request.Email,
//                         request.Code,
//                         request.ExpiryMinutes
//                     });

//                 if (result == 0) return BadRequest(new { message = "Lưu mã xác nhận thất bại!" });

//                 return Ok(new { message = "Lưu mã xác nhận thành công!" });
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
//             }
//         }

//         // [HttpPost("verify-code")]
//         // [AllowAnonymous]
//         // public async Task<IActionResult> VerifyCode([FromBody] VerificationCodeDto request)
//         // {
//         //     try
//         //     {
//         //         if (request.nguoi_dung_id <= 0 || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Code))
//         //         {
//         //             return BadRequest(new { message = "Missing required fields" });
//         //         }

//         //         var result = await _context.Set<VerificationCodeResponse>()
//         //             .FromSqlRaw("EXEC sp_GetValidVerificationCode @p0, @p1, @p2",
//         //                 request.nguoi_dung_id, request.Email, request.Code)
//         //             .AsEnumerable()
//         //             .FirstOrDefaultAsync();

//         //         if (result == null || !string.IsNullOrEmpty(result.ErrorMessage))
//         //         {
//         //             return BadRequest(new { message = result?.ErrorMessage ?? "Mã xác nhận không hợp lệ hoặc đã hết hạn" });
//         //         }

//         //         return Ok(new { message = "Xác nhận thành công" });
//         //     }
//         //     catch (Exception ex)
//         //     {
//         //         return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
//         //     }
//         // }


//         [HttpPost("verify-code")]
//         [AllowAnonymous]
//         public async Task<IActionResult> Verify([FromBody] VerificationCodeDto request)
//         {
//             try
//             {
//                 if (request.nguoi_dung_id <= 0 || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Code))
//                 {
//                     return BadRequest(new { message = "Missing required fields" });
//                 }

//                 var result = await _context.Set<VerificationCodeResponse>()
//                     .FromSqlRaw("EXEC sp_GetValidVerificationCode @p0, @p1, @p2",
//                         request.nguoi_dung_id, request.Email, request.Code)
//                     .FirstOrDefaultAsync();

//                 if (result == null || !string.IsNullOrEmpty(result.ErrorMessage))
//                 {
//                     return BadRequest(new { message = result?.ErrorMessage ?? "Mã xác nhận không hợp lệ hoặc đã hết hạn" });
//                 }

//                 return Ok(new { message = "Xác nhận thành công" });
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
//             }
//         }
//     }
// }