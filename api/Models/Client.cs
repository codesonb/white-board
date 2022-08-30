using System;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

using WhiteBoard.Commands;

using static System.Text.Encoding;

namespace WhiteBoard.Models;
public class Client
{
  const int C_BUFSZ = 4096;

  protected internal Client(int id, WebSocket socket)
  {
    this.ID = id;
    this.Socket = socket;
  }

  protected readonly WebSocket Socket;

  public int ID { get; }
  public string Name { get; set; }
  public string State => Socket.State.ToString();
  public Room Room { get; set; }

  public async void Disconnect(bool closeSocketOnly = false)
  {
    if (WebSocketState.Open == Socket.State)
    {
      await Socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Server disconnection", CancellationToken.None);
      Socket.Dispose();
    }

    if (!closeSocketOnly && null != this.Room)
    {
      #pragma warning disable CS8625
      Room.RemoveClient(this);
      this.Room = null;
      #pragma warning restore CS8625
    }
  }

  public void Send(InvokeEvent evt)
  {
    Console.WriteLine($"Invoking [{evt.@event}] event to {ID}");
    var json = JsonSerializer.Serialize(evt);
    Send(json);
  }

  public void Send(Command command)
  {
    Console.WriteLine($"Sending [{command.GetType().Name}] command to {ID}");
    var json = JsonSerializer.Serialize<object>(command);
    Send(json);
  }

  public void Send(string message)
  {
    var bytes = UTF8.GetBytes(message);

    int curIdx = 0;
    while (curIdx < bytes.Length)
    {
      int length = Math.Min(C_BUFSZ, bytes.Length - curIdx);
      var buffer = new ArraySegment<byte>(bytes, curIdx, length);
      curIdx += length;
      bool eom = curIdx <= bytes.Length;
      Socket.SendAsync(buffer, WebSocketMessageType.Text, eom, CancellationToken.None);
    }
  }

  public async Task<object> Echo(CancellationToken cancellationToken)
  {
    #pragma warning disable CS8602,CS8603,CS8604
    var buffer = new ArraySegment<byte>(new byte[C_BUFSZ]);

    do
    {
      byte[] data;
      var rslt = await Socket.ReceiveAsync(buffer, cancellationToken);

      Console.WriteLine($"--WS-- Read {rslt.Count}: {rslt.MessageType} {rslt.EndOfMessage}");

      switch (rslt.MessageType)
      {
        case WebSocketMessageType.Close:
          Console.WriteLine($"Client [{this.ID}] disconnect with status {rslt.CloseStatusDescription}");
          return null;
        default:
          // read JSON input
          using (var ms = new MemoryStream())
          {
            while (true)
            {
              ms.Write(buffer.Array, 0, rslt.Count);
              if (rslt.EndOfMessage) { break; }

              rslt = await Socket.ReceiveAsync(buffer, cancellationToken);
              Console.WriteLine($"--WS-- Read {rslt.Count}: {rslt.MessageType} {rslt.EndOfMessage}");
            }
            data = ms.ToArray();
          }
          break;
      }

      // all data received should be JSON
      var json = UTF8.GetString(data);
      var icmd = JsonSerializer.Deserialize<Command>(json);
      DispatchCommand(icmd.type, json);

    } while (!cancellationToken.IsCancellationRequested);

    return null;
    #pragma warning restore CS8602,CS8603,CS8604
  }

  public void DispatchCommand(string type, string json)
  {
    try
    {
      var cmd = CommandFactory.ParseCommand(type, json);
      // Task.Factory.StartNew(() => cmd.Execute(this));
      cmd.Execute(this);
    } catch (Exception ex) {
      Console.WriteLine($"Error in parsing command [{type}]");
      Console.WriteLine(json);
      Console.WriteLine("-----------------------------------");
      Console.WriteLine(ex.GetType().Name);
      Console.WriteLine(ex.Message);
      Console.WriteLine(ex.StackTrace);
    }
  }

}
