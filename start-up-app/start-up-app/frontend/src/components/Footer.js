import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-mark">N</span>
            <span>NovaTech Solutions</span>
          </div>
          <p className="footer__tagline">Powering the next generation<br />of intelligent infrastructure.</p>
        </div>

        <nav className="footer__nav">
          <div className="footer__nav-group">
            <h4>Product</h4>
            <Link to="/products">CloudSync Pro</Link>
            <Link to="/products">SecureVault</Link>
            <Link to="/products">DataFlow Analytics</Link>
            <Link to="/products">AutoScale Engine</Link>
          </div>
          <div className="footer__nav-group">
            <h4>Company</h4>
            <Link to="/">About</Link>
            <Link to="/team">Team</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} NovaTech Solutions. Built on AWS.</p>
        <p className="footer__stack">React · Python · AWS · CloudFront · Elastic Beanstalk · RDS</p>
      </div>
    </footer>
  );
}
