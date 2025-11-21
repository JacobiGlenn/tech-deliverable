// Display a single quote card
function QuoteCard({ quote }) {
    return (
        <div className="quote">
            <p className="quote-name">{quote.name}</p>
            <p className="quote-message">"{quote.message}"</p>
            <p className="quote-timestamp">
                {new Date(quote.time).toLocaleDateString('en-US', {
                    year: 'numeric', //Broken?
                    month: 'long', //Broken?
                    day: 'numeric', //Broken?
                    hour: '2-digit', //Broken?
                    minute: '2-digit' //Broken?
                })}
            </p>
        </div>
    );
}

export default QuoteCard;