import React, { useState } from 'react';
import './IPLookup.css';
import Footer from './Footer';

const IPLookup = () => {
    const [inputIP, setInputIP] = useState('');
    const [ipData, setIpData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLookup = () => {
        if (!inputIP) return;

        setLoading(true);
        setError('');
        fetch(`https://ipwho.is/${inputIP}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setIpData(data);
                } else {
                    setError('Invalid IP address or not found.');
                    setIpData(null);
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Network error.');
                setLoading(false);
            });
    };

    return (
        <>
            <section className="ip-lookup-section">
                <h2>IP Lookup</h2>
                <p className="summary-text">
                    Enter any IPv4 address to get detailed information including its location, ISP, ASN, and map. Useful for analyzing external devices, connections, or testing IP behavior.
                </p>
                <div className="lookup-form">
                    <input
                        type="text"
                        placeholder="Enter IP address..."
                        value={inputIP}
                        onChange={(e) => setInputIP(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleLookup();
                        }}
                    />
                    <button onClick={handleLookup}>Lookup</button>
                </div>

                {loading && <p className="loading-text">Fetching data...</p>}
                {error && <p className="error">{error}</p>}

                {ipData && (
                    <div className="lookup-layout-row">
                        <div className="lookup-details">
                            <p><strong>IP:</strong> <span className="ip-value">{ipData.ip}</span></p>
                            <p><strong>Country:</strong> <span className="ip-value">{ipData.country}</span></p>
                            <p><strong>Region:</strong> <span className="ip-value">{ipData.region}</span></p>
                            <p><strong>City:</strong> <span className="ip-value">{ipData.city}</span></p>
                            <p><strong>ISP:</strong> <span className="ip-value">{ipData.connection?.org}</span></p>
                            <p><strong>ASN:</strong> <span className="ip-value">{ipData.connection?.asn}</span></p>
                            <p><strong>Latitude:</strong> <span className="ip-value">{ipData.latitude}</span></p>
                            <p><strong>Longitude:</strong> <span className="ip-value">{ipData.longitude}</span></p>

                        </div>

                        <div className="lookup-map">
                            <iframe
                                title="IP Location Map"
                                width="100%"
                                height="250"
                                frameBorder="0"
                                scrolling="no"
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${ipData.longitude - 0.01}%2C${ipData.latitude - 0.01}%2C${ipData.longitude + 0.01}%2C${ipData.latitude + 0.01}&layer=mapnik&marker=${ipData.latitude}%2C${ipData.longitude}`}
                                style={{ borderRadius: '8px' }}
                            ></iframe>
                            <small>
                                <a
                                    href={`https://www.openstreetmap.org/?mlat=${ipData.latitude}&mlon=${ipData.longitude}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View on OpenStreetMap.org
                                </a>
                            </small>
                        </div>
                    </div>
                )}


            </section>
            <div className="ip-info-lists">
                <div className="info-available">
                    <h3>✅ What You Will Get With This Tool</h3>
                    <ul>
                        <li>The ISP/organization's name</li>
                        <li>The country it's in</li>
                        <li>The region/state</li>
                        <li>The city</li>
                        <li>The latitude and longitude of the location (a best guess)</li>
                        <li>The area code for that region</li>
                        <li>Any known services running on that IP</li>
                    </ul>
                </div>

                <div className="info-not-available">
                    <h3>❌ What You Won’t Get</h3>
                    <ul>
                        <li> A person's name</li>
                        <li> The exact location or street address</li>
                        <li> A phone number</li>
                        <li> Their email address</li>
                    </ul>
                    <p className="privacy-note">
                        🔒 That’s where privacy issues come in, which are there to protect internet users like you.
                    </p>
                </div>
            </div>



            <Footer />
        </>
    );
};

export default IPLookup;
