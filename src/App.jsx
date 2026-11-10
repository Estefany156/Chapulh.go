import React, { useState } from 'react';
import ObjetosPerdidos from "./components/ObjetosPerdidos"; 
import Comentarios from "./components/Comentarios";
import Calificacion from "./components/Calificacion";
import Footer from "./components/Footer";
import Tarifas from "./components/Tarifas";
import Ayuda from "./components/Ayuda";
import MapaRuta from './components/MapaRuta';
import './App.css';


// --- Íconos SVG ---
const IconInicio = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconTarifas = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconRutas = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconHorarios = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
  </svg>
);

const IconAyuda = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01" />
  </svg>
);

const IconCalificacion = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const IconObjetos = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const IconComentarios = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  </svg>
);

const IconBuscar = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');

  return (
    <div className="app-viewport">
      <div className="browser-mockup">
        {/* Barra superior de navegación */}
        <header className="navbar">
          <div className="nav-brand">CHAPUL-GO</div>

          <nav className="nav-menu">
            <button
              className={`nav-item ${activeTab === 'inicio' ? 'active' : ''}`}
              onClick={() => setActiveTab('inicio')}
            >
              <IconInicio />
              <span>Inicio</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'tarifas' ? 'active' : ''}`}
              onClick={() => setActiveTab('tarifas')}
            >
              <IconTarifas />
              <span>Tarifas</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'rutas' ? 'active' : ''}`}
              onClick={() => setActiveTab('rutas')}
            >
              <IconRutas />
              <span>Rutas</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'horarios' ? 'active' : ''}`}
              onClick={() => setActiveTab('horarios')}
            >
              <IconHorarios />
              <span>Horarios</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'ayuda' ? 'active' : ''}`}
              onClick={() => setActiveTab('ayuda')}
            >
              <IconAyuda />
              <span>Ayuda</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'calificacion' ? 'active' : ''}`}
              onClick={() => setActiveTab('calificacion')}
            >
              <IconCalificacion />
              <span>Calificación</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'comentarios' ? 'active' : ''}`}
              onClick={() => setActiveTab('comentarios')}
            >
              <IconComentarios />
              <span>Comentarios</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'objetos' ? 'active' : ''}`}
              onClick={() => setActiveTab('objetos')}
            >
              <IconObjetos />
              <span>Objetos perdidos</span>
            </button>
          </nav>

          <div className="location-pill">
            <span className="dot">•</span> Chapulhuacán
          </div>
        </header>

        {/* --- CONTENIDO DINÁMICO --- */}

        {/* 1. Vista de Inicio */}
        {activeTab === 'inicio' && (
          <main className="content-container">
            <section className="hero-card">
              <div className="hero-text">
                <h1 className="hero-title">CHAPUL-GO</h1>
                <h2 className="hero-subtitle">Movilidad clara, segura y cercana</h2>
                <p className="hero-description">
                  Encuentra tu ruta y llega más fácil a tu destino.
                </p>
              </div>

              <div className="hero-search-container">
                <div className="search-input-wrapper">
                  <IconBuscar />
                  <input
                    type="text"
                    placeholder="Buscar ruta o parada"
                    className="search-input"
                  />
                </div>
                <button className="btn-search" onClick={() => setActiveTab('rutas')}>Buscar ruta</button>
              </div>
            </section>

            <section className="grid-cards">
              <div className="access-card" onClick={() => setActiveTab('tarifas')}>
                <div className="card-icon"><IconTarifas /></div>
                <h3 className="card-title">Tarifas</h3>
                <p className="card-sub">Consulta precios</p>
              </div>

              <div className="access-card" onClick={() => setActiveTab('rutas')}>
                <div className="card-icon"><IconRutas /></div>
                <h3 className="card-title">Rutas</h3>
                <p className="card-sub">Explora el mapa</p>
              </div>

              <div className="access-card" onClick={() => setActiveTab('horarios')}>
                <div className="card-icon"><IconHorarios /></div>
                <h3 className="card-title">Horarios</h3>
                <p className="card-sub">Mira salidas</p>
              </div>

              <div className="access-card" onClick={() => setActiveTab('ayuda')}>
                <div className="card-icon"><IconAyuda /></div>
                <h3 className="card-title">Ayuda</h3>
                <p className="card-sub">Resuelve dudas</p>
              </div>
            </section>

            <section className="status-bar">
              <div className="status-label">
                <span className="status-dot">•</span> Próximo servicio
              </div>
              <div className="status-route">El Rayo — Chapulhuacán</div>
              <div className="status-time">08:35</div>
              <div className="status-eta">En 08 min</div>
              <a href="#detalles" className="status-link">Ver detalles →</a>
            </section>
          </main>
        )}

        {/* 2. Pantallas Conectadas */}
        {activeTab === 'rutas' && <MapaRuta />}
        {activeTab === 'objetos' && <ObjetosPerdidos />}
        {activeTab === 'comentarios' && <Comentarios />}
        {activeTab === 'calificacion' && <Calificacion />}
        {activeTab === 'tarifas' && <Tarifas />}
        {activeTab === 'ayuda' && <Ayuda />}

        {/* 3. Vistas provisionales únicamente para pestañas sin componente creado */}
        {!['inicio', 'rutas', 'objetos', 'comentarios', 'calificacion', 'tarifas', 'ayuda'].includes(activeTab) && (
          <main className="content-container">
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--navy-bg)' }}>
              <h2>Sección {activeTab.toUpperCase()} en construcción</h2>
            </div>
          </main>
        )}

        {/* 4. Footer global */}
        <Footer setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
