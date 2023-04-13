import "./App.css";
import { Routes, Route, BrowserRouter as Router, } from "react-router-dom";
import React, {useEffect, useState} from "react";


const Test = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [incorrectAttempts, setIncorrectAttempts] = useState([]);
  const [hasFinishedTest, setHasFinishedTest] = useState(false);
  // state for attempts

  useEffect(() => {
    fetch('/api/flashcards').then(async (cards) => {
      const returnedCards = await cards.json();      
      setFlashcards(returnedCards);      
    });

  }, []);

  const handleAttempt = () => {
    if (userInput !== flashcards[currentCard]) {
      setIncorrectAttempts(attempts => [...attempts, currentCard])
    }
    if (currentCard < flashcards.length -1 ) {
      setCurrentCard(current => current + 1);
    }

    if (currentCard === flashcards.length - 1) {
      setHasFinishedTest(true);
    }
  }

  return <>{flashcards.length ? <div>
    <span>Definition: {flashcards[currentCard].definition}</span>
    <span>
    Term:
    <input onChange={(e) => setUserInput(e.target.value.trim())}/>
    </span>
    <button onClick={handleAttempt}>Attempt</button>


    {hasFinishedTest ? <>
    <span>incorrect: </span>
      {incorrectAttempts.map((attemptCardIdx, idx) => {
        return <div key={idx}>
          <span>Term: {flashcards[attemptCardIdx].term}</span>
          <span>Definition: {flashcards[attemptCardIdx].definition}</span>
        </div>
      })}
    </> :null}
  </div>: null}</>
}
const FlashCardList = ({flashcards}) => {
  return <>
  {flashcards.map(({term, definition}, idx) => {
    return <div>
      Term: {term}{' '}
      Definition: {definition}
    </div>
  })}
  </>
}

const FlashCards = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetch('/api/flashcards').then(async (cards) => {
      const returnedCards = await cards.json();
      console.log(returnedCards);
      setFlashcards(returnedCards);
    })

  }, []);

  return <>
    <FlashCardList flashcards={flashcards} />
    <FlashCardInputs />
  </>
}

const FlashCardInputs = () => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSubmit = () => {
    // make a POST request to API to add flashcard
    console.log('attempt to add flashcard')
    fetch('/api/flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        term: term,
        definition: definition
      })
    });
  }

  return <div>
    <span>
    Term:
    <input onChange={(e) => {
      setTerm(e.target.value.trim());
    }}/>
    </span>
    <span>
    Definition
    <input onChange={(e) => {
      setDefinition(e.target.value.trim());
    }}/>
    </span>
    <button onClick={handleSubmit}>Add new flashcard</button>
  </div>
}

function App() {


  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/flashcards" element={<FlashCards/>} />
              <Route path="/test" element={<Test/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
