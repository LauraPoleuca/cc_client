import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './styles.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const TestResults = () => {
    const [results, setResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchResults = async () => {
        try {
            const response = await axios.get('http://50.19.168.7:5000/results');
            setResults(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching test results:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={fetchResults}>Show Latest Test Results</button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Test Results"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Latest Test Results</h2>
                <button onClick={closeModal}>Close</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Problem ID</th>
                            <th>Success</th>
                            <th>Failed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(result => (
                            <tr key={result.id}>
                                <td>{result.id}</td>
                                <td>{result.problem_id}</td>
                                <td>{result.success}</td>
                                <td>{result.failed}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>
        </div>
    );
};

export default TestResults;
