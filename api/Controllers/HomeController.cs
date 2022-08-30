using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace WhiteBoard.Controllers;

[Route("api")]
public class HomeController : LocalBaseController
{
  private readonly ILogger<HomeController> _logger;

  public HomeController(ILogger<HomeController> logger)
  {
    _logger = logger;
  }

  [HttpGet("ping")]
  public string Ping()
  {
    return "pong!";
  }

}
