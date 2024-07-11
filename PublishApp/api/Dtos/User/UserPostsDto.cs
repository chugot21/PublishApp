using System.ComponentModel.DataAnnotations;
using api.Dtos.Post;

namespace api.Dtos.User;

public class UserPostsDto
{
    [Required]
    public string? Username { get; set; }
    // [Required]
    // public string? FirstName { get; set; }
    // [Required]
    // public string? LastName { get; set; }
    // //[DataType(DataType.Date)]
    // [Required]
    // public DateTime BornDateTime { get; set; }
    public List<PostDtoUnderUser> Posts { get; set; }
}