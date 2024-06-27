namespace api.Models;

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedOn { get; set; } = DateTime.Now;
    public string? UserId { get; set; }
    public string? UserName { get; set; }
    public User UserProfil { get; set; }
}