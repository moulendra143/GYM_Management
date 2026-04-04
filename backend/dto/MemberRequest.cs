public class MemberRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string FullName { get; set; }
    public string Gender { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public int? Age { get; set; }
    public decimal? Weight { get; set; }
    public decimal? Height { get; set; }
    public int? MembershipPlanId { get; set; }
    public int? TrainerId { get; set; }
    public DateTime? StartDate { get; set; }
    public string? Email { get; set; }
}