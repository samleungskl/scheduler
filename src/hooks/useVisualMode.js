import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  //console.log('<-----start run----->')
  //console.log('mode : ', mode)
  function transition(newMode, replace = false) {
    
    if (replace) { // if replace is true
      const newHistory = [...history]
      //console.log('newHistory', newHistory)
      newHistory.pop()
      setMode(newMode)
      setHistory([...newHistory, newMode])
      console.log('History1', history)
    } else { // if replace is false   
      setMode(newMode)
      setHistory([...history, newMode])
      console.log('History2', history)
    }
  }

  function back() {
    const newHistory = [...history]
    if (newHistory.length > 1) {
      newHistory.pop()
    }
    setMode(newHistory.slice(-1)[0])
    setHistory(newHistory)
    console.log('History3', history)
  }

  //console.log('OutsideHistory ', history)
  //console.log('<-----end run----->')
  return { mode, transition, back, history };
}



