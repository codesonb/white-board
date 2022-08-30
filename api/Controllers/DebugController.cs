using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using WhiteBoard.Models;
using WhiteBoard.Services;


namespace WhiteBoard.Controllers;

public class DebugController
{

  [HttpGet("/amine/clear")]
  public string ClearData()
  {
    RoomPool.Instance.Pool.Clear();
    foreach (var u in UserPool.Instance.Pool.Values)
    {
      u.Disconnect();
    }
    UserPool.Instance.Pool.Clear();
    return "data cleared";
  }



}
