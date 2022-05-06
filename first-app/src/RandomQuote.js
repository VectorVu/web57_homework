import './RandomQuote.css';
import ColorBoxs from './components/ColorBox';
import TagBoxs from './components/Tags';
import QuoteBox from './components/QuoteBox';
import React from 'react';

class Quote extends React.Component {
    constructor(props){
        super(props);
        this.state={
            activeColor: 'cornflowerblue',
            activeTags: [],
        }
    }
    onChangeBackgroundColor = (newColor) => {
        this.setState({ activeColor: newColor })
    }
    onChangeQuoteTags = (selectedTag) => {
        const { activeTags } = this.state;
        const isActiveTag = activeTags.includes(selectedTag)
        if (isActiveTag) {
            this.setState({
                activeTags: activeTags.filter(tag => tag !== selectedTag)
            });
        }
        else {
            console.log("chạy vào else");
            this.setState({
                activeTags: [...activeTags, selectedTag]
            });
        }
    }
    render(){
    const { activeColor, activeTags } = this.state;
    return (
        <div className='Quote' style={{ background: activeColor }}>
            <div className='Header'>Random Quote Machine</div>
            <QuoteBox
                activeColor={activeColor}
                activeTags={activeTags}
            />
            <ColorBoxs
                onChangeBackgroundColor={this.onChangeBackgroundColor}
                activeColor={activeColor}
            />
            <TagBoxs
                onChangeQuoteTags={this.onChangeQuoteTags}
                activeTags={activeTags}
            />
        </div>
    )
}
}

export default Quote;