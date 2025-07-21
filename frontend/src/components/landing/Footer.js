import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <span className="footer-company">AIVision</span>
      <span className="footer-copy">&copy; {new Date().getFullYear()} AIVision. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer; 