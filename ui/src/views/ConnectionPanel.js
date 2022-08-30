
import { useState, useEffect } from 'react';
import API from '../services/api';
import Remote from '../controllers/Remote';

const ENUM_CONN_STATE = Object.freeze({
  NOT_CONNECTED: 0,
  CONNECTING: 1,
  CONNECTED: 2,
  ROOM_JOINT: 3,
  DISCONNECTED: 9,
});

const ConnectionPanel = () =>
{
  const [connState, setConnState] = useState(ENUM_CONN_STATE.NOT_CONNECTED);
  const [room, setRoom] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    // register romote status change
    Remote.subscribe({
      open: (e) => { setConnState(ENUM_CONN_STATE.CONNECTED) },
      close: (e) => { setConnState(ENUM_CONN_STATE.DISCONNECTED) },
      joint: (room) => {
        setRoom(room);
        window.history.pushState(null, null, '/'+room.linkId);
      },
    });
  }, []);

  const isConnAllowed = () =>
  {
    return connState != ENUM_CONN_STATE.NOT_CONNECTED
        && connState != ENUM_CONN_STATE.DISCONNECTED;
  }

  const showModal = (room) =>
  {
    setModal(
      <div className="modal">
        <h3>Invite your friend with this link</h3>
        <input readOnly value={`${window.location.origin}/${room.id}`} />
        <button className="btn-close" onClick={e=>setModal(null)}>Close</button>
      </div>
    );
  }

  const connect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setConnState(ENUM_CONN_STATE.CONNECTING);
    Remote.connect({name: e.target.name.value, password: e.target.pswd.value||null});
  }

  const renderContent = () =>
  {
    switch (connState)
    {
      case ENUM_CONN_STATE.NOT_CONNECTED:
      case ENUM_CONN_STATE.DISCONNECTED:
        let txt_status = (connState == ENUM_CONN_STATE.NOT_CONNECTED
            ? 'Not Connected'
            : 'Disconnected'
          );
        return(<>
          <div className="cnn-status">
            <span className="cnn-status-light red"></span>
            <span>{ txt_status }</span>
          </div>
          <form onSubmit={connect}>
            <div><input name="name" placeholder="your room name"/></div>
            <div><input name="pswd" placeholder="password"/></div>
            <button disabled={isConnAllowed()}>Create Room</button>
          </form>
        </>);
      case ENUM_CONN_STATE.CONNECTING:
        return(<>
          <div className="cnn-status">
            <span className="cnn-status-light yellow"></span>
            <span>Connecting...</span>
          </div>
        </>);
      case ENUM_CONN_STATE.CONNECTED:
        return(<>
          <div className="cnn-status">
            <span className="cnn-status-light green"></span>
            <span>Connected</span>
          </div>
          { !room
            ?<div>
              <span>Obtaining room information</span>
            </div>
            :<div>
              <span>{ room.name }</span>
            </div>
          }
        </>);
      default:
        throw 'Error';
    }




  }


  return <div className="cnn-panel">
    { renderContent() }
    { modal }
  </div>

}

export default ConnectionPanel;