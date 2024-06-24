using Microsoft.AspNetCore.Identity;
namespace api.Models;

public class User : IdentityUser
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime BornDateTime { get; set; }
    public List<Post> Posts { get; set; } = new List<Post>();
}