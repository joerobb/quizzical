import React from 'react'
import {decode} from 'html-entities'
export default function Question(props) {

    function answerClick(answer, question) {
        props.updateAnswer(question, answer)
    }
    

    const answerArray = props.answers.map((answer, index) => (
        <button 
        className={`answer
        ${answer === props.chosenAnswer ? "selected" : ""}
        ${props.results && answer === props.correctAnswer ? "correct" : ""}
        ${props.results && answer === props.chosenAnswer && answer !== 
        props.correctAnswer ? "incorrect": ""}
        `}
        key={index} 
        onClick={() => answerClick(answer, props.question)}
        id={index}>{decode(answer)}</button>
    ))

    return (
        <div>
            <div key={props.id} id={props.id}>
            <h3 className="question">{decode(props.question)}</h3>
            <div className="answers">
                {answerArray}
            </div>
        </div>
        </div>
    )
}