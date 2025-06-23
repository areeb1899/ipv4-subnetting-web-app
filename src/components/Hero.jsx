import React from 'react';
import './Hero.css';

const Hero = () => {
  const handleClick = (e) => {
    e.preventDefault(); 
    const element = document.getElementById('practice');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <h2>Master IPv4 Subnetting</h2>
        <p>Practice subnetting problems, understand CIDR notation, and strengthen your networking skills — all in one place.</p>
        <a href="#!" onClick={handleClick} className="hero-btn">Start Practicing</a>
      </div>
    </section>
  );
};

export default Hero;
