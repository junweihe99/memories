# memories
Memories will be a full-stack social media application developed using the MERN stack.

<h4>Features</h4>
  <ul>
    <li>Authentication
    <li>Pagination
    <li>Individual Post Details
    <li>Recommended Posts
    <li>Comments
  </ul>

<h4>Lessons Learned</h4>
  <ul> Client
    <li>Folder structure for cleaner and more scalable application
    <li>React material-ui/core elements
    <li>Using Axios to make API calls
    <li>Redux createStore() for using global state/variables (Could use Context API as well)
    <li>Reducers: Function that accepts the state, action and executes based off of action.type (usually by switch statement); state must have an initial value
    <li>Action Creators: Functions that return actions; actions are objects with "type" property and a payload
    <li>SVGBackgrounds
    <li>useSelector Hook: Get the state from redux store
    <li>useEffect Hook: Tell component to do something after item in dependency array changes
    <li>New Function: API -> Actions -> Reducers (Also handle backend logic)
    <li>Material UI responsive properties (xs, sm etc.. & theme.breakpoints in css)
    <li>Reduce errors and make application more scalable by creating constants for action types
    <li>React-Router-DOM to make application multi-page (BrowserRouter, Switch, Route)
    <li>Google Login Authentication using Google Cloud developers Client ID
    <li>Optional Chaining Operator (?.)
    <li>Local Storage to save login session
    <li>Pagination feature with material-ui/lab
    <li>'i' flag to ignore case (Ex: Test = test = TEST)
  </ul>
  
  <ul> Server
    <li>import syntax by using "type": "module" in package.json
    <li>Folder structure for cleaner and more scalable application
    <li>New Function: Routes -> Controller (Also handle frontend logic)
    <li>.env file to save environmental variables securely (API keys, database connections etc...)
    <li>Bcrypt for securely storing passwords
    <li>JWT for storing login session
  </ul>
  
<h4>Problems Encountered</h4>
  <ul>
    <li>npm start error: problem with dependency tree -> fixed via SKIP_PREFLIGHT_CHECK=true in .env file
    <li>Google Authentication Error: 'popup_closed_by_user' -> tried allowing pop-ups and clearing cache (still doesn't work)
    <li>Server deployment on Heroku Error: File builds but still shows an error (still doesn't work)
  </ul>

<h4>Improvements to Add</h4>
  <ul>
    <li>Empty search results in no posts screen -> Added styling for screen with no search matches
    <li>Fix Google Authentication function (WIP)
  </ul>

<h4>Credits</h4>
  <ul>
    <li><a href="https://www.youtube.com/watch?v=VsUzmlZfYNg&t=828s">YouTube</a>
  </ul>
