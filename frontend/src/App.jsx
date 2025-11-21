import { useState, useEffect } from "react";
import "./App.css";

function App() {
//store list of quotes
	const [quotes, setQuotes] = useState([]); 

	//Track if quotes are loading
	const [loading, setLoading] = useState(true);

	//Fetch quotes from backend API
	const fetchQuotes = async () => { 
		try { //attempts to fetch quotes
			const response = await fetch("api/quotes");
			const data = await response.json(); //parses response as JSON
			setQuotes(data); //updates quotes state
			setLoading(false);
		} catch (error) { //displays error if fetch fails
			console.error("Error fetching quotes:", error); //writes error in console
			setLoading(false);
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

			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<div className="messages">
				<p>Peter Anteater</p>
				<p>Zot Zot Zot!</p>
				<p>Every day</p>
			</div>
		</div>
	);
}

export default App;
