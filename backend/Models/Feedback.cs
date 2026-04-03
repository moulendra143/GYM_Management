using System;
using System.ComponentModel.DataAnnotations;

namespace GymBackend.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        public int? MemberId { get; set; }
        public string? Message { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
