import './App.css';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import ParkPanel from './ParkPanel';
import FirebaseApp from './FirebaseApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body>
        <FirebaseApp>
          <ParkPanel />
          </FirebaseApp>
      </body>
    </div>
  );
}

export default App;
