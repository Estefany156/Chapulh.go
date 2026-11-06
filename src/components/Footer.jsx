import React from 'react';
import './Footer.css';

// Íconos SVG para las secciones del footer
const IconInfo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const IconLink = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const IconContact = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconLocation = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
  </svg>
);

const IconAccessibility = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="4" r="2" />
    <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.38-.42-.93-.66-1.51-.66-.27 0-.54.06-.79.18L6 9.7V14h2v-3.25l2.5-.95V22h2v-6h2v6h2v-7.5l2.05-.75c.87.87 2.07 1.25 3.45 1.25z" />
  </svg>
);

const IconDiamond = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 12l10 10 10-10L12 2z" />
  </svg>
);

export default function Footer({ setActiveTab }) {
  return (
    <footer className="app-footer">
      <div className="footer-top">
        {/* Columna 1: Marca y descripción */}
        <div className="footer-col brand-col">
          <h3 className="footer-brand">CHAPUL-GO</h3>
          <p className="footer-desc">
            Movilidad clara, segura y cercana para Chapulhuacán y sus comunidades.
          </p>
        </div>

        {/* Columna 2: Información */}
        <div className="footer-col">
          <h4 className="footer-title">
            <IconInfo /> Información
          </h4>
          <ul className="footer-links">
            <li><button onClick={() => setActiveTab && setActiveTab('ayuda')}>Acerca de</button></li>
            <li><button onClick={() => setActiveTab && setActiveTab('rutas')}>Rutas</button></li>
            <li><button onClick={() => setActiveTab && setActiveTab('horarios')}>Horarios</button></li>
          </ul>
        </div>

        {/* Columna 3: Enlaces útiles */}
        <div className="footer-col">
          <h4 className="footer-title">
            <IconLink /> Enlaces útiles
          </h4>
          <ul className="footer-links">
            <li><button onClick={() => setActiveTab && setActiveTab('objetos')}>Objetos perdidos</button></li>
            <li><button onClick={() => setActiveTab && setActiveTab('ayuda')}>Términos y condiciones</button></li>
            <li><button onClick={() => setActiveTab && setActiveTab('ayuda')}>Privacidad</button></li>
            <li><button onClick={() => setActiveTab && setActiveTab('ayuda')}>Accesibilidad</button></li>
          </ul>
        </div>

        {/* Columna 4: Contacto y Redes Sociales */}
        <div className="footer-col contact-col">
          <h4 className="footer-title">
            <IconContact /> Contacto
          </h4>
          <ul className="footer-contact-list">
            <li><IconMail /> <span>hola@chapul-go.com</span></li>
            <li><IconPhone /> <span>55 0000 0000</span></li>
            <li><IconLocation /> <span>Chapulhuacán</span></li>
          </ul>

          <h5 className="social-title">Redes sociales</h5>
          <div className="social-icons">
            <a href="#facebook" className="social-btn">f</a>
            <a href="#instagram" className="social-btn">◎</a>
            <a href="#x" className="social-btn">𝕏</a>
            <a href="#threads" className="social-btn">⦿</a>
          </div>
        </div>
      </div>

      {/* Línea inferior de copyright */}
      <div className="footer-bottom">
        <span className="copyright">2025 Chapul-Go</span>
        <div className="footer-bottom-links">
          <button onClick={() => setActiveTab && setActiveTab('ayuda')} className="bottom-link">
            <IconAccessibility /> Accesibilidad
          </button>
          <button onClick={() => setActiveTab && setActiveTab('ayuda')} className="bottom-link">
            <IconDiamond /> Términos y condiciones
          </button>
        </div>
      </div>
    </footer>
  );
}