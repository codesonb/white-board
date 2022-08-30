using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WhiteBoard.Services;

using WhiteBoard.Models;

namespace WhiteBoard.Commands;

#pragma warning disable CS8618
public class JoinRoom : Command
{
  public string roomId { get; set; }
  public string name { get; set; }
  public string password { get; set; }

  public override void Execute(Client client)
  {
    Console.WriteLine($"Searching room ID: {roomId}");
    Room room = RoomPool.Find(roomId);
    if (null == room)
    {
      room = RoomPool.Create(client);
    } else {
      room.AddClient(client);
    }
  }
}
#pragma warning restore CS8618
