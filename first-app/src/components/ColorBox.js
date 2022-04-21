import React from "react";

class ColorBoxs extends React.Component {
    render() {
        const { colors } = this.props;
        return (
            <div className="Color-box">
                {colors.map((color, index) => <span key={index} className={`Color-item ${index === 0 ? 'active' : ''}`} style={{ background: color }}></span>)}
            </div>
        )
    }
}
export default ColorBoxs;