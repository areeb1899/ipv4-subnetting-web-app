import React, { useState, useEffect } from 'react';
import './Practice.css';
import { generateRandomIP } from '../utils/ipUtils';
import { calculateSubnetDetails } from '../utils/subnetUtils';

const fields = ['Network', 'First Host', 'Last Host', 'Broadcast', 'Next Subnet'];

const Practice = () => {
    const [evaporateAnswers, setEvaporateAnswers] = useState(false);


    const [ipData, setIpData] = useState({ ip: [192, 168, 1, 10], cidr: 28 });
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [userInputs, setUserInputs] = useState({});
    const [showAnswers, setShowAnswers] = useState({});
    const [results, setResults] = useState({});

    // Calculate on first render or when IP changes
    useEffect(() => {
        const answers = calculateSubnetDetails(ipData.ip, ipData.cidr);
        setCorrectAnswers(answers);
    }, [ipData]);


    const handleInputChange = (field, index, value) => {
        const updated = { ...userInputs };
        updated[field] = updated[field] || ['', '', '', ''];
        updated[field][index] = value;
        setUserInputs(updated);
    };

    const handleNewProblem = () => {
        const newIp = generateRandomIP();
        setIpData(newIp);
        setUserInputs({});
        setShowAnswers({});
        setResults({});
    };

    const handleCheck = (field) => {
        const correct = correctAnswers[field];
        const input = userInputs[field];

        if (!correct || !input || input.length !== 4 || input.some(i => i === '')) {
            setResults(prev => ({ ...prev, [field]: 'ERROR' }));
            return 'ERROR';
        }

        const isCorrect = correct.every((val, idx) => parseInt(val) === parseInt(input[idx]));
        const result = isCorrect ? 'YES' : 'NO';
        setResults(prev => ({ ...prev, [field]: result }));
        return result;
    };


    const handleShow = (field) => {
        setShowAnswers(prev => ({ ...prev, [field]: true }));
    };

    const handleCheckAll = () => {
        fields.forEach(handleCheck);
    };

    const handleShowAll = () => {
        const allShown = {};
        fields.forEach(field => allShown[field] = true);
        setShowAnswers(allShown);
    };

    return (
        <section className="practice" id="practice">
            <div className="practice-container">
                <p className="instructions">
                    To practice Subnetting: Click on the <strong>[New Problem]</strong> button below<br />
                    Solve the five attributes for the given Target IP and CIDR<br />
                    Click <strong>[Check]</strong> to check if your answer was correct<br />
                    Click <strong>[Show]</strong> to view correct answers<br />
                    Type <strong>"."</strong> or <strong>"/"</strong> in any input box to jump to the next box (desktop only)
                </p>

                <button className="new-problem-button" onClick={handleNewProblem}>New Problem</button>

                <div className="target-ip-inputs">
                    <h3 className="target-ip">
                        Target IP address
                    </h3>
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
                                                onChange={(e) => handleInputChange(field, i, e.target.value)}
                                                onKeyDown={(e) => {
                                                    if ((e.key === '.' || e.key === '/') && i < 3) {
                                                        const nextInput = e.target.parentElement.nextSibling?.querySelector('input');
                                                        if (nextInput) nextInput.focus();
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                            {idx < 3 && <span className="dot">.</span>}
                                        </span>
                                    ))}
                                </td>

                                <td>
                                    <button onClick={() => handleCheck(field)}>Check</button>
                                    <button onClick={() => handleShow(field)}>Show</button>
                                </td>
                                {[0, 1, 2, 3].map(i => (
                                    <td key={i} className={evaporateAnswers ? 'evaporate' : ''}>
                                        {showAnswers[field] ? correctAnswers[field]?.[i] : ''}
                                    </td>
                                ))}
                                <td className={evaporateAnswers ? 'evaporate' : ''}>
                                    {results[field] || ''}
                                </td>

                            </tr>
                        ))}
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
                <button
                    className="clear-all"
                    onClick={() => {
                        setEvaporateAnswers(true); // start animation
                        setTimeout(() => {
                            setUserInputs({});
                            setResults({});
                            setShowAnswers({});
                            setEvaporateAnswers(false); // reset animation state
                        }, 600); // slightly longer than CSS animation
                    }}
                >
                    Clear All
                </button>
            </div>
        </section>
    );
};

export default Practice;
