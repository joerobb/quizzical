import React from 'react'

export default function Overlay(props) {

    return (
        <div className="overlay" style={props.styles}>
            <div className="intro-container">
            <h2 className="title">Quizzical</h2>
            <p>Welcome to quizzical, get ready to test your general knowledge!</p>
            <button className="start-quiz" onClick={props.toggle}>Start Quiz</button>
            </div>
        </div>
    )
}