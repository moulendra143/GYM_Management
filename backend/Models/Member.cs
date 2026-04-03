using System.ComponentModel.DataAnnotations;

namespace GymBackend.Models
{
    public class Member
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }

        public int? MembershipPlanId { get; set; }
        public MembershipPlan? MembershipPlan { get; set; }

        public int? TrainerId { get; set; }
        public Trainer? Trainer { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public int? Age { get; set; }
        public decimal? Weight { get; set; }
        public int? Height { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
    }
}
