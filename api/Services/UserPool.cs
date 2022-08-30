using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;

using WhiteBoard.Models;

namespace WhiteBoard.Services
{
  public class UserPool
  {

    // singleton
    public static readonly UserPool Instance = new UserPool();
    private UserPool() {}

    // data
    private static Random rnd = new Random();
    public Dictionary<int, Client> Pool { get; } = new Dictionary<int, Client>();

    // action
    public static Client Create(WebSocket socket)
    {
      int id;
      do { id = rnd.Next(int.MaxValue); }
      while (Instance.Pool.ContainsKey(id));

      var client = new Client(id, socket);
      Instance.Pool.Add(id, client);
      return client;
    }

  }
}