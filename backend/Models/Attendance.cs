using System;
using System.ComponentModel.DataAnnotations;

namespace GymBackend.Models
{
    public class Attendance
    {
        [Key]
        public int Id { get; set; }
        public int? MemberId { get; set; }
        public DateTime CheckInTime { get; set; } = DateTime.UtcNow;
    }
}
