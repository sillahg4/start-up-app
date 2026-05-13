import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const API = process.env.REACT_APP_API_URL || '';

export default function Home() {
  const [metrics, setMetrics] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/metrics`).then(r => setMetrics(r.data)).catch(() => {});
    axios.get(`${API}/api/company`).then(r => setCompany(r.data)).catch(() => {});
  }, []);

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
        <div className="container hero__content">
          <span className="tag fade-up">⚡ Now in public beta</span>
          <h1 className="hero__title fade-up fade-up-1">
            Infrastructure that<br />
            <span className="hero__title-accent">scales with you.</span>
          </h1>
          <p className="hero__subtitle fade-up fade-up-2">
            {company?.tagline || 'Powering the next generation of intelligent infrastructure.'}
          </p>
          <div className="hero__actions fade-up fade-up-3">
            <Link to="/products" className="btn btn--primary">Explore Products</Link>
            <Link to="/contact"  className="btn btn--ghost">Talk to Sales →</Link>
          </div>
        </div>

        {/* Floating card decoration */}
        <div className="hero__card fade-up fade-up-4">
          <div className="hero__card-header">
            <span className="hero__card-dot hero__card-dot--green" />
            <span className="hero__card-dot hero__card-dot--yellow" />
            <span className="hero__card-dot hero__card-dot--red" />
            <span className="hero__card-title">system.status</span>
          </div>
          <div className="hero__card-body">
            <div className="hero__stat-row">
              <span>uptime</span>
              <span className="hero__stat-value hero__stat-value--green">{metrics?.uptime || '99.99%'}</span>
            </div>
            <div className="hero__stat-row">
              <span>response_time</span>
              <span className="hero__stat-value">{metrics?.response_time_ms || 12}ms</span>
            </div>
            <div className="hero__stat-row">
              <span>regions_active</span>
              <span className="hero__stat-value">{metrics?.regions || 6}</span>
            </div>
            <div className="hero__stat-row">
              <span>data_processed</span>
              <span className="hero__stat-value">{metrics?.data_processed_tb || 48.7} TB</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="stats">
        <div className="container stats__grid">
          {[
            { value: metrics?.customers?.toLocaleString() || '1,200', label: 'Customers Worldwide' },
            { value: metrics?.uptime || '99.99%',                      label: 'Uptime SLA' },
            { value: `${metrics?.data_processed_tb || 48.7} TB`,       label: 'Data Processed Daily' },
            { value: `${metrics?.response_time_ms || 12}ms`,           label: 'Avg. Response Time' },
          ].map((s, i) => (
            <div className="stats__item" key={i}>
              <span className="stats__value">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features">
        <div className="container">
          <div className="features__header">
            <span className="tag">Why NovaTech</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>Built for engineers,<br />trusted by teams.</h2>
            <p className="section-subtitle" style={{ marginTop: 16 }}>
              Every layer of our platform is designed for reliability, security, and developer experience.
            </p>
          </div>
          <div className="features__grid">
            {[
              { icon: '🔒', title: 'Zero-Trust Security',  desc: 'Every connection is verified. Every secret is encrypted. Your infrastructure stays yours.' },
              { icon: '⚡', title: 'Edge-Fast Delivery',   desc: 'Global CDN with 200+ edge nodes ensures your users get sub-20ms response times anywhere.' },
              { icon: '📈', title: 'Elastic Scaling',      desc: 'Scale from 2 to 400 instances in seconds. Pay only for what you use, automatically.' },
              { icon: '🔍', title: 'Real-Time Analytics',  desc: 'Stream, process, and visualize your data pipeline in real-time with built-in dashboards.' },
              { icon: '🛡️', title: 'Disaster Recovery',    desc: 'Automated backups, multi-AZ failover, and one-click restoration keep you always online.' },
              { icon: '🌐', title: 'Global Infrastructure', desc: 'Deploy to 6 regions simultaneously. Latency-optimized routing gets users to the nearest node.' },
            ].map((f, i) => (
              <div className="feature-card" key={i}>
                <span className="feature-card__icon">{f.icon}</span>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container cta-section__inner">
          <div className="cta-section__glow" />
          <h2 className="section-title">Ready to scale?</h2>
          <p className="section-subtitle" style={{ margin: '16px auto 32px', textAlign: 'center' }}>
            Join over 1,200 companies building on NovaTech infrastructure.
          </p>
          <Link to="/contact" className="btn btn--primary btn--lg">Start for free →</Link>
        </div>
      </section>
    </div>
  );
}
