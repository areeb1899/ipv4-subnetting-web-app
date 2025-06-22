import React, { useEffect, useRef, useState } from 'react';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer
      className={`footer ${isVisible ? 'animate' : ''}`}
      id="footer"
      ref={footerRef}
    >
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Created by Areeb Ahmed</p>
      </div>
    </footer>
  );
};

export default Footer;
