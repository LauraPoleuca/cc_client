import React, { useState, useEffect } from "react";
import axios from "axios";

const ProblemList = ({selectedProblem, setSelectedProblem}) => {
    const [problems, setProblems] = useState([]);
    // const [selectedProblem, setSelectedProblem] = useState(null);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get("http://50.19.168.7:5000/problems");
                setProblems(response.data);
            } catch (error) {
                console.error("Error fetching problems:", error);
            }
        };
        fetchProblems();
    }, []);

    const handleClick = (problem) => {
        setSelectedProblem(problem);
    };

    return (
        <div className="problem-list">
            <ul>
                {problems.map((problem) => (
                    <li key={problem.id} onClick={() => handleClick(problem)}>
                        <strong>{problem.title}</strong> - difficulty: {problem.difficulty}
                    </li>
                ))}
            </ul>
            {selectedProblem && (
                <div className="selected-problem">
                    <h3>{selectedProblem.title} - difficulty: {selectedProblem.difficulty}</h3>
                    <p>{selectedProblem.description}</p>
                </div>
            )}
        </div>
    );
};

export default ProblemList;
