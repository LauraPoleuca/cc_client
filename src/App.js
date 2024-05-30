import "./App.css";

import React, { useState, useRef } from "react";
import ProblemList from "./ProblemList";
import FormContainer from "./FormContainer";
import TestResults from "./TestResults"

const App = () => {
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("Python");
    const codeRef = useRef(null);

    // const handleProblemSelect = (problem) => {
    //     setSelectedProblem(problem);
    // };

    return (
        <div className="App">
            <div className="main-container">
                <ProblemList
                    selectedProblem={selectedProblem}
                    setSelectedProblem={setSelectedProblem}
                />
                <FormContainer
                    setSelectedLanguage={setSelectedLanguage}
                    selectedLanguage={selectedLanguage}
                    codeRef={codeRef}
                    selectedProblem={selectedProblem}
                />
            </div>
            <TestResults></TestResults>
        </div>
    );
};

export default App;
