import './App.css';
import {useEffect, useRef, useState} from 'react'
function App() {
  const gameDuration = 10;
  const [state, setState] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(gameDuration)
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const textRef = useRef('null')

  function startGame(){
    setState(true)
    setTimeRemaining(gameDuration)
    setText('')
    setWordCount(0)
    textRef.current.disabled = false
    textRef.current.focus()
  }

  function handleChange(e){
    const {value} = e.target
    setText(value)
    console.log(text)
  }

  function calculateWordCount(text){
    const wordsArr = text.trim().split(" ")
    return wordsArr.filter(word => word !== "").length
  }

  useEffect(() => {
    if(state && timeRemaining > 0){
        setTimeout(() => {
          setTimeRemaining(time => time - 1)
        }, 1000)
    } else if(timeRemaining === 0) {
        setState(false)
        setWordCount(calculateWordCount(text))
    }
  }, [timeRemaining, state])


  return (
    <div className="app">
      <h1 className="header">
        Speed Typing Game
      </h1>
      <textarea disabled={!state} ref={textRef} value={text} onChange={handleChange}>
      </textarea>
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame}>START</button>
      <h2>Word Count: {wordCount}</h2>
    </div>
  );
}

export default App;
