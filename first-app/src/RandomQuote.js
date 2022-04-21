import './RandomQuote.css';
import ColorBoxs from './components/ColorBox';
import TagBoxs from './components/Tags';
function Quote() {
    return (
        <div className='Quote'>
            <div className='Header'>Random Quote Machine</div>
            <div className='Quote-box' >
                <div className='Quote-content'>Every time you feel depressed, helpless. Think you are useless, then don't forget that at least you created a bug that helps the testers complete the task and gives your team more work to do.</div>
                <div className="Quote-author">- Anonymous</div>
                <div className="Quote-action">
                    <button className="Quote-new-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                            <polyline points="1 4 1 10 7 10"></polyline>
                            <polyline points="23 20 23 14 17 14"></polyline>
                            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                        </svg>
                        New Quote
                    </button>
                </div>
            </div>
            <ColorBoxs colors={['cornflowerblue', 'blueviolet', 'indianred', 'deeppink', 'forestgreen']} />
            <TagBoxs tags={[
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
            ]} />
        </div>
    )
}

export default Quote;