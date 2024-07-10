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
    [Required]
    //[DataType(DataType.Date)]
    public DateTime BornDateTime { get; set; }
    //[Required]
    //public string? password { get; set; }
    //public List<PostDto> Posts { get; set; } // a sup ?
}