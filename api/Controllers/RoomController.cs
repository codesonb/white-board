using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

using WhiteBoard.Models;
using WhiteBoard.Services;

namespace WhiteBoard.Controllers;

[Route("api/room")]
public class RoomController : LocalBaseController
{
  private readonly ILogger<RoomController> _logger;

  public RoomController(ILogger<RoomController> logger)
  {
    _logger = logger;
  }

  [HttpGet()]
  public List<RoomDTO> GetRooms()
  {
    Console.WriteLine("Obtaining room data");
    return (from r in RoomPool.Instance.Pool.Values select new RoomDTO(r)).ToList();
  }

}
