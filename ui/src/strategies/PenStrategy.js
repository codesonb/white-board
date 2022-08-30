
import BaseDrawingStrategy from './BaseDrawingStrategy';
import FreeDrawCommand from '../commands/FreeDrawCommand';

import WB from '../controllers/WhiteBoard';


class PenStrategy extends BaseDrawingStrategy
{
  constructor() { super('pen'); }

  mousedown(pos, e)
  {
    this.sx = pos.x;
    this.sy = pos.y;
    this.command = new FreeDrawCommand(WB.style, pos);
  }
  mouseup(pos, e)
  {
    WB.apply(this.command);
    this.command = null;
  }
  mousemove(pos, e)
  {
    if (!this.command) return;

    // draw on preview
    let g = WB.ctxP;
    g.beginPath();
    g.moveTo(this.sx, this.sy);
    g.lineTo(pos.x, pos.y);
    g.stroke();

    // update to next movement
    this.sx = pos.x;
    this.sy = pos.y;

    // update to command
    this.command.push(pos);
  }

}

export default PenStrategy;
