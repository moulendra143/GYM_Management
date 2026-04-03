using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymBackend.Data;
using GymBackend.Models;

namespace GymBackend.Controllers
{
    [ApiController]
    [Route("api/member")]
    public class MemberController : ControllerBase
    {
        private readonly AppDbContext _db;
        public MemberController(AppDbContext db) { _db = db; }

        [HttpGet("dashboard")]
        public async Task<IActionResult> Dashboard()
        {
            var upcoming = await _db.WorkoutPlans.Take(5).ToListAsync();
            return Ok(new { success = true, data = new { upcoming } });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = int.TryParse(User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value, out var id) ? id : (int?)null;
            if (!userId.HasValue) return Unauthorized();
            var member = await _db.Members.Include(m => m.User).FirstOrDefaultAsync(m => m.UserId == userId.Value);
            return Ok(new { success = true, data = member });
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] Member profile)
        {
            var userId = int.TryParse(User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value, out var id) ? id : (int?)null;
            if (!userId.HasValue) return Unauthorized();
            var member = await _db.Members.Include(m => m.User).FirstOrDefaultAsync(m => m.UserId == userId.Value);
            if (member == null) return NotFound();
            member.Address = profile.Address; member.Phone = profile.Phone;
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
            var userId = int.TryParse(User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value, out var id) ? id : (int?)null;
            if (!userId.HasValue) return Unauthorized();

            var member = await _db.Members
                .Include(m => m.MembershipPlan)
                .Include(m => m.Trainer)
                .ThenInclude(t => t.User)
                .Include(m => m.User)
                .FirstOrDefaultAsync(m => m.UserId == userId.Value);

            if (member == null) return NotFound(new { success = false, message = "Member record not found" });

            return Ok(new { success = true, data = new {
                member.Id,
                member.Phone,
                member.Address,
                Plan = member.MembershipPlan,
                Trainer = member.Trainer
            }});
        }

        [HttpGet("attendance")]
        public async Task<IActionResult> GetAttendance()
        {
            var userId = int.TryParse(User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value, out var id) ? id : (int?)null;
            var list = await _db.Attendances.Where(a => !userId.HasValue || a.MemberId == userId.Value).ToListAsync();
            return Ok(new { success = true, data = list });
        }

        [HttpPost("attendance/checkin")]
        public async Task<IActionResult> CheckIn()
        {
            var userId = int.TryParse(User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value, out var id) ? id : (int?)null;
            var attendance = new Attendance { MemberId = userId };
            _db.Attendances.Add(attendance);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = attendance });
        }

        [HttpGet("payments")]
        public async Task<IActionResult> GetPayments()
        {
            var userId = int.TryParse(User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value, out var id) ? id : (int?)null;
            var payments = await _db.Payments.Where(p => !userId.HasValue || p.MemberId == userId.Value).ToListAsync();
            return Ok(new { success = true, data = payments });
        }

        [HttpGet("workout-plans")]
        public async Task<IActionResult> GetWorkoutPlans()
        {
            var userId = int.TryParse(User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value, out var id) ? id : (int?)null;
            var plans = await _db.WorkoutPlans.Where(w => !userId.HasValue || w.MemberId == userId.Value).ToListAsync();
            return Ok(new { success = true, data = plans });
        }

        [HttpPost("feedback")]
        public async Task<IActionResult> SubmitFeedback([FromBody] Feedback f)
        {
            _db.Feedbacks.Add(f);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = f });
        }
    }
}
