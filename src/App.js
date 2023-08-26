import { useEffect, useState } from "react";
import "./App.css";
import MoviesDropDown from "./components/MoviesDropDown";

function App() {
  const handleInstallClick = () => {
    const promptEvent = window.deferredPrompt;

    if (promptEvent) {
      promptEvent.prompt();

      promptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
      });

      window.deferredPrompt = null;
    }
  };

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
  });

  return (
    <div className="App">
      <button className="border p-2" onClick={handleInstallClick}>
        Download App
      </button>
      <MoviesDropDown />
    </div>
  );
}

export default App;
