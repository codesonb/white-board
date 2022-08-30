
import API from '../services/api';
import WB from './WhiteBoard';

const ptc  = String(window.location.protocol).replace('http', 'ws');
const host = window.location.host;

class Remote
{
  constructor()
  {
    this.observer = [];
  }

  connect(roomData)
  {
    try
    {
      let ws = this.ws = new WebSocket(`${ptc}//${host}/ws/`);
      ws.addEventListener('open'   , this.open.bind(this));
      ws.addEventListener('close'  , this.close.bind(this));
      ws.addEventListener('message', this.message.bind(this));
      ws.addEventListener('error'  , this.error.bind(this));

      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({type:'JoinRoom', ...roomData}));
      }, {once: true});
    } catch (ex) {
      console.log('-----------');
      console.error(ex);
      console.log('-----------');
    }
  }

  join(roomId)
  {
    if (this.__connecting) return false;
    this.__connecting = true;
    this.connect({ roomId });
  }

  // controller adaptation
  subscribe(handler)
  {
    this.observer.push(handler);
  }

  // websocket base operations
  open(e)
  {
    this.observer.forEach(handler => handler.open?.(e));
  }
  close(e)
  {
    this.observer.forEach(handler => handler.close?.(e));
  }
  message(e)
  {
    let fn, cmd = JSON.parse(e.data);

    fn = cmd.type == 'InvokeEvent'
      ? handler => handler[cmd.event]?.(cmd.args)
      : handler => handler.message?.(cmd);

    this.observer.forEach(fn);
  }
  error(e)
  {
    console.error(e);
    this.observer.forEach(handler => handler.error?.(e));
  }

  send(command)
  {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return false;
    this.ws.send(
      JSON.stringify({ type: command.constructor.name, ...command })
    );
  }


}

// only one connection is allowed
const _instance = new Remote();
export default _instance;
