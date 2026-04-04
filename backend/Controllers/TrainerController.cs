using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymBackend.Data;
using GymBackend.Models;
using System.Security.Claims;

namespace GymBackend.Controllers
{
    [ApiController]
    [Route("api/trainer")]
    [Authorize(Roles = "Trainer")]
    public class TrainerController : ControllerBase
    {
        private readonly AppDbContext _db;
        public TrainerController(AppDbContext db) => _db = db;

        private int GetUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(claim, out var id) ? id : 0;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = GetUserId();
            var trainer = await _db.Trainers.Include(t => t.User).FirstOrDefaultAsync(t => t.UserId == userId);
            return Ok(new { success = true, data = trainer });
        }

        [HttpGet("members")]
        public async Task<IActionResult> GetMembers()
        {
            var userId = GetUserId();
            var trainer = await _db.Trainers.FirstOrDefaultAsync(t => t.UserId == userId);
            if (trainer == null) return Unauthorized();
            var members = await _db.Members.Include(m => m.User).Where(m => m.TrainerId == trainer.Id).ToListAsync();
            return Ok(new { success = true, data = members });
        }

        [HttpPost("attendance")]
        public async Task<IActionResult> MarkAttendance([FromBody] Attendance attendance)
        {
            attendance.CheckInTime = DateTime.UtcNow;
            _db.Attendances.Add(attendance);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = attendance });
        }

        [HttpGet("workout-plans")]
        public async Task<IActionResult> GetWorkoutPlans()
        {
            var userId = GetUserId();
            var plans = await _db.WorkoutPlans.Where(w => w.TrainerId == userId).ToListAsync();
            return Ok(new { success = true, data = plans });
        }

        [HttpPost("workout-plans")]
        public async Task<IActionResult> CreateWorkoutPlan([FromBody] WorkoutPlan plan)
        {
            var userId = GetUserId();
            plan.TrainerId = userId;
            _db.WorkoutPlans.Add(plan);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = plan });
        }

        [HttpGet("feedback")]
        public async Task<IActionResult> GetFeedback()
        {
            var feedbacks = await _db.Feedbacks.Include(f => f.Member).ToListAsync();
            return Ok(new { success = true, data = feedbacks });
        }
    }
}