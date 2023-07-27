import "./App.css";
import { Routes, Route, BrowserRouter as Router, } from "react-router-dom";
// import { useHistory } from 'react-router-dom'

import React, {useEffect, useState} from "react";

const Placeholder = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users').then( async (user) => {
            const usersReturned = await user.json();
            setUsers(Object.values(usersReturned)[0])
        })
    }, []);

    return <div>{users.join(',')}</div>
};


const Placeholder2 = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      fetch('/api/users').then( async (user) => {
          const usersReturned = await user.json();
          setUsers(["hello","world"])
      })
  }, []);

  return <div>{users.join(',')}</div>
};



////////////////////////////////


const TakeTestButton = () => {
  //const history = useHistory();

  const onClick =  () => {
    console.log('changing route!');
    //history.push(`/test`);

  }

  return (
    <button onClick={onClick}> Take Test </button>
  )
}




const AddCardButton = () => {

  const onClick = async () => {
    console.log("clicked");
    const term = prompt("Term?");
    const definition = prompt("Definition?");

    const response = await fetch('/api/flashcards', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({term, definition}), // body data type must match "Content-Type" header
    });

    console.log(`${term} ${definition}`);
    return;
  }

  return (
    <button onClick={onClick}> Add a card </button>
  )

};

const MyFlashCard = ({term, definition}) => {

  return <div style={{ backgroundColor: 'red' }}>
    <h3>{"Term"} {term}</h3>
    <h4>{"Definition"} {definition} </h4>
  </div>
};

const MyFlashCards = () => {
  const [cardData, setCardData] = useState([]);
  // const flashcards = [{"id": 1, "term": "aaa", "definition": "bbb"}, {"id": 2, "term": "ccc", "definition": "ddd"}]

  
  useEffect(() => {
      fetch('/api/flashcards').then( async (cardData) => {
          const dataReturned = await cardData.json();
          setCardData(dataReturned)
      })
  }, []);
  
  const finalCards = cardData.map((card) => {
    return <MyFlashCard term={card.term} definition={card.definition}/>
  })

  return <div>
    <div><TakeTestButton/></div>
    <div><AddCardButton/></div>
    {finalCards}
    </div>
};



const TestScreen = () => {
  const [cardData, setCardData] = useState([]);
  const [numcorrect, setCorrect] = useState(null);


  useEffect(() => {
    fetch('/api/flashcards').then( async (cardData) => {
        const dataReturned = await cardData.json();
        setCardData(dataReturned)
    })
  }, []);

  const onClick = () => {
    console.log("starting");
    let correct = 0;

    for (let i = 0; i < cardData.length; i++) {
      const card = cardData[i];
      const userDef = prompt(`Term: ${card.term}. What is definition?`);
      if (userDef == card.definition){
        correct = correct + 1;
      }
    }

    setCorrect(correct);

  }


  return <div style={{ backgroundColor: 'grey' }}>
    <h3>{"Test below"} </h3>
    <button onClick={onClick}> Start </button>
    <p>{`Correct: ${numcorrect}`} </p>

  </div>
};





function App() {


  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/test" element={<TestScreen/>} />
              <Route path="/flashcards" element={<MyFlashCards/>} />


          </Routes>
      </Router>
    </div>
  );
}

export default App;
