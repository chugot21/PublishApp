using api.Models;

namespace api.Helpers;

public class QueryObject
{
    public User Username { get; set; } //peut etre par id a voir si relou
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}