using api.Models;

namespace api.Helpers;

public class QueryObject
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}