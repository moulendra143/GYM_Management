using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymBackend.Data;
using GymBackend.Models;
using System.Security.Claims;

namespace GymBackend.Controllers
{
    [ApiController]
    [Route("api/member")]
    [Authorize]
    public class MemberController : ControllerBase
    {
        private readonly AppDbContext _db;
        public MemberController(AppDbContext db) => _db = db;

        private int GetUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(claim, out var id) ? id : 0;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> Dashboard()
        {
            var upcoming = await _db.WorkoutPlans.Take(5).ToListAsync();
            return Ok(new { success = true, data = new { upcoming } });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = GetUserId();
            var member = await _db.Members.Include(m => m.User).FirstOrDefaultAsync(m => m.UserId == userId);
            return Ok(new { success = true, data = member });
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] Member profile)
        {
            var userId = GetUserId();
            var member = await _db.Members.Include(m => m.User).FirstOrDefaultAsync(m => m.UserId == userId);
            if (member == null) return NotFound();
            member.Address = profile.Address;
            member.Phone = profile.Phone;
            if (member.User != null && profile.User != null)
            {
                member.User.Name = profile.User.Name;
                member.User.Email = profile.User.Email;
            }
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = member });
        }

        [HttpGet("membership")]
        public async Task<IActionResult> GetMembership()
        {
            // Return membership details (you can expand)
            return Ok(new { success = true, data = (object?)null });
        }

        [HttpGet("attendance")]
        public async Task<IActionResult> GetAttendance()
        {
            var userId = GetUserId();
            var member = await _db.Members.FirstOrDefaultAsync(m => m.UserId == userId);
            if (member == null) return Unauthorized();
            var list = await _db.Attendances.Where(a => a.MemberId == member.Id).ToListAsync();
            return Ok(new { success = true, data = list });
        }

        [HttpPost("attendance/checkin")]
        public async Task<IActionResult> CheckIn()
        {
            var userId = GetUserId();
            var member = await _db.Members.FirstOrDefaultAsync(m => m.UserId == userId);
            if (member == null) return Unauthorized();
            var attendance = new Attendance { MemberId = member.Id, CheckInTime = DateTime.UtcNow };
            _db.Attendances.Add(attendance);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = attendance });
        }

        [HttpGet("payments")]
        public async Task<IActionResult> GetPayments()
        {
            var userId = GetUserId();
            var member = await _db.Members.FirstOrDefaultAsync(m => m.UserId == userId);
            if (member == null) return Unauthorized();
            var payments = await _db.Payments.Where(p => p.MemberId == member.Id).ToListAsync();
            return Ok(new { success = true, data = payments });
        }

        [HttpGet("workout-plans")]
        public async Task<IActionResult> GetWorkoutPlans()
        {
            var userId = GetUserId();
            var member = await _db.Members.FirstOrDefaultAsync(m => m.UserId == userId);
            if (member == null) return Unauthorized();
            var plans = await _db.WorkoutPlans.Where(w => w.MemberId == member.Id).ToListAsync();
            return Ok(new { success = true, data = plans });
        }

        [HttpPost("feedback")]
        public async Task<IActionResult> SubmitFeedback([FromBody] Feedback f)
        {
            var userId = GetUserId();
            var member = await _db.Members.FirstOrDefaultAsync(m => m.UserId == userId);
            if (member == null) return Unauthorized();
            f.MemberId = member.Id;
            f.CreatedAt = DateTime.UtcNow;
            _db.Feedbacks.Add(f);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = f });
        }
    }
}