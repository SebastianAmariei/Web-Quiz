import React from 'react'
import Options from "./Options"

function Questions(props) {
  

  const displayOptions = props.answers.map((mapped) => (
    <Options 
      key={mapped.id}
      {...mapped}
      handler = {props.handler}
      qid={props.question.id}
      isFinished={props.isFinished}
    />
  ))

  return (
    <>
        <div className="QuestionContainer">
            <h1 className="Question"> {props.question.text}</h1>
            <div className="answersDisplay">
              {displayOptions}
            </div>
        </div>
        
    </>
  )
}

export default Questions
