import { useState } from "react";

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  //history is to track previous modes
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {

    setMode(newMode)
    if (replace) {
      // remove last element of array and insert new Mode to history
      setHistory(prev => ([...prev.slice(0, -1), newMode]));
    } else {
      //insert new Mode to history
      setHistory(prev => ([...prev, newMode]));
    }
  };

  function back() {
    if (history.length > 1) {
      // go back 1 previous mode
      setMode((history.slice(0, -1)).slice(-1)[0]);
      setHistory(history.slice(0, -1));
    }
  };

  return { mode, transition, back, history };
}

