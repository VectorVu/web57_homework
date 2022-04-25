import React from "react";
import clsx from 'clsx';
const colors = [
  "cornflowerblue",
  "blueviolet",
  "indianred",
  "deeppink",
  "forestgreen"
]
class ColorBoxs extends React.Component {
  constructor(props) {
    super(props);
  }
  onHandleChangeColor = (newColor) => {
    this.props.onChangeBackgroundColor(newColor);
  }

  render() {
    const { activeColor } = this.props;

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
              onClick={() => this.onHandleChangeColor(color)}
              style={{ background: color }}
              className={clsName}
            />
          )
        })}
      </div>
    )
  }
}
export default ColorBoxs;