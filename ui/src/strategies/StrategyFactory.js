
import PenStrategy from './PenStrategy';
import RectangleStrategy from './RectangleStrategy';
import EllipseStrategy from './EllipseStrategy';

const dict_strategy = Object.freeze({
  'pen':    new PenStrategy(),
  'rect':   new RectangleStrategy(),
  'ellipse': new EllipseStrategy(),
});

class StrategyFactory
{
  get(mode)
  {
    let s = dict_strategy[mode];
    if (!s) throw new Error('Invalide mode selected: '+mode);
    return s;
  }
}

const _instance = new StrategyFactory();
export default _instance;
