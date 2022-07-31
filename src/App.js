
import './App.css';
import CreateEditJHA from './views/CreateEditJHA';

function App() {
  return (
    <div className="app">
      <header className="app-header">
          <h1>JHA Central</h1>
          <p>Your portal for viewing, creating, and managing Job Hazard Analyses (JHA).</p>
      </header>
      <CreateEditJHA></CreateEditJHA>
    </div>
  );
}

export default App;
