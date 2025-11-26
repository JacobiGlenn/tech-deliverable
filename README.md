# Jacobi Glenn's Hack at UCI Tech Organizer Deliverable

Application for Tech Team in the Hack @ UCI Club | RUN INSTRUCTIONS: I made this to run locally so you need to do "npm run dev" in a backend terminal and then "python main.py" in a frontend terminal. Once you do that opent the local host link. What I mean by backend and front end terminals is that you need to open 2 new terminals. For the first one type "cd frontend" to open my frontend folder, then type in "npm run dev" and a link should pop up with a name similar to "http://localhost:5173/". Once that is opened then you can move on to your next terminal where you will type in "cd api" to open our backend folder, then type in "python main.py" to run our main script (which calls every other script and dependencies. After that, releoad the local host page and the app will have full functionality. Please enjoy my application, thank you!

## Tasks Completed:

 # Retrieving Quotes
- ✅ Created GET `/quotes` API endpoint to obtain quotes from database
 
 # Displaying Quotes  
- ✅ API call to retrieve and display quotes
- ✅ Each quote shows name, message, and date
- ✅ Separate QuoteCard component for each quote listing

# Submitting Quotes
- ✅ Added styles to improve form appearance
- ✅ Modified submission to prevent page refreshing
- ✅ New quotes appear immediately with timestamp
 
# Style
- ✅ Included logo image above header
- X No changes to style (Still learning CSS...)


  # Backend
 -  ✅ GET /quotes - Returns all quotes (Max of 3, not based on time)
 -  ✅ POST /quote - Accepts form data, adds timestamp (formatted data)
 -  ✅ JSON database with proper error handling (pulled from api correctly)
 -  ✅ Clearly organized structure

   # Frontend
  - ✅ useState hooks for quotes, loading, form data 
  - ✅ useEffect for initial data fetching
  - ✅ Controlled components for form inputs
  - ✅ Async/await for API calls (fixed the page reloading bug)
  - 
<img width="718" height="314" alt="image" src="https://github.com/user-attachments/assets/2540779a-4e14-4b5b-b763-bbdd7295ca00" />
