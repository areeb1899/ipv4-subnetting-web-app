import React from 'react';
import { Link } from 'react-router-dom';
import './FlsmVlsm.css';
import Footer from './Footer';

const FlsmVlsm = () => (
    <>
        <section className="flsm-vlsm">
            <div className="flsm-vlsm-container">
                <h2>FLSM vs VLSM Subnetting</h2>
                <p>
                    There are two approaches to subnetting:
                </p>
                <ul>
                    <li>
                        <strong>FLSM</strong> (Fixed-Length Subnet Mask): All subnets are the same size, use the same mask. Easy to configure, but wastes IPs.
                        <a target='_blank' href="https://www.geeksforgeeks.org/computer-networks/fixed-length-and-variable-length-subnet-mask-numericals/"> Read More...</a>
                    </li>
                    <li>
                        <strong>VLSM</strong> (Variable-Length Subnet Mask): Subnets can have different sizes and masks. More complex, but conserves IP space and is used in modern networks.
                        <a target='_blank' href="https://www.geeksforgeeks.org/computer-networks/introduction-of-variable-length-subnet-mask-vlsm/"> Read More...</a>
                    </li>
                </ul>

                <table>
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>FLSM</th>
                            <th>VLSM</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Subnet Size</td><td>Equal</td><td>Variable</td>
                        </tr>
                        <tr>
                            <td>Subnet Mask</td><td>Same</td><td>Different</td>
                        </tr>
                        <tr>
                            <td>IP Utilization</td><td>Less efficient</td><td>More efficient</td>
                        </tr>
                        <tr>
                            <td>Complexity</td><td>Simple</td><td>More complex</td>
                        </tr>
                        <tr>
                            <td>Routing</td><td>Supports classful and classless</td><td>Only classless</td>
                        </tr>
                    </tbody>
                </table>

                <h3>VLSM Example</h3>
                <p>
                    Suppose we need 4 subnets from a /24 network: one for 60 hosts, another for 40, then 20, then 10. With VLSM:
                </p>
                <ul>
                    <li>60-host: /26 (64 addresses), e.g. 192.168.1.0/26</li>
                    <li>40-host: /26 again for 62 addresses, e.g. 192.168.1.64/26</li>
                    <li>20-host: /27 (32 addresses), e.g. 192.168.1.128/27</li>
                    <li>10-host: /28 (16 addresses), e.g. 192.168.1.160/28</li>
                </ul>
                <p>
                    This saves many unused addresses compared to FLSM, which would waste space.
                </p>
            </div>
        </section>

        <p className="cheat-sheet-link">
            <Link to="/subnetting-cheat-sheet">
                📘 Subnetting Cheat Sheet
            </Link>
        </p>
        <Footer />
    </>
);

export default FlsmVlsm;
