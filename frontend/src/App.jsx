import { useState, useEffect } from "react";
import "./App.css";

function App() {

	//Quote state management

	//store list of quotes
	const [quotes, setQuotes] = useState([]); 

	//Track if quotes are loading
	const [loading, setLoading] = useState(true);

	//Fetch quotes from backend API
	const fetchQuotes = async () => { 
		try { //attempts to fetch quotes
			const response = await fetch("/api/quotes");
			const data = await response.json(); //parses response as JSON
			setQuotes(data); //updates quotes state
			setLoading(false);
		} catch (error) { //displays error if fetch fails
			console.error("Error fetching quotes:", error); //writes error in console
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
			<h1>Hack at UCI Tech Deliverable</h1>
			
			<h2>Write your quote here</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">   Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
			</form>

			{/* Old way of displaying quotes before API integration
			 <h2>Previous Quotes</h2>
			<div className="messages">
				<p>Peter Anteater</p>
				<p>Zot Zot Zot!</p>
				<p>Every day</p>
			</div>
			*/}

			<h2>Previous Quotes</h2>
			<div className="messages">
				{loading ? ( //if loading is true, display loading message
					<p>Loading quotes...</p>
				) : quotes.length === 0 ? ( //if no quotes, display no quotes message
					<p>No quotes available.</p>
				) : ( //else, display list of quotes
					quotes.map((quote, index) => ( //basically a for loop
						<div key={index} className="quote"> 
							<p ClassName="quote-name">{quote.name}</p>
							<p ClassName="quote-message">{quote.message}</p>
							<p ClassName="quote-timestamp">{new Date(quote.timestamp).toLocaleString()}</p>
						</div>
					))
				)}
			</div>


		</div> 
	);
}

export default App;
