import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Team.css';

const API = process.env.REACT_APP_API_URL || '';

const avatarColors = ['#6366f1','#22d3ee','#10b981','#f59e0b'];

export default function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/team`).then(r => setTeam(r.data)).catch(() => {});
  }, []);

  return (
    <div className="team-page">
      <section className="page-hero">
        <div className="container">
          <span className="tag">Our People</span>
          <h1 className="section-title" style={{ marginTop: 16 }}>The team behind<br />the infrastructure.</h1>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Builders, architects, and security engineers obsessed with reliability at scale.
          </p>
        </div>
      </section>

      <section className="container team-section">
        <div className="team__grid">
          {team.map((member, i) => (
            <div className="team-card" key={member.id}>
              <div className="team-card__avatar" style={{ background: avatarColors[i % avatarColors.length] }}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="team-card__name">{member.name}</h3>
              <p className="team-card__role">{member.role}</p>
              <span className="team-card__expertise">{member.expertise}</span>
            </div>
          ))}
        </div>

        <div className="team-culture">
          <div className="team-culture__text">
            <span className="tag">Our Culture</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>We build with<br />purpose.</h2>
            <p className="section-subtitle" style={{ marginTop: 16 }}>
              NovaTech was founded on the belief that great infrastructure should be invisible —
              it should just work. We hire people who care deeply about the craft and about the
              engineers who rely on what we build.
            </p>
          </div>
          <div className="team-culture__values">
            {[
              { icon: '🔬', label: 'Engineering excellence' },
              { icon: '🤝', label: 'Customer obsession' },
              { icon: '🚀', label: 'Bias for action' },
              { icon: '🌱', label: 'Continuous learning' },
            ].map((v, i) => (
              <div className="culture-value" key={i}>
                <span>{v.icon}</span>
                <span>{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
