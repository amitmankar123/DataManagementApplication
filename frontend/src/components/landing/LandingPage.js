import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import ProjectCard from './ProjectCard';
import ClientCard from './ClientCard';
import ContactForm from './ContactForm';
import NewsletterForm from './NewsletterForm';
import Footer from './Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Services />
      {/* Projects Section */}
      <section className="section" id="projects">
        <div className="container">
          <h2 className="section-title">Our Projects</h2>
          <ProjectCard />
        </div>
      </section>
      {/* Clients Section */}
      <section className="section bg-light" id="clients">
        <div className="container">
          <h2 className="section-title">Our Clients</h2>
          <ClientCard />
        </div>
      </section>
      {/* Contact Section */}
      <section className="section" id="contact">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <ContactForm />
        </div>
      </section>
      {/* Newsletter in Footer */}
      <section className="section bg-light" id="newsletter">
        <div className="container" style={{maxWidth: 500}}>
          <h2 className="section-title">Subscribe to our Newsletter</h2>
          <NewsletterForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage; 