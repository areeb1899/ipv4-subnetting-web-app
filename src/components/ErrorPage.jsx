import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';
import Footer from './Footer';

const ErrorPage = () => {
    return (
        <>

            <section className="error-page">
                <div className="error-container">
                    <h1>404</h1>
                    <p>Oops! The page you're looking for doesn't exist.</p>
                    <Link to="/" className="home-link">Go back to Home</Link>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ErrorPage;
