import React, { useState, useEffect } from 'react';
import './Practice.css';
import { generateRandomIP } from '../utils/ipUtils';
import { calculateSubnetDetails } from '../utils/subnetUtils';

// List of subnet attributes the user must solve for
const fields = ['Network', 'First Host', 'Last Host', 'Broadcast', 'Next Subnet'];

const Practice = () => {
    // Controls whether answers/results briefly fade out when clearing
    const [evaporateAnswers, setEvaporateAnswers] = useState(false);

    // Converts an IP array to binary string format (e.g., "11000000.10101000.00000001.00001010")
    const toBinary = (ipArr) =>
        ipArr.map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('.');

    // State for target IP and CIDR (default: 192.168.1.10/28)
    const [ipData, setIpData] = useState({ ip: [192, 168, 1, 10], cidr: 28 });

    // Stores the correct subnet values calculated from the target IP
    const [correctAnswers, setCorrectAnswers] = useState({});

    // Stores the user's input values for each field
    const [userInputs, setUserInputs] = useState({});

    // Tracks which answers are revealed for each field
    const [showAnswers, setShowAnswers] = useState({});

    // Stores whether the user's input was correct, incorrect, or had an error
    const [results, setResults] = useState({});

    // Recalculate correct answers whenever the IP or CIDR changes
    useEffect(() => {
        const answers = calculateSubnetDetails(ipData.ip, ipData.cidr);
        setCorrectAnswers(answers);
    }, [ipData]);

    // Handles user typing into an input field
    const handleInputChange = (field, index, value) => {
        const updated = { ...userInputs };
        updated[field] = updated[field] || ['', '', '', ''];
        updated[field][index] = value;
        setUserInputs(updated);
    };

    // Generates a new random IP and resets all inputs/results
    const handleNewProblem = () => {
        const newIp = generateRandomIP();
        setIpData(newIp);
        setUserInputs({});
        setShowAnswers({});
        setResults({});
    };

    // Checks if user input for a specific field matches the correct answer
    const handleCheck = (field) => {
        const correct = correctAnswers[field];
        const input = userInputs[field];

        // Show error if input is incomplete
        if (!correct || !input || input.length !== 4 || input.some(i => i === '')) {
            setResults(prev => ({ ...prev, [field]: 'ERROR' }));
            return 'ERROR';
        }

        // Compare each octet
        const isCorrect = correct.every((val, idx) => parseInt(val) === parseInt(input[idx]));
        const result = isCorrect ? 'YES' : 'NO';
        setResults(prev => ({ ...prev, [field]: result }));
        return result;
    };

    // Reveals the correct answer for a specific field
    const handleShow = (field) => {
        setShowAnswers(prev => ({ ...prev, [field]: true }));
    };

    // Checks all fields
    const handleCheckAll = () => {
        fields.forEach(handleCheck);
    };

    // Reveals answers for all fields
    const handleShowAll = () => {
        const allShown = {};
        fields.forEach(field => allShown[field] = true);
        setShowAnswers(allShown);
    };

    // Converts the CIDR to a binary subnet mask string
    const getSubnetMaskBinary = (cidr) => {
        const binary = '1'.repeat(cidr).padEnd(32, '0');
        const octets = binary.match(/.{1,8}/g);
        return octets.join('.');
    };

    return (
        <section className="practice" id="practice">
            <div className="practice-container">
                {/* Instruction panel */}
                <p className="instructions">
                    To practice Subnetting: Click on the <strong>[New Problem]</strong> button below<br />
                    Solve the five attributes for the given Target IP and CIDR<br />
                    Click <strong>[Check]</strong> to check if your answer was correct<br />
                    Click <strong>[Show]</strong> to view correct answers<br />
                    Type <strong>"."</strong> or <strong>"/"</strong> in any input box to jump to the next box (desktop only)
                </p>

                {/* Button to generate new subnet problem */}
                <button className="new-problem-button" onClick={handleNewProblem}>New Problem</button>

                {/* Inputs for IP address and CIDR */}
                <div className="target-ip-inputs">
                    <h3 className="target-ip">Target IP address</h3>
                    {ipData.ip.map((octet, idx) => (
                        <input
                            key={idx}
                            type="number"
                            value={octet === 0 ? '' : octet}
                            min="0"
                            max="255"
                            className="target-octet"
                            onChange={(e) => {
                                const newIp = [...ipData.ip];
                                newIp[idx] = Math.max(0, Math.min(255, parseInt(e.target.value || 0)));
                                setIpData({ ...ipData, ip: newIp });
                            }}
                        />
                    ))}
                    <span>/</span>
                    <input
                        type="number"
                        value={ipData.cidr}
                        min="1"
                        max="32"
                        className="target-cidr"
                        onChange={(e) => {
                            const newCidr = Math.max(1, Math.min(32, parseInt(e.target.value || 24)));
                            setIpData({ ...ipData, cidr: newCidr });
                        }}
                    />
                </div>

                {/* Main table with input fields, actions, and results */}
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th colSpan="4">IP Address</th>
                            <th>Check/Show</th>
                            <th colSpan="4">Answer</th>
                            <th>Correct?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map(field => (
                            <tr key={field}>
                                <td>{field}</td>
                                <td colSpan="4" className="ip-input-group">
                                    {[0, 1, 2, 3].map((i, idx) => (
                                        <span key={i} className="ip-octet-wrapper">
                                            <input
                                                type="text"
                                                value={userInputs[field]?.[i] || ''}
                                                maxLength="3"
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Only allow numbers (up to 3 digits)
                                                    if (/^\d{0,3}$/.test(value)) {
                                                        handleInputChange(field, i, value);
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    // Jump to next input on '.' or '/'
                                                    if ((e.key === '.' || e.key === '/') && i < 3) {
                                                        const nextInput = e.target.parentElement.nextSibling?.querySelector('input');
                                                        if (nextInput) nextInput.focus();
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                            {/* Add dot between octets */}
                                            {idx < 3 && <span className="dot">.</span>}
                                        </span>
                                    ))}
                                </td>

                                {/* Check and Show buttons for each field */}
                                <td>
                                    <button onClick={() => handleCheck(field)}>Check</button>
                                    <button onClick={() => handleShow(field)}>Show</button>
                                </td>

                                {/* Display correct answers if revealed */}
                                {[0, 1, 2, 3].map(i => (
                                    <td key={i} className={evaporateAnswers ? 'evaporate' : ''}>
                                        {showAnswers[field] ? correctAnswers[field]?.[i] : ''}
                                    </td>
                                ))}

                                {/* Result status: YES / NO / ERROR */}
                                <td className={evaporateAnswers ? 'evaporate' : ''}>
                                    {results[field] || ''}
                                </td>
                            </tr>
                        ))}

                        {/* Row with buttons to check/show all fields */}
                        <tr>
                            <td colSpan="5" className="check-all">Check or Show ALL</td>
                            <td>
                                <button onClick={handleCheckAll}>Check All</button>
                                <button onClick={handleShowAll}>Show All</button>
                            </td>
                            <td colSpan="5"></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                {/* Display binary representation of IP and subnet mask */}
                <div className="binary-display">
                    <h4>Binary Representation</h4>
                    <p><strong>IP Address:</strong> {toBinary(ipData.ip)}</p>
                    <p><strong>Subnet Mask:</strong> {getSubnetMaskBinary(ipData.cidr)}</p>
                </div>

                {/* Clear all inputs and answers with evaporate effect */}
                <button
                    className="clear-all"
                    onClick={() => {
                        setEvaporateAnswers(true);
                        setTimeout(() => {
                            setUserInputs({});
                            setResults({});
                            setShowAnswers({});
                            setEvaporateAnswers(false);
                        }, 600);
                    }}
                >
                    Clear All
                </button>
            </div>
        </section>
    );
};

export default Practice;
