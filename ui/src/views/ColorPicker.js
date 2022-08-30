
import { useState, useEffect } from 'react';

const ColorPicker = ({value, onChange, ...props}) =>
{
  const CPButton = ({value}) => {
    return <div className="cp-btn" style={{backgroundColor: value}} onClick={e=>onChange(value)}></div>
  }

  return (
    <div className="color-picker">
      <CPButton value="black" />
      <CPButton value="white" />
      <CPButton value="grey" />
      <CPButton value="silver" />
      <CPButton value="red" />
      <CPButton value="orange" />
      <CPButton value="yellow" />
      <CPButton value="green" />
      <CPButton value="lawngreen" />
      <CPButton value="cyan" />
      <CPButton value="blue" />
      <CPButton value="purple" />
      <CPButton value="#FF00FF" />
      <CPButton value="brown" />
    </div>
  );
}

export default ColorPicker;
