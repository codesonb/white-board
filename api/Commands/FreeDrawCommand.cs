using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WhiteBoard.Models;

namespace WhiteBoard.Commands;

public class FreeDraw : DrawingCommand
{

  public List<PointF> path { get; set; }
}
