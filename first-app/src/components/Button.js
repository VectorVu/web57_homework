import React from "react";

class Button extends React.Component {
    render() {
        const { primary, label, backgroundColor, size } = this.props;
        const styles = {};
        if (primary === true) {
            styles.color = "white"
            styles.fontWeight = "bold"
        }
        styles.backgroundColor = backgroundColor ? backgroundColor : "#33CCFF"
        if (size === "small" || "") {
            styles.width = 70
            styles.height = 32
            styles.borderRadius = 15
        }
        else if (size === "medium") {
            styles.width = 85
            styles.height = 36
            styles.borderRadius = 18
        }
        else if (size === "large") {
            styles.width = 100
            styles.height = 40
            styles.borderRadius = 20
        }
        styles.textAlign = "center";
        styles.margin = 10;
        styles.cursor = "pointer";
        styles.border = "none";
        return (
            <button style={styles}>
                {label || "Button"}
            </button>
        )
    }
}

export default Button;