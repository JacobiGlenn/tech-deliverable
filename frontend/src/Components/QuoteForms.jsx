function QuoteForm({ 
    name, 
    message, 
    isSubmitting, 
    onNameChange, 
    onMessageChange, 
    onSubmit 
}) {
    return (
        <section className="quote-form-section">
            <h2>Submit a Quote</h2>
            <form onSubmit={onSubmit} className="quote-form">
                <div className="form-group">
                    <label htmlFor="input-name">Name:</label>
                    <input
                        type="text"
                        id="input-name"
                        value={name}
                        onChange={onNameChange}
                        placeholder="Enter name"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="input-message">Quote:</label>
                    <input
                        type="text"
                        id="input-message"
                        value={message}
                        onChange={onMessageChange}
                        placeholder="Enter quote"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit quote'}
                </button>
            </form>
        </section>
    );
}

export default QuoteForm;