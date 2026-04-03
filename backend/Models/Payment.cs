using System;
using System.ComponentModel.DataAnnotations;

namespace GymBackend.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }
        public int? MemberId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string? Notes { get; set; }
    }
}
