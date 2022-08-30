
import BaseDrawingStrategy from './BaseDrawingStrategy';
import DrawRectangleCommand from '../commands/DrawRectangleCommand';

import WB from '../controllers/WhiteBoard';

class RectangleStrategy extends BaseDrawingStrategy
{
  constructor() { super('rect'); }

  mousedown(pos, e)
  {
    this.command = new DrawRectangleCommand(WB.style);
    this.command.x = pos.x;
    this.command.y = pos.y;
  }
  mouseup(pos, e)
  {
    if (this.command.w < 0) {
      this.command.x = pos.x;
      this.command.w = -this.command.w;
    }
    if (this.command.h < 0) {
      this.command.y = pos.y;
      this.command.h = -this.command.h;
    }
    WB.apply(this.command);
    this.command = null;
  }

  mousemove(pos, e) {
    if (!this.command) return;

    // find width
    let c = this.command;
    c.w = pos.x - c.x;
    c.h = pos.y - c.y;

    // draw on preview
    let g = WB.ctxP;
    WB.clearPreview();
    g.beginPath();
    g.rect(c.x, c.y, c.w, c.h);
    g.stroke();
  }

}

export default RectangleStrategy;
