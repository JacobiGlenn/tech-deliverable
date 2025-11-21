// Display a single quote card
function QuoteCard({ quote }) {
    return (
        <div className="quote">
            <p className="quote-name">{quote.name}</p>
            <p className="quote-message">"{quote.message}"</p>
            <p className="quote-timestamp">
                {new Date(quote.time).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </p>
        </div>
    );
}

export default QuoteCard;