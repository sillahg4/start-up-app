import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const API = process.env.REACT_APP_API_URL || '';

const iconMap = {
  cloud: '☁️',
  shield: '🛡️',
  chart: '📊',
  zap: '⚡',
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    axios.get(`${API}/api/products`)
      .then(r => { setProducts(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="products-page">
      <section className="page-hero">
        <div className="container">
          <span className="tag">Our Platform</span>
          <h1 className="section-title" style={{ marginTop: 16 }}>Products built<br />for the modern stack.</h1>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Every product is designed to integrate seamlessly, scale infinitely, and deploy in minutes.
          </p>
        </div>
      </section>

      <section className="container products-section">
        {/* Filter Tabs */}
        <div className="products__filters">
          {categories.map(c => (
            <button
              key={c}
              className={`products__filter-btn ${activeCategory === c ? 'products__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="products__loading">
            {[1,2,3,4].map(i => <div className="product-skeleton" key={i} />)}
          </div>
        ) : (
          <div className="products__grid">
            {filtered.map(p => (
              <div className="product-card" key={p.id}>
                <div className="product-card__icon">{iconMap[p.icon] || '🔧'}</div>
                <span className="product-card__category">{p.category}</span>
                <h3 className="product-card__name">{p.name}</h3>
                <p className="product-card__desc">{p.description}</p>
                <button className="product-card__btn">Learn more →</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
