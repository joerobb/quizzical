import React from "react"
import Overlay from "./components/Overlay"
import Question from "./components/Question"
import {nanoid} from "nanoid"
export default function App() {

    const [gameCommenced, setGameCommenced] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [questions, setQuestions] = React.useState([])
    const [results, setResults] = React.useState(false)
    // Styles for Overlay, if game has gameCommenced, hide overlay
    const styles = {
        display: !gameCommenced ? "flex" : "none"
    }

    // onclick function for overlay button to begin game
    function toggle() {
        setGameCommenced(true)
    }
    
    /*   Currently, the order of the answers mean that the correct answer is always first - at index 0, so the following 
    function shuffles the answersArray */

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }

    // We then use the shuffle function to shuffle the answers we receive from the Trivia Data App, alongside setting the rest of the state

    React.useEffect(() => {
        if(!questions.length){
          fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
          .then(res => res.json())
          .then(data => {
            setQuestions(data.results.map(item => {
              return {
                question: item.question,
                answers: shuffle([item.correct_answer,...item.incorrect_answers]),
                correctAnswer: item.correct_answer,
                chosenAnswer:""
              }
            }))
          })
        }
        
      },[questions])

    // This function updates our selected answer to the answer that has been clicked

    function userSelection(question,answer){
        setQuestions(oldQuestions => oldQuestions.map(newQuestion => {
          return newQuestion.question === question ?
          {...newQuestion, chosenAnswer:answer}:newQuestion
        }))
      }

      //A function to firstly check that all questions have been answered and then to set results state and to tally score

      function checkAnswers() {
        const allAnswered = questions.every(question => question.chosenAnswer)
        
        if (allAnswered) {
            setResults(true)
            for (let i = 0; i < questions.length; i ++) {
                const item = questions[i]
                if (item.chosenAnswer === item.correctAnswer) {
                    setScore(prevScore => prevScore + 1)
                }
            }
        } else {
            alert('Please answer every question!')
        }

      }

      function playAgain() {
        setQuestions([])
        setScore(0)
        setResults(false)
      }

    //Here we create our question elements, by mapping through our data and applying the needed values.

    const questionElements = questions.map((question,index) =>{
        return  <Question
          id={nanoid()}
          questions={questions}
          key={index} 
          question={question.question} 
          answers={question.answers}
          chosenAnswer={question.chosenAnswer}
          correctAnswer={question.correctAnswer}
          updateAnswer={userSelection}
          results={results}
          />
          })


return (
<main>
<Overlay toggle={toggle} styles={styles}/>
{gameCommenced && <div className="game-container">
            <div className="qa-container">
            {questionElements}
            </div>
            {!results && <button className="checkAnswers" onClick={checkAnswers}>Check Answers!</button>}
            {results && <div className="resultsBlock"><p className="scoretext">Your scored {score}/5 correct answers</p>
            <button className="playAgain" onClick={playAgain}>Play Again!</button></div>}
        </div>}
</main>
)
}



