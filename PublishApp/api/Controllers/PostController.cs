using System.Collections.Immutable;
using api.Data;
using api.Dtos.Post;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace api.Controllers;

[Route("api/Post")]
[ApiController]

public class PostController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IPostRepository _postRepo;
    private readonly UserManager<User> _userManager;
    
    public PostController(ApplicationDbContext context, IPostRepository postRepo, UserManager<User> userManager)
    {
        _context = context;
        _postRepo = postRepo;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] QueryObject query, [FromQuery(Name = "pageIndex")] int? page)
    {
        query.PageIndex = page ?? 1;
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var posts = await _postRepo.GetAllAsync(query);
        
        var postsCount = _context.Posts.AsQueryable().Count();
        
        var postDto = posts.Select(p => p.ToPostDto())
                                        .OrderByDescending(p => p.CreatedOn).ToList();
        
        var queryModel = new PaginationObject()
        {
            PostsNumber = postsCount,
            PageIndex = page ?? 1,
            PostsDisplay = postDto,
        };
        
        return Ok(queryModel);
    }

    [HttpGet("{postId:int}")]
    [Authorize]
    public async Task<IActionResult> GetById([FromRoute] int postId)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var post = await _postRepo.GetByIdAsync(postId);
        if (post == null)
        {
            return NoContent();
        }
        return Ok(post.ToPostDto());
    }

    [HttpPost("{userId}")]
    [Authorize]
    public async Task<IActionResult> Create([FromRoute] string userId, CreatePostRequestDto postDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        // var username = User.GetUsername();
        // var user = await _userManager.FindByNameAsync(username);
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
             return NoContent();
        
        var postModel = new Post
        {
            Title = postDto.Title,
            Content = postDto.Content,
            UserId = user.Id,
            UserName = user.UserName,
            UserProfil = user
        };
        //var postModel = postDto.ToPostFromCreate(userId);
        //postModel.UserProfil = user;
        
        await _postRepo.CreatePostAsync(postModel);
        //_postRepo.CreatePostAsync(postModel);
        return Ok();
    }

    [HttpDelete]
    [Route("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var post = await _postRepo.GetByIdAsync(id);
        if (post == null)
        {
            return NotFound("Post doesn't exist");
        }
        
        var username = User.GetUsername();
        //on recup les posts du current user
        var user = await _userManager.Users.Include(p => p.Posts).FirstOrDefaultAsync(u => u.UserName == username);
        var lastUserPost = user.Posts.OrderByDescending(p => p.CreatedOn).FirstOrDefault();
        
        if (lastUserPost == null)
            return NotFound("User has no posts");

        if (lastUserPost.Id != id)
            return Content("Can't delete this post. It's not the last created");
        
        await _postRepo.DeletePostAsync(id);
        return Ok("Last post was deleted");
    }
}