import React, { useEffect, useRef, useState } from 'react';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about ${isVisible ? 'visible' : ''}`}
    >
      <div className="about-container">
        <h2>What is Subnetting?</h2>
        <p>
          Subnetting is a technique used in IP networks to divide a larger network into smaller, manageable subnetworks. 
          It helps optimize IP address usage, improve network performance, and enhance security. 
          Practicing subnetting will help you understand binary math, CIDR notation, and how to calculate network, broadcast, and usable IP addresses.
        </p>
      </div>
    </section>
  );
};

export default About;
