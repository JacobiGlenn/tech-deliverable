import { useState, useEffect } from "react";
import "./App.css";
import QuoteCard from "./Components/QuoteCard";
import QuoteForm from "./Components/QuoteForm";
import quote_logo from "./assets/quote_logo.png";

function App() {
	//Quote state management

	//store list of quotes
	const [quotes, setQuotes] = useState([]); 

	//Track if quotes are loading
	const [loading, setLoading] = useState(true);

	//Fetch quotes from backend API
	const fetchQuotes = async () => { 
    try {
        const response = await fetch("/api/quotes");
        const data = await response.json();
        
        // Sort quotes by time (newest first)
        const sortedQuotes = data.sort((a, b) => {
            return new Date(b.time) - new Date(a.time);
        });
        
		//limit to only 3 quotes
		const recentQuotes = sortedQuotes.slice(0, 3);

        setQuotes(recentQuotes);
        setLoading(false);
    } catch (error) {
        console.error("Error fetching quotes:", error);
        setLoading(false);
    }
};


	//Name state management
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	//Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); //prevents stupid ass page refresh
		
		//validates you did everything right
		if (!name.trim() || !message.trim()) {
			setError("Name and message needed")
			return;
		}

		setIsSubmitting(true); 
		setError(""); //clears prev errors

		try {
			//Reformats to be the same as backend calls
			const formData = new URLSearchParams();
			formData.append("name", name)
			formData.append("message", message);

			const response = await fetch("/api/quote", {
				method: 'POST', //no idea what this does
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: formData		
			});
			
			if (response.ok) {
				// Clear the form
				setName('');
				setMessage('');
			
				//refresh quotes list so new one is there
				await fetchQuotes();
			} 
			else {
				//Error testing
				const errorData = await response.json();
				setError(errorData.detail || "Error submitting quote");
			}
		} catch (err) {
			setError("Network error: " + err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	//Call fetchQuotes when component loads (initally)
	useEffect(() => { //runs once on component load (otherwise infinite loop)
		fetchQuotes(); 
	}, []);


	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}

			<h1>
				<img src={quote_logo} alt="Quote Book Logo" className="quote-logo" />
				
			<div>Hack at UCI Quote Book </div>
			</h1> 
			{/* ^little flair */}

			{/* Quote submission form */}
			<main>	
				<QuoteForm //uses QuoteForm component (this was autofill idk man)
					name={name}
					message={message}
					isSubmitting={isSubmitting}
					onNameChange={(e) => setName(e.target.value)}
					onMessageChange={(e) => setMessage(e.target.value)}
					onSubmit={handleSubmit}
				/>

				{/* Quotes section (and prev logic)*/}
				 <section className="quotes-section">
                    <h2>Previous Quotes ({quotes.length})</h2>
                    
                    <div className="messages">
                        {loading ? (
                            <div className="loading">Loading quotes...</div>
                        ) : quotes.length === 0 ? (
                            <div className="no-quotes">No quotes yet</div>
                        ) : (
                            quotes.map((quote, index) => (
                                <QuoteCard key={index} quote={quote} />
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
