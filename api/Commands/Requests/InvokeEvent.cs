using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WhiteBoard.Commands;

public class InvokeEvent
{
  public string type => nameof(InvokeEvent);
  public string @event { get; set; }
  public object args { get; set; }

  public InvokeEvent(string @event, object args)
  {
    this.@event = @event;
    this.args = args;
  }
}
