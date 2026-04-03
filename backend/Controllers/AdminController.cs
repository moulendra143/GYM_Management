using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymBackend.Data;
using GymBackend.Models;
using System.Net.Mail;

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

        // Members
        [HttpGet("members")]
        public async Task<IActionResult> GetMembers() => Ok(new {
            success = true,
            data = await _db.Members
                .Include(m => m.User)
                .Include(m => m.MembershipPlan)
                .Include(m => m.Trainer)
                .ToListAsync()
        });

        public class AddMemberRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public int? Age { get; set; }
            public decimal? Weight { get; set; }
            public int? Height { get; set; }
            public string Phone { get; set; }
            public string Address { get; set; }
            public int? MembershipPlanId { get; set; }
            public int? TrainerId { get; set; }
        }

        [HttpPost("members")]
        public async Task<IActionResult> AddMember([FromBody] AddMemberRequest req)
        {
            if (await _db.Users.AnyAsync(u => u.Username == req.Username))
                return BadRequest(new { success = false, message = "Username already exists" });

            var user = new User
            {
                Username = req.Username,
                Password = req.Password,
                Role = "Member",
                Name = req.Name,
                Email = req.Email
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var member = new Member
            {
                UserId = user.Id,
                Age = req.Age,
                Weight = req.Weight,
                Height = req.Height,
                Phone = req.Phone,
                Address = req.Address,
                MembershipPlanId = req.MembershipPlanId,
                TrainerId = req.TrainerId
            };

            if (req.MembershipPlanId.HasValue)
            {
                var plan = await _db.MembershipPlans.FindAsync(req.MembershipPlanId.Value);
                if (plan != null)
                {
                    member.StartDate = DateTime.Now;
                    member.EndDate = member.StartDate.Value.AddDays(plan.DurationDays);
                }
            }

            _db.Members.Add(member);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = new { member, user } });
        }

        [HttpPut("members/{id}")]
        public async Task<IActionResult> UpdateMember(int id, [FromBody] Member m)
        {
            var existing = await _db.Members.FindAsync(id);
            if (existing == null) return NotFound(new { success = false });
            existing.Age = m.Age;
            existing.Weight = m.Weight;
            existing.Height = m.Height;
            existing.Phone = m.Phone;
            existing.Address = m.Address;
            existing.MembershipPlanId = m.MembershipPlanId;
            existing.TrainerId = m.TrainerId;

            if (m.MembershipPlanId.HasValue && m.MembershipPlanId != existing.MembershipPlanId)
            {
                var plan = await _db.MembershipPlans.FindAsync(m.MembershipPlanId.Value);
                if (plan != null)
                {
                    existing.StartDate = DateTime.Now;
                    existing.EndDate = existing.StartDate.Value.AddDays(plan.DurationDays);
                }
            }

            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = existing });
        }

        [HttpDelete("members/{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            var e = await _db.Members.FindAsync(id);
            if (e == null) return NotFound(new { success = false });
            _db.Members.Remove(e);
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        public class AssignMembershipRequest
        {
            public int MemberId { get; set; }
            public int MembershipPlanId { get; set; }
            public int? TrainerId { get; set; }
        }

        [HttpPost("memberships/assign")]
        public async Task<IActionResult> AssignMembership([FromBody] AssignMembershipRequest payload)
        {
            var member = await _db.Members.FindAsync(payload.MemberId);
            if (member == null) return NotFound(new { success = false, message = "Member not found" });

            if (!await _db.MembershipPlans.AnyAsync(p => p.Id == payload.MembershipPlanId))
                return NotFound(new { success = false, message = "Membership plan not found" });

            if (payload.TrainerId.HasValue && !await _db.Trainers.AnyAsync(t => t.Id == payload.TrainerId.Value))
                return NotFound(new { success = false, message = "Trainer not found" });

            member.MembershipPlanId = payload.MembershipPlanId;
            member.TrainerId = payload.TrainerId;

            var plan = await _db.MembershipPlans.FindAsync(payload.MembershipPlanId);
            if (plan != null)
            {
                member.StartDate = DateTime.Now;
                member.EndDate = member.StartDate.Value.AddDays(plan.DurationDays);
            }

            await _db.SaveChangesAsync();

            return Ok(new { success = true, data = member });
        }

        // Plans
        [HttpGet("membership-plans")]
        public async Task<IActionResult> GetPlans() => Ok(new { success = true, data = await _db.MembershipPlans.ToListAsync() });

        [HttpPost("membership-plans")]
        public async Task<IActionResult> AddPlan([FromBody] MembershipPlan plan)
        {
            _db.MembershipPlans.Add(plan);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = plan });
        }

        [HttpPut("membership-plans/{id}")]
        public async Task<IActionResult> UpdatePlan(int id, [FromBody] MembershipPlan plan)
        {
            var p = await _db.MembershipPlans.FindAsync(id);
            if (p == null) return NotFound(new { success = false });
            p.Name = plan.Name; p.Price = plan.Price; p.Description = plan.Description; p.DurationDays = plan.DurationDays;
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = p });
        }

        [HttpDelete("membership-plans/{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var p = await _db.MembershipPlans.FindAsync(id);
            if (p == null) return NotFound(new { success = false });
            _db.MembershipPlans.Remove(p);
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // Trainers
        [HttpGet("trainers")]
        public async Task<IActionResult> GetTrainers() => Ok(new { success = true, data = await _db.Trainers.Include(t => t.User).ToListAsync() });

        [HttpPost("trainers")]
        public async Task<IActionResult> AddTrainer([FromBody] Trainer t)
        {
            _db.Trainers.Add(t);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = t });
        }

        [HttpPut("trainers/{id}")]
        public async Task<IActionResult> UpdateTrainer(int id, [FromBody] Trainer t)
        {
            var existing = await _db.Trainers.FindAsync(id);
            if (existing == null) return NotFound(new { success = false });
            existing.Specialty = t.Specialty;
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = existing });
        }

        [HttpDelete("trainers/{id}")]
        public async Task<IActionResult> DeleteTrainer(int id)
        {
            var e = await _db.Trainers.FindAsync(id);
            if (e == null) return NotFound(new { success = false });
            _db.Trainers.Remove(e);
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // Payments
        [HttpGet("payments")]
        public async Task<IActionResult> GetPayments([FromQuery] string memberFilter = "")
        {
            var payments = await _db.Payments.ToListAsync();
            return Ok(new { success = true, data = payments });
        }

        [HttpPost("payments")]
        public async Task<IActionResult> RecordPayment([FromBody] Payment p)
        {
            _db.Payments.Add(p);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = p });
        }

        // Workout Plans
        [HttpGet("workout-plans")]
        public async Task<IActionResult> GetWorkoutPlans([FromQuery] int? memberId)
        {
            var q = _db.WorkoutPlans.Include(w => w.Member).ThenInclude(m => m.User).AsQueryable();
            if (memberId.HasValue) q = q.Where(w => w.MemberId == memberId.Value);
            var result = await q.Select(w => new {
                w.Id,
                w.Title,
                w.Description,
                w.MemberId,
                MemberName = w.Member == null ? null : (w.Member.User == null ? null : w.Member.User.Name)
            }).ToListAsync();
            return Ok(new { success = true, data = result });
        }

        [HttpPost("workout-plans")]
        public async Task<IActionResult> AddWorkoutPlan([FromBody] WorkoutPlan p)
        {
            _db.WorkoutPlans.Add(p);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = p });
        }

        // Enquiries
        [HttpGet("enquiries")]
        public async Task<IActionResult> GetEnquiries() => Ok(new { success = true, data = await _db.Enquiries.ToListAsync() });

        [HttpPost("enquiries")]
        public async Task<IActionResult> CreateEnquiry([FromBody] Enquiry e)
        {
            if (e == null) return BadRequest(new { success = false });
            e.CreatedAt = DateTime.UtcNow;
            _db.Enquiries.Add(e);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = e });
        }

        [HttpPut("enquiries/{id}/resolve")]
        public async Task<IActionResult> ResolveEnquiry(int id)
        {
            var e = await _db.Enquiries.FindAsync(id);
            if (e == null) return NotFound(new { success = false });
            e.Resolved = true;
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // Equipment
        [HttpGet("equipment")]
        public async Task<IActionResult> GetEquipment() => Ok(new { success = true, data = await _db.Equipment.ToListAsync() });

        [HttpPost("equipment")]
        public async Task<IActionResult> AddEquipment([FromBody] Equipment e)
        {
            _db.Equipment.Add(e);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = e });
        }

        [HttpPut("equipment/{id}")]
        public async Task<IActionResult> UpdateEquipment(int id, [FromBody] Equipment e)
        {
            var found = await _db.Equipment.FindAsync(id);
            if (found == null) return NotFound(new { success = false });
            found.Name = e.Name; found.Description = e.Description; found.Quantity = e.Quantity;
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = found });
        }

        [HttpDelete("equipment/{id}")]
        public async Task<IActionResult> DeleteEquipment(int id)
        {
            var e = await _db.Equipment.FindAsync(id);
            if (e == null) return NotFound(new { success = false });
            _db.Equipment.Remove(e);
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        public class SendNotificationsRequest
        {
            public DateTime FromDate { get; set; }
            public DateTime ToDate { get; set; }
        }

        [HttpPost("send-expiry-notifications")]
        public async Task<IActionResult> SendExpiryNotifications([FromBody] SendNotificationsRequest req)
        {
            var members = await _db.Members
                .Include(m => m.User)
                .Where(m => m.EndDate.HasValue && m.EndDate.Value >= req.FromDate && m.EndDate.Value <= req.ToDate)
                .ToListAsync();

            int sentCount = 0;
            foreach (var member in members)
            {
                if (!string.IsNullOrEmpty(member.User?.Email))
                {
                    await SendEmailAsync(member.User.Email, "Membership Expiry Alert", $"Dear {member.User.Name}, your membership expires on {member.EndDate.Value.ToShortDateString()}. Please renew soon.");
                    sentCount++;
                }
            }

            return Ok(new { success = true, message = $"Notifications sent to {sentCount} members." });
        }

        public class NotificationRequest
        {
            public int? MemberId { get; set; }
            public string? Email { get; set; }
            public string? Subject { get; set; }
            public string? Body { get; set; }
        }

        [HttpPost("notifications/send")]
        public async Task<IActionResult> SendNotification([FromBody] NotificationRequest req)
        {
            if (req == null) return BadRequest(new { success = false, message = "Request required" });

            string? toEmail = null;

            if (req.MemberId.HasValue)
            {
                var member = await _db.Members.Include(m => m.User).FirstOrDefaultAsync(m => m.Id == req.MemberId.Value);
                if (member == null) return NotFound(new { success = false, message = "Member not found" });
                toEmail = member.User?.Email;
                if (string.IsNullOrEmpty(toEmail)) return BadRequest(new { success = false, message = "Member has no email" });
            }
            else if (!string.IsNullOrEmpty(req.Email))
            {
                toEmail = req.Email;
            }
            else
            {
                return BadRequest(new { success = false, message = "Provide MemberId or Email" });
            }

            var subject = string.IsNullOrEmpty(req.Subject) ? "Notification from Gym" : req.Subject;
            var body = req.Body ?? string.Empty;

            try
            {
                await SendEmailAsync(toEmail!, subject, body);
                return Ok(new { success = true, message = "Notification sent" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Failed to send notification", detail = ex.Message });
            }
        }

        public class SendRemindersRequest
        {
            // Optional: list of days before expiry to remind (e.g. [1,3,7])
            public int[]? DaysBefore { get; set; }
        }

        [HttpPost("send-reminders")]
        public async Task<IActionResult> SendExpiryReminders([FromBody] SendRemindersRequest? req)
        {
            try
            {
                var days = req?.DaysBefore ?? new[] { 1, 3, 7 };

                var now = DateTime.UtcNow.Date;
                var totalSent = 0;
                var details = new System.Collections.Generic.List<object>();

                foreach (var d in days.Distinct())
                {
                    var target = now.AddDays(d);
                    var members = await _db.Members
                        .Include(m => m.User)
                        .Where(m => m.EndDate.HasValue && m.EndDate.Value.Date == target)
                        .ToListAsync();

                    var sentForDay = 0;
                    foreach (var member in members)
                    {
                        var email = member.User?.Email;
                        if (string.IsNullOrEmpty(email)) continue;

                        var subject = $"Membership expiring in {d} day{(d>1?"s":"")}";
                        var body = $"Dear {member.User?.Name},\n\nThis is a reminder that your membership will expire on {member.EndDate.Value.ToString("yyyy-MM-dd")}. Please renew to avoid interruption.\n\nRegards,\nGym Team";
                        try
                        {
                            await SendEmailAsync(email, subject, body);
                            sentForDay++;
                        }
                        catch (Exception ex)
                        {
                            // collect individual send errors in details if needed
                            details.Add(new { memberId = member.Id, email, error = ex.Message });
                        }
                    }

                    totalSent += sentForDay;
                    details.Add(new { daysBefore = d, date = target.ToString("yyyy-MM-dd"), sent = sentForDay });
                }

                return Ok(new { success = true, totalSent, details });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Reminder job failed", detail = ex.ToString() });
            }
        }

        private async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            // Configure SMTP settings (example for Gmail, adjust as needed)
            using (var smtpClient = new SmtpClient("smtp.gmail.com"))
            {
                smtpClient.Port = 587;
                smtpClient.Credentials = new System.Net.NetworkCredential("your-email@gmail.com", "your-password");
                smtpClient.EnableSsl = true;

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("your-email@gmail.com"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = false,
                };
                mailMessage.To.Add(toEmail);

                await smtpClient.SendMailAsync(mailMessage);
            }
        }
    }
}
