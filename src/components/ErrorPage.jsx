import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';
import Footer from './Footer';

const ErrorPage = () => {
    return (
        <>

            <section className="error-page">
                <div className="error-container">
                    <img src="/404.png" width="40%" alt="404" />
                    <p>Oops! The page you're looking for doesn't exist.</p>
                    <Link to="/" className="home-button">
                        <span className="text">Go back to Home</span>
                        <span className="arrow-slide">&larr;</span>
                    </Link>

                </div>
            </section>
            <Footer />
        </>
    );
};

export default ErrorPage;
