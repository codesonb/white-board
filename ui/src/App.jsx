import './App.css';

import Remote from './controllers/Remote';

import Hud from './views/Hud';
import Canvas from './views/Canvas';
import { useEffect } from 'react';

const App = (props) => {

  let roomKey = window.location.pathname.slice(1);
  if (roomKey.length != 0 && roomKey.length != 16) {
    window.location.href = '/';
  }

  useEffect(() => {
    if (roomKey) { Remote.join(roomKey); }
  }, []);

  return (
    <div id="app">
      <Canvas />
      <Hud />
      <span className="version">v1.00-{process.env.NODE_ENV}</span>
    </div>
  );
}

export default App;
