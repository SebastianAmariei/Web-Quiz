import React from 'react'
import Quiz from "./Components/Quiz"
import Landing from "./Components/LandingPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
function App() {


  return (
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="Quiz" element={<Quiz />} />
          </Routes>
        </Router>
  )
}

export default App;
