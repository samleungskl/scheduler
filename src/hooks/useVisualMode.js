import { useState } from "react";

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  //history is to track previous modes
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    if (replace) { // if replace is true
      const newHistory = [...history];
      newHistory.pop();
      setMode(newMode);
      setHistory([...newHistory, newMode]);
    } else { // if replace is false
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  }

  function back() {
    const newHistory = [...history];
    //make sure user can only go back to the inital mode
    if (newHistory.length > 1) {
      newHistory.pop();
    };

    setMode(newHistory.slice(-1)[0]);
    setHistory(newHistory);
  }

  return { mode, transition, back, history };
}



