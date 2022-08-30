using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WhiteBoard.Models;

namespace WhiteBoard.Commands;

public abstract class DrawingCommand : Command
{
  public int clientId { get; set; }
  public DrawStyle style { get; set; }

  public override void Execute(Client client)
  {
    this.clientId = client.ID;
    client.Room.Broadcast(this, client);
  }
}
