
import BaseDrawingStrategy from './BaseDrawingStrategy';
import DrawEllipseCommand from '../commands/DrawEllipseCommand';

import WB from '../controllers/WhiteBoard';

class EllipseStrategy extends BaseDrawingStrategy
{
  constructor() { super('ellipse'); }
  
  // point 1 is the edge
  // point 2 is the centre

  mousedown(pos, e)
  {
    this.command = new DrawEllipseCommand(WB.style);
    this.sx = pos.x;
    this.sy = pos.y;
  }
  mouseup(pos, e)
  {
    // fin radius
    let cmd = this.command;
    let { rx, ry } = this.calcRadius(pos);
    cmd.ox = pos.x;
    cmd.oy = pos.y;
    cmd.rx = rx;
    cmd.ry = ry;
    WB.apply(cmd);
    this.command = null;
  }
  mousemove(pos, e) {
    if (!this.command) return;

    // find radius
    let { rx, ry } = this.calcRadius(pos);

    // draw on preview
    let g = WB.ctxP;
    WB.clearPreview();
    g.beginPath();
    g.ellipse(pos.x, pos.y, rx, ry, 0, 0, 2*Math.PI);
    g.stroke();
  }

  calcRadius(pos)
  { /* Ellipse equation
     * (x-h)^2 / a^2 + (y-k)^2 / b^2 = 1
     * x and y are the starting point lying on the ellipse
     * h and k are the centre, which is current point
     *
     * -- where b/a = dy/dx, so that the ellipse is on scale and we have only one solution
     * [dx, dy] = [x-h, y-k]  --> [ sx-posX, sy-posY ]
     * dx^2 / a^2 + dy^2 / b^2 = 1    <-- sub: b = dy/dx * a
     * a^2 = dx^2 + dy^2 / (dy/dx)^2
     * a^2 = 2dx^2
     * a = |sqrt(2 dx^2)|
     */
    
    let dx = this.sx - pos.x;
    let dy = this.sy - pos.y;
    let rx = Math.abs(Math.sqrt( 2 * Math.pow(dx, 2) ));
    let ry = Math.abs(dy / dx * rx);

    return { rx, ry };
  }

}

export default EllipseStrategy;
