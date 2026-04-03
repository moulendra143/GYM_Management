using Microsoft.AspNetCore.Mvc;
using GymBackend.Data;
using GymBackend.Models;
using GymBackend.Services;
using Microsoft.EntityFrameworkCore;

namespace GymBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly TokenService _tokenService;

        // Simple in-memory OTP store for dev/testing
        private static readonly System.Collections.Concurrent.ConcurrentDictionary<string, string> _otpStore = new System.Collections.Concurrent.ConcurrentDictionary<string, string>();

        public AuthController(AppDbContext db, TokenService tokenService)
        {
            _db = db;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _db.Users.AnyAsync(u => u.Username == user.Username))
                return BadRequest(new { success = false, message = "Username already exists" });

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            // Optionally create a member record
            var member = new Member { UserId = user.Id };
            _db.Members.Add(member);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, data = new { user, member } });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User login)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == login.Username && u.Password == login.Password);
            if (user == null)
                return Unauthorized(new { success = false, message = "Invalid credentials" });

            var token = _tokenService.GenerateToken(user);
            return Ok(new { success = true, data = new { token, user } });
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] dynamic payload)
        {
            string email = payload?.email;
            if (string.IsNullOrEmpty(email)) return BadRequest(new { success = false, message = "Email required" });

            var otp = new Random().Next(100000, 999999).ToString();
            _otpStore[email] = otp;

            // TODO: send email via SMTP in production. Here we return success for dev.
            return Ok(new { success = true, message = "OTP sent (dev)", otp });
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] dynamic payload)
        {
            string email = payload?.email;
            string otp = payload?.otp;
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(otp)) return BadRequest(new { success = false });

            if (_otpStore.TryGetValue(email, out var stored) && stored == otp)
            {
                return Ok(new { success = true });
            }
            return BadRequest(new { success = false, message = "Invalid OTP" });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] dynamic payload)
        {
            string email = payload?.email;
            string otp = payload?.otp;
            string newPassword = payload?.newPassword;
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(otp) || string.IsNullOrEmpty(newPassword)) return BadRequest(new { success = false });

            if (!_otpStore.TryGetValue(email, out var stored) || stored != otp)
                return BadRequest(new { success = false, message = "Invalid OTP" });

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return NotFound(new { success = false, message = "User not found" });

            user.Password = newPassword;
            await _db.SaveChangesAsync();
            _otpStore.TryRemove(email, out _);
            return Ok(new { success = true });
        }
    }
}
