using System.ComponentModel.DataAnnotations;
using System.Globalization;
using api.Dtos.Post;

namespace api.Dtos.User;

public class UserDto
{
    [Required]
    public string? Username { get; set; }
    [Required]
    public string? FirstName { get; set; }
    [Required]
    public string? LastName { get; set; }
    //[DataType(DataType.Date)]
    [Required]
    public DateTime BornDateTime { get; set; }
    //[Required]
    //public string? Password { get; set; }
    //public List<PostDto> Posts { get; set; } // a sup ?
}