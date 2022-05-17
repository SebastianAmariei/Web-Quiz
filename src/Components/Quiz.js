
import React from 'react'
import Questions from "./Questions"
import {nanoid} from "nanoid"

function Quiz() {

    const [questionsData, setQuestionsData] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [finish, setFinish] = React.useState(false)
    const [switcher, setSwitcher] = React.useState(false)

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data => (setQuestionsData(data.results.map((data) => {
            return {
                question: {
                    text: data.question,
                    id: nanoid()
                },
                answers: [
                    {
                        text: data.correct_answer,
                        id: nanoid(),
                        isHeld: false,
                        correct: true
                    },
                    {
                        text: data.incorrect_answers[0],
                        id: nanoid(),
                        isHeld: false,
                        correct: false
                    },
                    {
                        text: data.incorrect_answers[1],
                        id: nanoid(),
                        isHeld: false,
                        correct: false
                    },
                    {
                        text: data.incorrect_answers[2],
                        id: nanoid(),
                        isHeld: false,
                        correct: false
                    }
            ]
            }
        }))))
        .then(data =>
            setQuestionsData((oldValue) => (
                oldValue.map((mapped) => {
                    const arr = mapped.answers.sort(() => Math.random() - 0.5)
                    return{
                        ...mapped,
                        answers: arr,
                    }
                })
        )))

    },[switcher])

    function handler(id, qid) {
        const updated = questionsData.map((mapped) => {
            if (qid === mapped.question.id){
                return mapped.answers.map((map) => {
                    return map.id === id 
                    ? {...map, isHeld: true}
                    : {...map, isHeld: false}
                })
            }
            else {
                return mapped.answers.map((map) => {
                    return map.id === id 
                    ? {...map}
                    : {...map}
                })
            }
        })

        setQuestionsData(oldValue => {
            return oldValue.map((question, index) => {
                return {
                    ...question,
                    answers: updated[index]
                }
            })
        })
    }

    function CheckAnswers () {
        let scoreTemp = 0;

        questionsData.forEach((question) => {
            question.answers.forEach((que) => {
                if((que.isHeld === true) && (que.correct === true)){
                    scoreTemp++
                }
            })
        })
        setScore(scoreTemp)
        setFinish(true)
    }

    function RestartQuiz() {
        setFinish(false)
        setSwitcher((oldValue) => !oldValue)
    }

    const displayAnswers = 
    questionsData ?
    questionsData.map((questions) => (
        <Questions 
            key={questions.question.id}
            {...questions}
            handler = {handler}
            isFinished ={finish}
        />
    ))
    : console.log("Not Working")

    return (
        <div className="QuestionContainer">
           {displayAnswers}
           {finish 
           ? 
           <> 
            <h3 className="Score">You scored {score} out of 5</h3>
            <button onClick={RestartQuiz} className="SubmitButton">Restart Quiz</button>
           </>
           :
            <button onClick={CheckAnswers} className="SubmitButton">Check Answers</button>
           }
           
        </div>
    )
}

export default Quiz
