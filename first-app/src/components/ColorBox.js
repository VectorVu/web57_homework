import React from "react";
import clsx from 'clsx';
const colors = [
  "cornflowerblue",
  "blueviolet",
  "indianred",
  "deeppink",
  "forestgreen"
]
function ColorBoxs(props) {
  const onHandleChangeColor = (newColor) => {
    props.onChangeBackgroundColor(newColor);
  }
  const { activeColor } = props;
  return (
    <div className="Color-box">
      {colors.map(color => {
        const clsName = clsx({
          'Color-item ': true,
          'active': activeColor === color
        });
        return (
          <span
            key={color}
            onClick={() => onHandleChangeColor(color)}
            style={{ background: color }}
            className={clsName}
          />
        )
      })}
    </div>
  )
}
export default ColorBoxs;