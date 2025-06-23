import React from 'react';
import './BinaryRepresentation.css';

const BinaryRepresentation = () => {
    return (
        <section className="binary-notes" id="binary-notes">
            <div className="binary-notes-container">
                <h2>How Binary Subnetting Works</h2>

                <h3>1. Convert IP and Mask to Binary</h3>
                <p><strong>IP:</strong> 192.168.1.0 → <code>11000000.10101000.00000001.00000000</code></p>
                <p><strong>Mask:</strong> 255.255.255.0 → <code>11111111.11111111.11111111.00000000</code></p>

                <h3>2. Network & Broadcast Addresses</h3>
                <p><strong>Network:</strong> AND with subnet mask → <code>192.168.1.0</code></p>
                <p><strong>Broadcast:</strong> All host bits = 1 → <code>192.168.1.255</code></p>

                <h3>3. Subnetting Example (/28)</h3>
                <p><strong>Mask (/28):</strong> 255.255.255.240 → <code>11111111.11111111.11111111.11110000</code></p>
                <p><strong>First Subnet:</strong> 192.168.1.0 – 192.168.1.15</p>
                <p><strong>Second Subnet:</strong> 192.168.1.16 – 192.168.1.31</p>

                <h3>4. Example Table</h3>
                <table>
                    <thead>
                        <tr>
                            <th>IP/CIDR</th>
                            <th>Mask (Binary)</th>
                            <th>Network</th>
                            <th>Broadcast</th>
                            <th>Host Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>192.168.5.85/24</td>
                            <td>11111111.11111111.11111111.00000000</td>
                            <td>192.168.5.0</td>
                            <td>192.168.5.255</td>
                            <td>192.168.5.1 – 192.168.5.254</td>
                        </tr>
                        <tr>
                            <td>10.128.240.50/30</td>
                            <td>11111111.11111111.11111111.11111100</td>
                            <td>10.128.240.48</td>
                            <td>10.128.240.51</td>
                            <td>10.128.240.49 – 10.128.240.50</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="video-section">
                <h3>Watch: Understanding Binary Subnetting</h3>
                <div className="video-wrapper">
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/RrJXLdv1i74"
                        title="Binary Subnetting Explanation"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default BinaryRepresentation;
