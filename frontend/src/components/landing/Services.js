import React from 'react';
import './Services.css';

const services = [
  {
    icon: '🤖',
    title: 'AI Consulting',
    desc: 'Expert guidance to integrate AI into your business workflows.'
  },
  {
    icon: '📊',
    title: 'Data Analytics',
    desc: 'Unlock insights from your data with advanced analytics and ML.'
  },
  {
    icon: '🧠',
    title: 'Custom AI Solutions',
    desc: 'Tailored machine learning models for your unique challenges.'
  },
  {
    icon: '☁️',
    title: 'Cloud AI Deployment',
    desc: 'Deploy scalable AI solutions on the cloud with ease.'
  }
];

const Services = () => (
  <section className="services-section" id="services">
    <div className="container">
      <h2 className="section-title">Our Services</h2>
      <div className="services-grid">
        {services.map((s, i) => (
          <div className="service-card" key={i}>
            <div className="service-icon">{s.icon}</div>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services; 