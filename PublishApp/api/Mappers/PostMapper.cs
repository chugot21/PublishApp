using api.Dtos.Post;
using api.Models;

namespace api.Mappers;

public static class PostMapper
{
    public static PostDto ToPostDto(this Post postModel)
    {
        return new PostDto
        {
            Title = postModel.Title,
            Content = postModel.Content,
            CreatedOn = postModel.CreatedOn,
            Username = postModel.UserName
        };
    }

    public static PostDtoUnderUser ToPostDtoUnderUser(this Post postModel)
    {
        return new PostDtoUnderUser
        {
            Title = postModel.Title,
            Content = postModel.Content
        };
    }
}