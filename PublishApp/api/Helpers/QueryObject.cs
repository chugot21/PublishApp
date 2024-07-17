using api.Dtos.Post;
using api.Models;

namespace api.Helpers;

public class QueryObject
{
    public int PageIndex { get; set; } = 1;
    public int PageSize { get; set; } = 5;
}

public class PaginationObject
{
    public int PostsNumber { get; set; }
    public int PageIndex { get; set; } = 1;
    public int PageSize { get; set; } = 5;
    public List<PostDto> PostsDisplay { get; set; } 
}