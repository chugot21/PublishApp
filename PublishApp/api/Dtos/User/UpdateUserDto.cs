using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User;

public class UpdateUserDto
{
    [Required]
    public string? FirstName { get; set; }
    [Required]
    public string? LastName { get; set; }
    //[DataType(DataType.Date)]
    [Required]
    public DateTime BornDateTime { get; set; }
}