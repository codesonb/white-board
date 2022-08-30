import '../css/hud.scss';
import { useState, useEffect } from 'react';

import WB from '../controllers/WhiteBoard';
import ConnectionPanel from './ConnectionPanel';
import ColorPicker from './ColorPicker';

const Button = ({mode, icon, onClick, ...props}) => {

  let className = `button ${mode==WB.strategy.mode?'selected':''}`;

  return (
    <div className={className} onClick={e=>onClick(mode, e)}>
      <div className="material-icons">{ icon }</div>
      { props.children }
    </div>
  );
}


const Hud = (props) => {

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [_b, forceUpdate] = useState('pen');

  const toggleColorPicker = () => setShowColorPicker(!showColorPicker);

  const setMode = (mode) => {
    WB.setMode(mode);
    forceUpdate(!_b);
  }

  const stopPropagation = e => e.stopPropagation();

  return (
    <div className="hud"
      onMouseDown={stopPropagation}
      onMouseUp={stopPropagation}
      onMouseMove={stopPropagation}
      onWheel={stopPropagation}
      onClick={stopPropagation}
      onDoubleClick={stopPropagation}
      onKeyDown={stopPropagation}
      onKeyUp={stopPropagation}
    >
      <Button onClick={ toggleColorPicker } icon="palette">
        {showColorPicker && <ColorPicker value={WB.fillStyle} onChange={c=>WB.setFillColor(c)}/> }
      </Button>
      <Button onClick={setMode} mode="pen" icon="edit" />
      <Button onClick={setMode} mode="rect" icon="rectangle" />
      <Button onClick={setMode} mode="ellipse" icon="circle" />
      <ConnectionPanel />
    </div>
  );
}

export default Hud;