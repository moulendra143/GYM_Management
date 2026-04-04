using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymBackend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        [Column("PasswordHash")]
        public string Password { get; set; }
        public string Role { get; set; } = "Member";
        public string? Name { get; set; }
        public string? Email { get; set; }
    }
}