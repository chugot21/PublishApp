using api.Helpers;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Interfaces;

public interface IPostRepository
{
    Task<List<Post>> GetAllAsync(QueryObject query);
    Task<Post?> GetByIdAsync(int id);
    Task<Post> CreatePostAsync(Post postModel);
    Task<Post?> DeletePostAsync(int id);
}