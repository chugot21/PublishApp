using api.DataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace api.Controllers;

[Route("api/Post")]
[ApiController]

public class PostController : ControllerBase
{
    private readonly ApplicationDBContext _context;
    
    public PostController(ApplicationDBContext context)
    {
        _context = context;
    }
    
    [HttpPost]
    
}