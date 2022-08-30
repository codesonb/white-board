
import StrategyFactory from '../strategies/StrategyFactory';
import CommandFactory from '../commands/CommandFactory';

import Remote from './Remote';

let bv, bx, pv, px;

const resize = (e) => {
  if (!bv) return;

  // copy graph data
  let g  = bx.getImageData(0,0,bv.width,bv.height);
  let ow = bv.width;
  let oh = bv.height;

  // resize
  [pv, bv].forEach(v => {
    v.width  = window.innerWidth;
    v.height = window.innerHeight;
  });
  [px, bx].forEach(x => {
    x.resetTransform();
    x.translate(bv.width/2, bv.height/2);
  });

  // recover graph data
  if (g) {
    let dx = (window.innerWidth  - ow) / 2;
    let dy = (window.innerHeight - oh) / 2;
    bx.putImageData(g, dx, dy);
  }

}

window.addEventListener('resize', resize);

class WhiteBoard
{
  constructor()
  {
    this.style = {
      strokeSize: 1,
      fillStyle: 'black'
    };

    window.setTimeout(() => { // await for Factory class be loaded
      Remote.subscribe({
        message: raw => {
          let cmd = CommandFactory.create(raw);
          this.draw(cmd);
        },
      });
    }, 0);
      
  }

  get ctxB() { return bx; } // base canvas context
  get ctxP() { return px; } // preview canvas context

  setCanvas(canvas, preview)
  {
    window.pv = pv = preview;
    window.cv = bv = canvas;
    window.px = px = preview.getContext('2d');
    window.cx = bx = canvas.getContext('2d');
    resize();
  }
  getImage()
  {
    return bx.canvas.toDataUrl('image/jpeg');
  }

  get mode() { return this.strategy.mode; }
  setMode(mode)
  {
    this.strategy = StrategyFactory.get(mode);
  }

  updateStyle(g, style)
  {
    style = style || this.style;
    g.fillStyle   = style.fillStyle || 'black';
    g.strokeStyle = style.fillStyle || 'black';
  }

  setFillColor(color)
  {
    this.style.fillStyle = color;
    this.updateStyle(px);
  }

  MouseHandle = (e) => {
    let cvs  = e.target;
    let rect = cvs.getBoundingClientRect();
    let pos  = { x: 0, y: 0 };
    
    pos.x = e.pageX - rect.width  / 2;
    pos.y = e.pageY - rect.height / 2;

    this.strategy[e.type](pos, e);
  }

  apply(command)
  {
    // clean-up preview drawings
    this.clearPreview();

    // apply command on base canvas
    this.draw(command);

    // send command to remote
    Remote.send(command);
  }
  draw(command)
  {
    this.updateStyle(bx, command.style);
    bx.save();
    command.draw(bx);
    bx.restore();
  }

  //----------------------------------------------------
  
  clearPreview()
  {
    let w = pv.width/2 + 1, h = pv.height/2 + 1;
    px.clearRect(-w,-h,pv.width+2,pv.width+2);
  }

}

const _instance = new WhiteBoard();
_instance.setMode('pen');
export default _instance;
