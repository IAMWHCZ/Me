using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CZ.Me.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class TestController:ControllerBase
{
	[HttpGet]
	public IActionResult Get()
	{
		return Ok("Hello World!");
	}
}
