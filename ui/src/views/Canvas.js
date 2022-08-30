import '../css/canvas.scss';
import React, { useState, useEffect } from 'react';

import WB, { canvas } from '../controllers/WhiteBoard';

const Canvas = (props) => {
  const ref_base = React.useRef();
  const ref_prvw = React.useRef();

  React.useEffect(() => {                             
    WB.setCanvas(ref_base.current, ref_prvw.current);
  });

  return <>
    <canvas id="canvas-base" ref={ref_base} />
    <canvas id="canvas-preview" ref={ref_prvw}
      onMouseDown={WB.MouseHandle}
      onMouseUp  ={WB.MouseHandle}
      onMouseMove={WB.MouseHandle}
      onWheel    ={WB.MouseHandle}
    />
  </>;

}

export default Canvas;
