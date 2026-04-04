using System.ComponentModel.DataAnnotations;

namespace GymBackend.Models
{
    public class Trainer
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public string? Specialty { get; set; }
    }
}
