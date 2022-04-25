import React from "react";

class Dropdown extends React.Component {
    render() {
        const { options } = this.props;
        return (
            <div class="dropdown-container">
                <div class="dropdown">Dropdown</div>
                <div class="dropdown-content ">
                    {options.map(option => <a href="#">{option}</a>)}
                </div>
            </div>
        )
    }
}
export default Dropdown;