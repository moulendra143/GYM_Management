using Microsoft.EntityFrameworkCore;
using GymBackend.Models;

namespace GymBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<MembershipPlan> MembershipPlans { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<WorkoutPlan> WorkoutPlans { get; set; }
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<Enquiry> Enquiries { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
    }
}