using System.Diagnostics;
using System.Net.WebSockets;
using Microsoft.AspNetCore.Mvc;

using WhiteBoard.Services;

namespace WhiteBoard.Controllers;

public class WsController : LocalBaseController
{
  private readonly ILogger<WsController> _logger;

  public WsController(ILogger<WsController> logger)
  {
    _logger = logger;
  }

  [HttpGet("/ws")]
  public async Task AcceptWebSocket(CancellationToken cancellationToken)
  {
    Console.WriteLine("Entered websocket route");
    if (HttpContext.WebSockets.IsWebSocketRequest)
    {
      Console.WriteLine("Websocket request detected");
      var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();
      var client = UserPool.Create(socket);
      try
      {
        await client.Echo(cancellationToken);
      }
      #pragma warning disable CS0168
      catch (WebSocketException ex)
      #pragma warning restore CS0168
      {
        Console.WriteLine($"[WSE] Client closed: {socket.CloseStatus}");
        Console.WriteLine(ex.Message);
      }
      #pragma warning disable CS0168
      catch (OperationCanceledException ex)
      #pragma warning restore CS0168
      {
        Console.WriteLine($"[OCE] Client closed: {socket.CloseStatus}");
        Console.WriteLine(ex.Message);
      }

      client.Disconnect();

    } else {
      HttpContext.Response.StatusCode = 400;
    }
  }

}
