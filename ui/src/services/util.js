
class Utility
{
  toJson(obj)
  {
    return JSON.stringify(obj, (key,value) => {
      return value;
    });
  }

  hasValue(v)
  {
    if ('undefined' === typeof v) return false;
    if (null == v) return false;
    return true;
  }

}

const Util = new Utility();
export default Util;
