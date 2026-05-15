import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const API = process.env.REACT_APP_API_URL || '';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      await axios.post(`${API}/api/contact`, form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <span className="tag">Get in Touch</span>
          <h1 className="section-title" style={{ marginTop: 16 }}>Let's talk<br />infrastructure.</h1>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Whether you're evaluating, migrating, or scaling — our team is here to help.
          </p>
        </div>
      </section>

      <section className="container contact-section">
        <div className="contact__grid">

          {/* Info */}
          <div className="contact__info">
            <h2 className="contact__info-title">Why teams choose NovaTech</h2>
            <div className="contact__info-list">
              {[
                { icon: '⚡', title: 'Fast onboarding', desc: 'Deploy your first workload in under 30 minutes.' },
                { icon: '🛡️', title: 'Enterprise security', desc: 'SOC 2 Type II certified, zero-trust by default.' },
                { icon: '📞', title: 'Dedicated support', desc: '24/7 Slack support with a 15-minute response SLA.' },
              ].map((item, i) => (
                <div className="contact__info-item" key={i}>
                  <span className="contact__info-icon">{item.icon}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact__form-card">
            <h3 className="contact__form-title">Send us a message</h3>

            <div className="contact__field">
              <label>Full name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Alexandra Chen"
              />
            </div>

            <div className="contact__field">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="alex@company.com"
              />
            </div>

            <div className="contact__field">
              <label>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about your infrastructure needs..."
              />
            </div>

            {status === 'success' && (
              <div className="contact__alert contact__alert--success">
                ✅ Message sent! We'll be in touch within 24 hours.
              </div>
            )}
            {status === 'error' && (
              <div className="contact__alert contact__alert--error">
                ⚠️ Please fill in all fields and try again.
              </div>
            )}

            <button
              className="contact__submit"
              onClick={handleSubmit}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send message →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
