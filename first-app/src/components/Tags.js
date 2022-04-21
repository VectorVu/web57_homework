import React from "react";

class TagBoxs extends React.Component {
    render() {
        const { tags } = this.props;
        return (
            <div className="Tag-box">
                {tags.map((tag, index) => <span key={index} className='Tag'>{tag}</span>)}
            </div>
        )
    }
}
export default TagBoxs;