import React from "react";
import "./Button.css";
class Button extends React.Component {
    render() {
        const { primary, label, backgroundColor, size } = this.props;
        const styles = {};
        if (primary === true) {
            styles.color = "white"
            styles.fontWeight = "bold"
        }
        styles.backgroundColor = backgroundColor ? backgroundColor : "#33CCFF";
        return (
            <button className={"myButton" +' '+size} style={styles}>
                {label || "Button"}
            </button>
        )
    }
}

export default Button;