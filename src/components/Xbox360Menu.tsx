import React, { useState, useEffect } from 'react';
import '../styles/Xbox360Menu.css';

interface MenuItem {
  id: string;
  label: string;
  image: string;
  description?: string;
}

const Xbox360Menu: React.FC = () => {
  // Items — rutas públicas en /public
  const menuItems: MenuItem[] = [
    { id: 'illimani', label: 'Illimani', image: '/Illimani.jpg', description: 'Montaña icónica de La Paz' },
    { id: 'casa-abandonada', label: 'Casa abandonada', image: '/Casa.jpg', description: 'Arquitectura abandonada' },
    { id: 'casa-pueblo-quemada', label: 'Casa del puebllo quemada', image: '/casa del pueblo quemada.jpg', description: 'Sede de gobierno boliviano (quemada)' },
    { id: 'bosquesillo', label: 'Bosquesillo', image: '/bosque.jpg', description: 'Pequeño bosque paceño' }
  ];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const clampIndex = (i: number) => (i + menuItems.length) % menuItems.length;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (openDetail) {
        if (e.key === 'Escape') setOpenDetail(false);
        return;
      }
      if (e.key === 'ArrowLeft') setSelectedIndex((s) => clampIndex(s - 1));
      if (e.key === 'ArrowRight') setSelectedIndex((s) => clampIndex(s + 1));
      if (e.key === 'Enter') setOpenDetail(true);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [openDetail]);

  const openItemDetail = (index: number) => {
    setSelectedIndex(index);
    setOpenDetail(true);
  };

  return (
    <div className="xbox-dashboard" style={{ backgroundImage: 'url(/bosque.jpg)' }}>
      <div className="dashboard-overlay" />

      <header className="dashboard-header">
        <div className="header-left">
          <div className="avatar-small" />
          <div className="user-block">
            <div className="user-name">NewSasquatch</div>
            <div className="user-score">21,337 <span className="g">G</span></div>
          </div>
          <div className="featured-game">
            <div className="featured-title">Infierno "Condenados al dolor"</div>
          </div>
        </div>
        <div className="header-right">
          <div className="clock">04:55 pm</div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="tiles-row">
          {menuItems.map((item, idx) => (
            <div
              key={item.id}
              className={`tile ${idx === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(idx)}
              onDoubleClick={() => openItemDetail(idx)}
            >
              <div className="tile-image-wrap">
                <img src={item.image} alt={item.label} />
              </div>
              <div className="tile-label">{item.label}</div>
            </div>
          ))}
        </section>

        <section className="big-panels">
          {menuItems.map((item, idx) => (
            <div key={item.id} className={`panel ${idx === selectedIndex ? 'visible' : ''}`}>
              <div className="panel-image" style={{ backgroundImage: `url(${item.image})` }} />
              <div className="panel-info">
                <h3>{item.label}</h3>
                <p>{item.description}</p>
                <button className="open-btn" onClick={() => openItemDetail(idx)}>Abrir</button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Sección promocional para el videojuego "El Infierno Oculto" */}
      <section className="promo-section">
        <div className="promo-card">
          <div className="promo-media" style={{ backgroundImage: `url(/bosque.jpg)` }} />
          <div className="promo-content">
            <h2>El Infierno Oculto</h2>
            <p>
              Survival horror ambientado en los barrios olvidados de La Paz. Enfrenta tus miedos,
              resuelve acertijos y descubre el secreto que acecha en la oscuridad.
            </p>
            <div className="promo-actions">
              <button className="promo-trailer" onClick={() => alert('Reproduciendo tráiler (simulado)...')}>Ver tráiler</button>
              <button className="promo-buy">Comprar</button>
            </div>
          </div>
        </div>
      </section>

      <div className="dashboard-footer">
        <div className="footer-controls">Seleccionar · ← → Navegar · Enter abrir</div>
      </div>

      {openDetail && (
        <div className="detail-modal" role="dialog" aria-modal="true">
          <div className="detail-card">
            <button className="detail-close" onClick={() => setOpenDetail(false)}>✕</button>
            <div className="detail-media" style={{ backgroundImage: `url(${menuItems[selectedIndex].image})` }} />
            <div className="detail-body">
              <h2>{menuItems[selectedIndex].label}</h2>
              <p>{menuItems[selectedIndex].description}</p>
              <div className="detail-actions">
                <button className="play-btn">Play</button>
                <button className="info-btn" onClick={() => setOpenDetail(false)}>Back</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Xbox360Menu;
