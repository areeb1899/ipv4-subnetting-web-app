import React, { useEffect, useState } from 'react';
import './IPDetails.css';
import Footer from './Footer';

const IPDetails = () => {
    const [ipData, setIpData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        fetch('https://ipwho.is/')
            .then(res => res.json())
            .then(data => {
                if (data.success) setIpData(data);
                else setError('Failed to retrieve IP details');
                setLoading(false);
            })
            .catch(() => {
                setError('Could not fetch IP details');
                setLoading(false);
            });
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(ipData.ip);
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
    };

    return (
        <>

            <section className="ip-details-section">
                <h2>Your IP Address & Network Details</h2>

                {loading && <p className="loading-text">Loading your IP details...</p>}
                {error && !loading && <p className="error">{error}</p>}

                {ipData && !loading && (
                    <div className="ip-layout-row">
                        <div className="ip-box">
                            <div className="ip-copy-row">
                                <p><strong>IPv4 Address:</strong>  <b>{ipData.ip}</b> </p> 
                                <button onClick={handleCopy} className="copy-btn">Copy</button>
                                {copySuccess && <span className="copied-msg">{copySuccess}</span>}
                            </div>
                            <p><strong>IPv6 Address:</strong>  {ipData.ipv6 || 'Not available'}</p>
                            <p><strong>Hostname:</strong> {ipData.connection?.domain || 'Not available'}</p>
                            <p><strong>ASN:</strong> {ipData.connection?.asn || 'N/A'}</p>
                            <p><strong>ISP:</strong> {ipData.connection?.org}</p>
                            <p><strong>Services:</strong> {ipData.security?.vpn ? 'VPN' : 'None detected'}</p>
                            <p><strong>Country:</strong> {ipData.country}</p>
                            <p><strong>Region:</strong> {ipData.region}</p>
                            <p><strong>City:</strong> {ipData.city}</p>
                            <p><strong>Latitude:</strong> {ipData.latitude} ({convertToDMS(ipData.latitude, true)})</p>
                            <p><strong>Longitude:</strong> {ipData.longitude} ({convertToDMS(ipData.longitude, false)})</p>
                        </div>

                        <div className="map-container">
                            <h3>Location on Map</h3>
                            <iframe
                                title="User Location"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${ipData.longitude - 0.02}%2C${ipData.latitude - 0.02}%2C${ipData.longitude + 0.02}%2C${ipData.latitude + 0.02}&layer=mapnik&marker=${ipData.latitude}%2C${ipData.longitude}`}
                                style={{ borderRadius: '10px' }}
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
            <Footer />
        </>
    );
};

// DMS Conversion Function
const convertToDMS = (dec, isLat) => {
    const dir = dec < 0 ? (isLat ? 'S' : 'W') : (isLat ? 'N' : 'E');
    const abs = Math.abs(dec);
    const deg = Math.floor(abs);
    const minFloat = (abs - deg) * 60;
    const min = Math.floor(minFloat);
    const sec = Math.round((minFloat - min) * 60);
    return `${deg}° ${min}' ${sec}" ${dir}`;
};

export default IPDetails;
