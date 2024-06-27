using api.Data;
using api.Dtos.User;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Repository;

public class PostRepository : IPostRepository
{

    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;
    
    public PostRepository(ApplicationDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }
    
    public async Task<List<Post>> GetAllAsync(QueryObject query)
    {
        var posts =  _context.Posts.AsQueryable();
        
        var skipNumber = (query.PageNumber - 1) * query.PageSize;

        return await posts.Skip(skipNumber).Take(query.PageSize).ToListAsync();
    }

    public async Task<Post?> GetByIdAsync(int id)
    {
        return await _context.Posts.Include(u => u.UserProfil).FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Post> CreatePostAsync(Post postModel)
    {
        await _context.Posts.AddAsync(postModel);
        await _context.SaveChangesAsync();
        return postModel;
    }

    public async Task<Post?> DeletePostAsync(int id)
    {
        var post = await _context.Posts.FirstOrDefaultAsync(c => c.Id == id);
        if (post == null)
            return null;
        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();
        return post;
    }
    
    // public async Task<User?> UpdateUserAsync(string id, UpdateUserDto userDto)
    // {
    //     var existingUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
    //     if (existingUser == null)
    //         return null;
    //     existingUser.FirstName = userDto.FirstName;
    //     existingUser.LastName = userDto.LastName;
    //     existingUser.BornDateTime = userDto.BornDateTime;
    //
    //     await _context.SaveChangesAsync();
    //     return existingUser;
    // }
}