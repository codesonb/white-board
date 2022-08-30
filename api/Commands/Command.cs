
using WhiteBoard.Models;

namespace WhiteBoard.Commands;

#pragma warning disable CS8618
public class Command
{
  public string type { get; set; }
  public virtual void Execute(Client client) { }
}
#pragma warning restore CS8618
