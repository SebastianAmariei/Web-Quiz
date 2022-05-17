import React from 'react'

function Options(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#4D5B9E" : "white"
    }

    console.log(props)

    const stylesAfter = {
        backgroundColor: props.isHeld 
        ? props.correct 
            ? "#4D5B9E"
            : "pink"
        : props.correct
            ? "lightgreen"
            : "white"
    }

    if (props.isFinished === true)
        return (
            <div style={stylesAfter} className="ButtonContainer">{props.text}</div>
    )
    else{
        return (
            <div style={styles} onClick={() => props.handler(props.id, props.qid)} className="ButtonContainer">{props.text}</div>
        )   
    }
}

export default Options
