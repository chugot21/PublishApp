using api.DataBase;
using api.Dtos.User;
using api.Interfaces;
using api.Mappers;
using api.Models;
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

    public UserController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signinManager = signInManager;
    }

    [HttpGet("{username}")]
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
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.FirstName,
                BornDateTime = user.BornDateTime,
                Posts = user.Posts.Select(c => c.ToPostDto()).ToList()
            }
        );
    }
    
    [HttpPost("login")]

    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        //cherche dans la DB le user et le retourne avec userManager
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.Username.ToLower());
        if (user == null)
            return Unauthorized("Invalid username !");

        //on check le password avec signin manager.
        var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
        if (!result.Succeeded)
            return Unauthorized("username not found and/or password incorrect");
        return Ok(
            new NewUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            }
        );
    }
}