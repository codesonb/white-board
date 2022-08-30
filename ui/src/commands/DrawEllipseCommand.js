
class DrawEllipseCommand
{
  constructor(initStyle)
  {
    this.style = {...initStyle};
    this.ox = 0;
    this.oy = 0;
    this.rx = 0;
    this.ry = 0;
  }

  draw(g)
  {
    g.beginPath();
    g.ellipse(this.ox, this.oy, this.rx, this.ry, 0, 0, 2*Math.PI);
    g.stroke();
  }
}

export default DrawEllipseCommand;