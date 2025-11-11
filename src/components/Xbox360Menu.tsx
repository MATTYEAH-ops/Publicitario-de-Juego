import React, { useState, useEffect } from 'react';
import '../styles/Xbox360Menu.css';

interface MenuItem {
  id: string;
  label: string;
  image: string;
  description?: string;
}

const Xbox360Menu: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      id: 'casa-pueblo',
      label: 'Casa del Pueblo',
      image: '/assets/casa del pueblo quemada.jpg',
      description: 'Casa del pueblo quemada'
    },
    {
      id: 'casa',
      label: 'Casa',
      image: '/assets/Casa.jpg',
      description: 'Casa'
    },
    {
      id: 'illimani',
      label: 'Illimani',
      image: '/assets/Illimani.jpg',
      description: 'Montaña Illimani'
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        setSelectedIndex((prev: number) => (prev - 1 + menuItems.length) % menuItems.length);
        break;
      case 'ArrowRight':
        setSelectedIndex((prev: number) => (prev + 1) % menuItems.length);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuItems.length]);

  return (
    <div 
      className="xbox-menu"
      style={{
        backgroundImage: 'url(/assets/bosque.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay oscuro */}
      <div className="menu-overlay"></div>

      {/* Contenedor principal */}
      <div className="menu-container">
        {/* Título */}
        <h1 className="menu-title">MENÚ PRINCIPAL</h1>

        {/* Carrusel de items */}
        <div className="menu-carousel">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`menu-item ${index === selectedIndex ? 'active' : ''} ${
                index < selectedIndex ? 'left' : index > selectedIndex ? 'right' : ''
              }`}
            >
              <div className="item-image-wrapper">
                <img src={item.image} alt={item.label} className="item-image" />
              </div>
              <div className="item-info">
                <h2 className="item-label">{item.label}</h2>
                {item.description && (
                  <p className="item-description">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="menu-indicators">
          {menuItems.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === selectedIndex ? 'active' : ''}`}
            ></div>
          ))}
        </div>

        {/* Controles */}
        <div className="menu-controls">
          <p>← → Navegar</p>
        </div>
      </div>
    </div>
  );
};

export default Xbox360Menu;
