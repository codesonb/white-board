using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WhiteBoard.Models;

namespace WhiteBoard.Commands;

#pragma warning disable CS8618
public class InitImageRequest : Command
{
  public int reqBy { get; set; }

  public override void Execute(Client client)
  {
    this.reqBy = client.ID;
    client.Room.FirstUser.Send(this);
  }
}
#pragma warning restore CS8618
