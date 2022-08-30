
import WB from '../controllers/WhiteBoard';

class BaseDrawingStrategy
{
  constructor(mode) { this.mode = mode; }

  // protected virtual
  mouseup(pos,e) {}
  mousedown(pos,e) {}
  mousemove(pos,e) {}
  wheel(pos,e) {}

  // touch not supported
}

export default BaseDrawingStrategy;