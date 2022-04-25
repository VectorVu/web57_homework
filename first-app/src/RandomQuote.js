import './RandomQuote.css';
import ColorBoxs from './components/ColorBox';
import TagBoxs from './components/Tags';
import QuoteBox from './components/QuoteBox';
import React from 'react';
import axios from "axios";

class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeColor: 'cornflowerblue',
            activeTags: [],
            quote: null,
            status: 'idle'
        }
    }
    onChangeBackgroundColor = (newColor) => {
        this.setState({ activeColor: newColor })
    }
    onChangeQuoteTags = (selectedTag) => {
        const { activeTags } = this.state;

        if (activeTags.includes(selectedTag)) {
            this.setState({
                activeTags: activeTags.filter(tag => tag !== selectedTag)
            });
        }
        else {
            this.setState({
                activeTags: [...activeTags, selectedTag]
            });
        }
    }
    fetchQuote = async () => {
        try {
            const { activeTags } = this.state;
            this.setState({ status: 'loading' });
            const res = await axios.get(`https://api.quotable.io/random?tags=${activeTags}`);
            console.log(res.data.tags);
            this.setState({
                status: 'success',
                quote: {
                    content: res.data.content,
                    author: res.data.author
                }
            })
        } catch (error) {
            this.setState({ status: 'error' })
        }
    }

    render() {
        const { activeColor, activeTags, status, quote } = this.state;
        return (
            <div className='Quote' style={{ background: activeColor }}>
                <div className='Header'>Random Quote Machine</div>
                <QuoteBox
                    activeColor={activeColor}
                    activeTags={activeTags}
                    fetchQuote={this.fetchQuote}
                    status={status}
                    quote={quote}
                />
                <ColorBoxs
                    onChangeBackgroundColor={this.onChangeBackgroundColor}
                    activeColor={activeColor}
                />
                <TagBoxs
                    onChangeQuoteTags={this.onChangeQuoteTags}
                    activeTags={activeTags}
                    fetchQuote={this.fetchQuote}
                />
            </div>
        )
    }
}

export default Quote;