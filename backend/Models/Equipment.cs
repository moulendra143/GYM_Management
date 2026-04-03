using System.ComponentModel.DataAnnotations;

namespace GymBackend.Models
{
    public class Equipment
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
    }
}
