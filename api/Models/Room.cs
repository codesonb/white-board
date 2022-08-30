using System;
using System.Collections.Generic;

using WhiteBoard.Commands;
using WhiteBoard.Services;

namespace WhiteBoard.Models;

public class Room
{

  internal Room(string linkId, Client owner)
  {
    this.ID = linkId;
    this.Users.Add(owner.ID, owner);
    owner.Room = this;
    owner.Send(new InvokeEvent("joint", new { linkId }));
  }

  public string ID { get; set; }
  public Dictionary<int, Client> Users { get; } = new Dictionary<int, Client>();

  public Client FirstUser => Users.Values.First();

  public void AddClient(Client client)
  {
    if (Users.ContainsKey(client.ID)) return;
    Users.Add(client.ID, client);
    client.Room = this;
    this.Broadcast(new InvokeEvent("infoupdate", new { action = "add", resource = "client", client }));
    Console.WriteLine($"Client {client.ID} has joint room {ID}");
  }
  public void RemoveClient(Client client)
  {
    if (!Users.ContainsKey(client.ID)) return;
    Users.Remove(client.ID);
    #pragma warning disable CS8625
    client.Room = null;
    #pragma warning restore CS8625

    if (Users.Count > 0)
    {
      // broadcast update to other users
      this.Broadcast(new InvokeEvent("infoupdate", new { action = "remove", resource = "client", client }));
    } else {
      // no more users, remove room from pool
      RoomPool.Remove(this);
    }

  }

  public void Broadcast(InvokeEvent message)
  {
    foreach (var u in Users.Values) u.Send(message);
  }
  public void Broadcast(InvokeEvent message, Client client)
  {
    foreach (var u in Users.Values)
    {
      if (u.ID != client.ID) u.Send(message);
    }
  }
  public void Broadcast(Command command)
  {
    foreach (var u in Users.Values) { u.Send(command); }
  }
  public void Broadcast(Command command, Client client)
  {
    foreach (var u in Users.Values)
    {
      if (u.ID != client.ID) u.Send(command);
    }
  }

}

public class RoomDTO
{
  private Room _room;
  public RoomDTO(Room room)
  {
    _room = room;
  }

  public string? LinkID => _room.ID;
  public List<object> Users => (
    from x in _room.Users.Values
    select new {
      id = x.ID,
      name = x.Name,
      state = x.State
    }).Cast<object>().ToList();

}
