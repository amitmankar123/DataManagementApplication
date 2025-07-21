import React from 'react';
import './Hero.css';

const Hero = () => (
  <section className="hero" id="home">
    <div className="hero-bg" />
    <div className="container hero-content">
      <h1 className="hero-title">Empowering the Future with AI</h1>
      <p className="hero-subtitle">Building intelligent solutions for a smarter world</p>
      <a href="#contact" className="btn btn-primary hero-btn">Get Started</a>
    </div>
  </section>
);

export default Hero; 