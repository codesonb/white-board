using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WhiteBoard.Models;

namespace WhiteBoard.Services;

public class RoomPool
{
  // singleton
  public static readonly RoomPool Instance = new RoomPool();
  private RoomPool() {}

  // data
  private static Random rnd = new Random();
  public Dictionary<string, Room> Pool { get; } = new Dictionary<string, Room>();

  // action
  public static Room Create(Client owner)
  {
    string link;
    byte[] bytes = new byte[12];
    do
    {
      rnd.NextBytes(bytes);
      link = Convert.ToBase64String(bytes)
        .TrimEnd('=')
        .Replace('+', '-')
        .Replace('/', '_');
    }
    while (Instance.Pool.ContainsKey(link));

    var room = new Room(link, owner);
    Instance.Pool.Add(link, room);

    Console.WriteLine($"Created room {link}");
    return room;
  }

  public static void Remove(Room room)
  {
    if (Instance.Pool.ContainsKey(room.ID))
    {
      Instance.Pool.Remove(room.ID);
      foreach (var u in room.Users.Values)
      {
        #pragma warning disable CS8625
        u.Room = null;
        u.Disconnect(true);
        #pragma warning restore CS8625
      }
      room.Users.Clear();
    }
  }

  public static Room Find(string roomId)
  {
    #pragma warning disable CS8603
    if (string.IsNullOrWhiteSpace(roomId)) return null;
    Instance.Pool.TryGetValue(roomId, out var room);
    return room;
    #pragma warning restore CS8603
  }

}
