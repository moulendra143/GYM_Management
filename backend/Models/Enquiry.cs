using System;
using System.ComponentModel.DataAnnotations;

namespace GymBackend.Models
{
    public class Enquiry
    {
        [Key]
        public int Id { get; set; }
        public string? Message { get; set; }
        public string? From { get; set; }
        public bool Resolved { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
