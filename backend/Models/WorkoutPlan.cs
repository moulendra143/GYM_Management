using System.ComponentModel.DataAnnotations;

namespace GymBackend.Models
{
    public class WorkoutPlan
    {
        [Key]
        public int Id { get; set; }
        public int? MemberId { get; set; }
        public int? TrainerId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
}