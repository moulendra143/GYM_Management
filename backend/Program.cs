using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using GymBackend.Data;
using GymBackend.Services;
using GymBackend.Models;
using System.Linq;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// ensure appsettings.json is read
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// bind Kestrel to the port the frontend expects
builder.WebHost.UseUrls("http://localhost:5000");

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Allow requests from React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});


// Use SQL Server (configured via appsettings.json). Enable transient retries.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure()
    ));

builder.Services.AddSingleton<TokenService>();

// JWT config
var jwtKey = builder.Configuration["Jwt:Key"] ?? "ReplaceThisWithASecureKeyForProduction";
var keyBytes = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
    };
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

// enable CORS
app.UseCors("AllowReact");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// root redirect
app.MapGet("/", () => Results.Redirect("/swagger"));


// Ensure database + seed data (non-fatal when DB is unavailable)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        db.Database.EnsureCreated();

        if (!db.Users.Any())
        {
            var admin = new User
            {
                Username = "admin",
                Password = "admin123",
                Role = "Admin",
                Name = "Administrator",
                Email = "admin@example.com"
            };

            var john = new User
            {
                Username = "john",
                Password = "john123",
                Role = "Member",
                Name = "John Doe",
                Email = "john@example.com"
            };

            db.Users.AddRange(admin, john);
            db.SaveChanges();

            var member = new Member
            {
                UserId = john.Id,
                Phone = "1234567890",
                Address = "123 Main St"
            };

            db.Members.Add(member);
            db.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogWarning(ex, "Database unavailable on startup. Continuing without DB (seed skipped).");
    }
}

app.Run();