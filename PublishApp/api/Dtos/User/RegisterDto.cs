using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User;

public class RegisterDto
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
    [Required]
    public string? Password { get; set; }
    //public List<PostDto> Posts { get; set; } // a sup ?
}