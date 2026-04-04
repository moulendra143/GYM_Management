using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymBackend.Data;
using GymBackend.Models;
using BCrypt.Net;

namespace GymBackend.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _db;
        public AdminController(AppDbContext db) { _db = db; }

        [HttpGet("dashboard")]
        public async Task<IActionResult> Dashboard()
        {
            var members = await _db.Members.CountAsync();
            var trainers = await _db.Trainers.CountAsync();
            var equipment = await _db.Equipment.CountAsync();
            var payments = await _db.Payments.SumAsync(p => (decimal?)p.Amount) ?? 0;
            return Ok(new { success = true, data = new { members, trainers, equipment, payments } });
        }

        // ==================== MEMBERS ====================
        [HttpGet("members")]
        public async Task<IActionResult> GetMembers()
        {
            var members = await _db.Members.Include(m => m.User).ToListAsync();
            return Ok(new { success = true, data = members });
        }

        [HttpPost("members")]
        public async Task<IActionResult> AddMember([FromBody] MemberRequest payload)
        {
            try
            {
                // Create User (username/password)
                var user = new User
                {
                    Username = payload.Username,
                    // Password = BCrypt.HashPassword(payload.Password),
                    Password = BCrypt.Net.BCrypt.HashPassword(payload.Password),                    Role = "Member",
                    Name = payload.FullName,
                    Email = payload.Email   // ensure MemberRequest has Email (string? optional)
                };
                _db.Users.Add(user);
                await _db.SaveChangesAsync();

                // Create Member (no Username/Password)
                var member = new Member
                {
                    UserId = user.Id,
                    FullName = payload.FullName,
                    Gender = payload.Gender,
                    Phone = payload.Phone,
                    Address = payload.Address,
                    Age = payload.Age,
                    Weight = payload.Weight,
                    Height = payload.Height,
                    MembershipPlanId = payload.MembershipPlanId,
                    TrainerId = payload.TrainerId,
                    StartDate = payload.StartDate
                };
                _db.Members.Add(member);
                await _db.SaveChangesAsync();

                return Ok(new { success = true, data = member });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpPut("members/{id}")]
        public async Task<IActionResult> UpdateMember(int id, [FromBody] MemberRequest payload)
        {
            var member = await _db.Members.Include(m => m.User).FirstOrDefaultAsync(m => m.Id == id);
            if (member == null) return NotFound();

            // Update Member table
            member.FullName = payload.FullName;
            member.Gender = payload.Gender;
            member.Phone = payload.Phone;
            member.Address = payload.Address;
            member.Age = payload.Age;
            member.Weight = payload.Weight;
            member.Height = payload.Height;
            member.MembershipPlanId = payload.MembershipPlanId;
            member.TrainerId = payload.TrainerId;
            member.StartDate = payload.StartDate;

            // Update linked User (if exists)
            if (member.User != null)
            {
                member.User.Username = payload.Username;
                if (!string.IsNullOrEmpty(payload.Password))
                {
                    member.User.Password = BCrypt.Net.BCrypt.HashPassword(payload.Password);
                }
                member.User.Name = payload.FullName;
                member.User.Email = payload.Email;
            }

            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        [HttpDelete("members/{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            var member = await _db.Members.FindAsync(id);
            if (member == null) return NotFound();
            _db.Members.Remove(member);
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        [HttpPost("memberships/assign")]
        public async Task<IActionResult> AssignMembership([FromBody] dynamic payload)
        {
            // Placeholder – implement if needed
            return Ok(new { success = true });
        }

        // ==================== MEMBERSHIP PLANS ====================
        [HttpGet("membership-plans")]
        public async Task<IActionResult> GetPlans()
        {
            var plans = await _db.MembershipPlans.ToListAsync();
            return Ok(new { success = true, data = plans });
        }

        [HttpPost("membership-plans")]
        public async Task<IActionResult> AddPlan([FromBody] MembershipPlan plan)
        {
            if (string.IsNullOrEmpty(plan.Name))
                return BadRequest(new { success = false, message = "Name is required" });

            _db.MembershipPlans.Add(plan);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = plan });
        }

        [HttpPut("membership-plans/{id}")]
        public async Task<IActionResult> UpdatePlan(int id, [FromBody] MembershipPlan plan)
        {
            var existing = await _db.MembershipPlans.FindAsync(id);
            if (existing == null) return NotFound();
            existing.Name = plan.Name;
            existing.Price = plan.Price;
            existing.DurationDays = plan.DurationDays;
            existing.Description = plan.Description;
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = existing });
        }

        [HttpDelete("membership-plans/{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var plan = await _db.MembershipPlans.FindAsync(id);
            if (plan == null) return NotFound();
            _db.MembershipPlans.Remove(plan);
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // ==================== TRAINERS ====================
        [HttpGet("trainers")]
        public async Task<IActionResult> GetTrainers()
        {
            var trainers = await _db.Trainers.Include(t => t.User).ToListAsync();
            return Ok(new { success = true, data = trainers });
        }

        [HttpPost("trainers")]
        public async Task<IActionResult> AddTrainer([FromBody] Trainer trainer)
        {
            _db.Trainers.Add(trainer);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = trainer });
        }

        [HttpPut("trainers/{id}")]
        public async Task<IActionResult> UpdateTrainer(int id, [FromBody] Trainer trainer)
        {
            var existing = await _db.Trainers.FindAsync(id);
            if (existing == null) return NotFound();
            existing.Specialty = trainer.Specialty;
            // also update User if needed
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = existing });
        }

        [HttpDelete("trainers/{id}")]
        public async Task<IActionResult> DeleteTrainer(int id)
        {
            var trainer = await _db.Trainers.FindAsync(id);
            if (trainer == null) return NotFound();
            _db.Trainers.Remove(trainer);
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // ==================== PAYMENTS ====================
        [HttpGet("payments")]
        public async Task<IActionResult> GetPayments([FromQuery] string memberFilter = "")
        {
            var payments = await _db.Payments.ToListAsync();
            return Ok(new { success = true, data = payments });
        }

        [HttpPost("payments")]
        public async Task<IActionResult> RecordPayment([FromBody] Payment payment)
        {
            _db.Payments.Add(payment);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = payment });
        }

        // ==================== WORKOUT PLANS ====================
        [HttpGet("workout-plans")]
        public async Task<IActionResult> GetWorkoutPlans([FromQuery] int? memberId)
        {
            var query = _db.WorkoutPlans.AsQueryable();
            if (memberId.HasValue)
                query = query.Where(w => w.MemberId == memberId.Value);
            var plans = await query.ToListAsync();
            return Ok(new { success = true, data = plans });
        }

        [HttpPost("workout-plans")]
        public async Task<IActionResult> AddWorkoutPlan([FromBody] WorkoutPlan plan)
        {
            _db.WorkoutPlans.Add(plan);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = plan });
        }

        // ==================== ENQUIRIES ====================
        [HttpGet("enquiries")]
        public async Task<IActionResult> GetEnquiries()
        {
            var enquiries = await _db.Enquiries.ToListAsync();
            return Ok(new { success = true, data = enquiries });
        }

        [HttpPut("enquiries/{id}/resolve")]
        public async Task<IActionResult> ResolveEnquiry(int id)
        {
            var enquiry = await _db.Enquiries.FindAsync(id);
            if (enquiry == null) return NotFound();
            enquiry.Resolved = true;
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // ==================== EQUIPMENT ====================
        [HttpGet("equipment")]
        public async Task<IActionResult> GetEquipment()
        {
            var equipment = await _db.Equipment.ToListAsync();
            return Ok(new { success = true, data = equipment });
        }

        [HttpPost("equipment")]
        public async Task<IActionResult> AddEquipment([FromBody] Equipment equipment)
        {
            _db.Equipment.Add(equipment);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = equipment });
        }

        [HttpPut("equipment/{id}")]
        public async Task<IActionResult> UpdateEquipment(int id, [FromBody] Equipment equipment)
        {
            var existing = await _db.Equipment.FindAsync(id);
            if (existing == null) return NotFound();
            existing.Name = equipment.Name;
            existing.Description = equipment.Description;
            existing.Quantity = equipment.Quantity;
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = existing });
        }

        [HttpDelete("equipment/{id}")]
        public async Task<IActionResult> DeleteEquipment(int id)
        {
            var equipment = await _db.Equipment.FindAsync(id);
            if (equipment == null) return NotFound();
            _db.Equipment.Remove(equipment);
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }
    }
}