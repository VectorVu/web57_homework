import React from "react";
import axios from "axios";
function QuoteBox(props) {
    const [quoteBoxData, setQuoteBoxData] = React.useState({
        quote: null,
        status: 'idle'
    });
    const { activeColor , activeTags} = props;
    const { status, quote } = quoteBoxData;

    async function fetchQuote()  {
        try {
            setQuoteBoxData({ status: 'loading' });
            const res = await axios.get(`https://api.quotable.io/random?tags=${activeTags}`);
            setQuoteBoxData({
                status: 'success',
                quote: {
                    content: res.data.content,
                    author: res.data.author
                }
            })
        } catch (error) {
            setQuoteBoxData({ status: 'error' })
        }
    }
    const onRefreshQuote=()=>{
        fetchQuote();
    }
    React.useEffect(()=>{
        fetchQuote();
    },[activeTags]);

    const renderQuote = () => {
        const isIdle = status === 'idle';
        const isLoading = status === 'loading';
        const isError = status === 'error';
        const isSuccess = status === 'success';
        if (isIdle || isLoading) {
            return (
                <div className="loader" style={{ bordertop: props.activeColor }}></div>
            )
        }
        if (isError) {
            return (
                <div>Something went wrong</div>
            )
        }
        if (isSuccess) {
            return (
                <>
                    <div className='Quote-content'>{quote.content}</div>
                    <div className="Quote-author">- {quote.author}</div>
                </>
            )
        }
        return null;
    }
    return (
        <div className='Quote-box' style={{ color: activeColor }}>
            <div className="Quote-action" >
                {renderQuote()}
                <button className="Quote-new-btn" style={{ background: activeColor }} onClick={onRefreshQuote}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                        <polyline points="1 4 1 10 7 10"></polyline>
                        <polyline points="23 20 23 14 17 14"></polyline>
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                    </svg>
                    New Quote
                </button>
            </div>
        </div>
    )
}


export default QuoteBox;