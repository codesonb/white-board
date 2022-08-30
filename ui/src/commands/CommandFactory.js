
import FreeDrawCommand from "./FreeDrawCommand";
import DrawRectangleCommand from "./DrawRectangleCommand";
import DrawEllipseCommand from "./DrawEllipseCommand";

const dict = {
  FreeDrawCommand,
  DrawRectangleCommand,
  DrawEllipseCommand,
}

class CommandFactory
{
  create(data)
  {
    try
    {
      let cmd = new dict[data.type]();
      Object.assign(cmd, data);
      return cmd;
    } catch(ex) {
      console.error(ex);
    }
  }

}

const _instance = new CommandFactory();
export default _instance;
