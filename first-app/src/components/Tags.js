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
function TagBoxs(props) {
    const onHandleChangQuote = (selectedTag) => {
        props.onChangeQuoteTags(selectedTag);
    }
    const { activeTags } = props;
    console.log(activeTags);
    return (
        <div className="Tag-box">
            {tags.map((tag) => {
                const clsName = clsx({
                    'Tag': true,
                    'active': activeTags.includes(tag)
                }); return (
                    <span key={tag} className={clsName} onClick={()=> onHandleChangQuote(tag)}>{tag}</span>
                )
            })}
        </div>
    )
}
export default TagBoxs;