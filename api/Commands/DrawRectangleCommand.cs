using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WhiteBoard.Models;

namespace WhiteBoard.Commands;

public class DrawRectangle : DrawingCommand
{

  public float x { get; set; }
  public float y { get; set; }
  public float w { get; set; }
  public float h { get; set; }

}
