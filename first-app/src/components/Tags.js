import React from "react";
import clsx from 'clsx';
const tags = [
    'business',
    'education',
    'faith',
    'famous-quotes',
    'friendship',
    'future',
    'happiness',
    'history',
    'inspirational',
    'life',
    'literature',
    'love',
    'nature',
    'politics',
    'proverb',
    'religion',
    'science',
    'success',
    'technology',
    'wisdom'
];
class TagBoxs extends React.Component {
    constructor(props) {
        super(props);
    }

    onHandleChangQuote = async (selectedTag) => {
        await this.props.onChangeQuoteTags(selectedTag);
        this.props.fetchQuote();
    }

    render() {
        const { activeTags } = this.props;

        return (
            <div className="Tag-box">
                {tags.map((tag) => {
                    const clsName = clsx({
                        'Tag': true,
                        'active': activeTags.includes(tag)
                    }); return (
                        <span key={tag} className={clsName} onClick={() => this.onHandleChangQuote(tag)}>{tag}</span>
                    )
                })}
            </div>
        )
    }
}
export default TagBoxs;