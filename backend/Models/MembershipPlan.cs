using System.ComponentModel.DataAnnotations;

namespace GymBackend.Models
{
    public class MembershipPlan
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public int DurationDays { get; set; }
        public string? Description { get; set; }
    }
}
