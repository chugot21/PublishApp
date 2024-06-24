using api.Dtos.Post;

namespace api.Dtos.User;

public class UserDto
{
    public string Username { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime BornDateTime { get; set; }
    public List<PostDto> Posts { get; set; }
}