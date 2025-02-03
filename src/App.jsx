import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import CSS file

function App() {
  const [joke, setJoke] = useState("Click the button to get a joke!");
  const [speed, setSpeed] = useState(1); // Default playback speed is 1

  // Fetch a new joke
  const fetchJoke = async () => {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await response.json();
    setJoke(`${data.setup} - ${data.punchline}`);
  };

  // Speak the joke aloud with the selected speed
  const speakJoke = () => {
    const speech = new SpeechSynthesisUtterance(joke);
    speech.lang = "en-US";
    speech.rate = speed; // Set the playback speed based on the slider
    speechSynthesis.speak(speech);
  };

  // Copy joke to clipboard
  const copyJoke = () => {
    navigator.clipboard.writeText(joke);
    alert("Joke copied to clipboard! 📋");
  };

  // Handle slider value change
  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header mt-5 pt-5">
        <h1>🤣 Fun Joke Generator 🤣</h1>
      </header>

      {/* Main Content */}
      <div className="card p-4 shadow joke-card">
        <h3 className="mb-3">😂 Random Joke Generator 😂</h3>
        <p className="joke-text">{joke}</p>

        <div className="button-group">
        <button className="btn joke-btn" onClick={copyJoke}>
            📋 Copy
          </button>
           
          <button className="btn joke-btn" onClick={fetchJoke}>
            Get a Joke
          </button>
         <button className="btn joke-btn" onClick={speakJoke}>
            🎤 Speak
          </button>
        </div>

        {/* Playback Speed Slider */}
        <div className="speed-control mt-4">
          <label htmlFor="speedSlider" className="mr-2">Playback Speed:</label>
          <input
            id="speedSlider"
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={speed}
            onChange={handleSpeedChange}
            className="form-control-range slider-btn"
          />
          <span>{speed}x</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <h3>Made with ❤️ by Debasish</h3>
      </footer>
    </div>
  );
}

export default App;
