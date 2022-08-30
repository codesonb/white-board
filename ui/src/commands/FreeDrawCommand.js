
class FreeDrawCommand
{
  constructor(initStyle, initPos)
  {
    this.style = {...initStyle};
    this.path  = [initPos];
  }

  push(pos) { this.path.push(pos); }

  draw(g)
  {
    let p = this.path;
    g.beginPath();
    g.moveTo(p[0].x, p[0].y);
    for (let i = 1; i < this.path.length; i++)
      g.lineTo(p[i].x, p[i].y);
    g.stroke();
  }

}

export default FreeDrawCommand;