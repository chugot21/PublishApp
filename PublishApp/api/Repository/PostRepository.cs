using api.DataBase;
using api.Helpers;
using api.Interfaces;
using api.Models;

namespace api.Repository;

public class PostRepository : IPostRepository
{

    private readonly ApplicationDBContext _context;
    
    public PostRepository(ApplicationDBContext context)
    {
        _context = context;
    }
    
    public async Task<List<Post>> GetAllAsync(QueryObject query)
    {
        
    }

    public async Task<Post> CreatePostAsync(Post postModel)
    {
        await _context.Posts.AddAsync(postModel);
        await _context.SaveChangesAsync();
        return postModel;
    }

    public async Task<Post?> DeletePostAsync(int id)
    {
        
    }
    
}