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

        public AuthController(AppDbContext db, TokenService tokenService)
        {
            _db = db;
            _tokenService = tokenService;
        }

        public class RegisterRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string? Name { get; set; }
            public string? Email { get; set; }
        }

        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        public class UserResponse
        {
            public int Id { get; set; }
            public string Username { get; set; }
            public string Role { get; set; }
            public string? Name { get; set; }
            public string? Email { get; set; }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _db.Users.AnyAsync(u => u.Username == request.Username))
                return BadRequest(new { success = false, message = "Username exists" });

            var user = new User
            {
                Username = request.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = "Member",
                Name = request.Name,
                Email = request.Email
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var member = new Member { UserId = user.Id };
            _db.Members.Add(member);
            await _db.SaveChangesAsync();

            var response = new UserResponse
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role,
                Name = user.Name,
                Email = user.Email
            };

            return Ok(new { success = true, data = response });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return Unauthorized(new { success = false, message = "Invalid credentials" });

            var token = _tokenService.GenerateToken(user);

            var response = new UserResponse
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role,
                Name = user.Name,
                Email = user.Email
            };

            return Ok(new { success = true, data = new { token, user = response } });
        }
    }
}