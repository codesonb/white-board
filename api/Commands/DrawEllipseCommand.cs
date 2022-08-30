using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WhiteBoard.Models;

namespace WhiteBoard.Commands;

public class DrawEllipse : DrawingCommand
{

  public float ox { get; set; }
  public float oy { get; set; }
  public float rx { get; set; }
  public float ry { get; set; }
}