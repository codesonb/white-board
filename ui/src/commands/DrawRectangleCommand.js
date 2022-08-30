
class DrawRectangleCommand
{
  constructor(initStyle)
  {
    this.style = {...initStyle};
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
  }

  draw(g)
  {
    g.beginPath();
    g.rect(this.x, this.y, this.w, this.h);
    g.stroke();
  }
}

export default DrawRectangleCommand;