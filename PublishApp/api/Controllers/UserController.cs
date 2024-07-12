using api.Data;
using api.Dtos.Post;
using api.Dtos.User;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("api/user")]
[ApiController]

public class UserController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<User> _signinManager;
    private readonly IPostRepository _postRepository;

    public UserController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager, IPostRepository postRepository)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signinManager = signInManager;
        _postRepository = postRepository;
    }

    /*[HttpGet("{username}")]
    [Authorize]
    public async Task<IActionResult> GetById([FromRoute] string username)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName.ToLower() == username.ToLower());
        if (user == null)
        {
            return NoContent();
        }
        
        return Ok(
            new UserDto
            {
                username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                BornDateTime = user.BornDateTime
            }
        );
    }*/
    // [HttpGet]
    // [Authorize]
    // public async Task<IActionResult> GetAllUsername()
    // {
    //     
    // }
    
    [HttpGet("{username}")]
    [Authorize]
    public async Task<IActionResult> GetPostsByUserId([FromRoute] string username)
    {
        var user = await _userManager.Users.Include(p => p.Posts).FirstOrDefaultAsync(u => u.UserName.ToLower() == username.ToLower());
        if (user == null)
        {
            return NoContent();
        }
        
        return Ok(
            new UserPostsDto
            {
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                BornDateTime = user.BornDateTime,
                Posts = user.Posts.Select(p => p.ToPostDtoUnderUser())
                    .OrderByDescending(p => p.CreatedOn).ToList()
            }
        );
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        //cherche dans la DB le user et le retourne avec userManager
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.username.ToLower());
        if (user == null)
            return Unauthorized("Invalid username !");

        //on check le password avec signin manager.
        var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.password, false);
        if (!result.Succeeded)
            return Unauthorized("username not found and/or password incorrect");
        return Ok( //_tokenService.CreateToken(user)
            new NewUserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            }
        );
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new User
            {
                UserName = registerDto.Username,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                BornDateTime = registerDto.BornDateTime
            };

            var createdUser = await _userManager.CreateAsync(user, registerDto.Password);

            if (createdUser.Succeeded)
            {
                return Ok(
                    new NewUserDto
                    {
                        Id = user.Id,
                        Username = user.UserName,
                        Token = _tokenService.CreateToken(user)
                    });
            }
            else
            {
                return StatusCode(500, createdUser.Errors);
            }
        }
        catch (Exception e)
        {
            return StatusCode(500, e);
        }
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize]

    public async Task<IActionResult> Update([FromRoute] string id, [FromBody] UpdateUserDto updateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
            return NotFound(0);
        
        user.FirstName = updateDto.FirstName;
        user.LastName = updateDto.LastName;
        user.BornDateTime = updateDto.BornDateTime;
        // var userModel = await _userManager.UpdateUserAsync(id, updateDto);
        // if (userModel == null)
        //     return NotFound();
        await _userManager.UpdateAsync(user);
        return Ok("User was update");
    }
}