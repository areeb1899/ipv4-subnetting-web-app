import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <h2>Master IPv4 Subnetting</h2>
        <p>Practice subnetting problems, understand CIDR notation, and strengthen your networking skills — all in one place.</p>
        <a href="#practice" className="hero-btn">Start Practicing</a>
      </div>
    </section>
  );
};

export default Hero;
