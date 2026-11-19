import React, { useState } from 'react';
import ObjetosPerdidos from './components/ObjetosPerdidos';
import Comentarios from './components/Comentarios';
import Calificacion from './components/Calificacion';
import Footer from './components/Footer';
import Tarifas from './components/Tarifas';
import MapaRuta from './components/MapaRuta';
import ProximasSalidas from './components/ProximasSalidas';
import Filtro from './components/Filtro';
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

const IconCalificacion = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const IconBuscar = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
  </svg>
);

const IconProximasSalidas = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
  </svg>
);

const IconObjetos = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="7" width="18" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

// Silueta minimalista (círculo superior + arco inferior abierto) en color blanco
const IconSiluetaUsuario = () => (
  <svg width="25" height="25" fill="none" stroke="#ffffff" strokeWidth="2.1" viewBox="0 0 24 24">
    <circle cx="12" cy="7.5" r="4.2" />
    <path strokeLinecap="round" d="M4.5 20.5a7.5 7.5 0 0115 0" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [mostrarTarifas, setMostrarTarifas] = useState(false);
  const [filtroAbierto, setFiltroAbierto] = useState(false);

  const navegarA = (tab) => {
    if (tab === 'tarifas') {
      setMostrarTarifas(true);
      return;
    }
    setMostrarTarifas(false);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const salidasDestacadas = [
    {
      id: 1,
      estado: 'Próximo servicio',
      activo: true,
      ruta: 'El Rayo → Chapulhuacán',
      hora: '08:35',
      tiempoRestante: 'En 08 min',
    },
    {
      id: 2,
      estado: 'Siguiente salida',
      activo: false,
      ruta: 'Chapulhuacán → El Rayo',
      hora: '09:05',
      tiempoRestante: 'En 38 min',
    },
    {
      id: 3,
      estado: 'Programada',
      activo: false,
      ruta: 'El Rayo → Chapulhuacán',
      hora: '09:35',
      tiempoRestante: 'En 1 h 08 min',
    },
  ];

  return (
    <div className="app-viewport">
      {/* Barra superior de navegación */}
      <header className="navbar">
        <div className="navbar-inner">
          <button
            type="button"
            className="nav-brand"
            onClick={() => navegarA('inicio')}
          >
            CHAPUL-GO
          </button>

          <nav className="nav-menu">
            <button
              type="button"
              className={`nav-item ${activeTab === 'inicio' && !mostrarTarifas ? 'active' : ''}`}
              onClick={() => navegarA('inicio')}
            >
              <IconInicio />
              <span>Inicio</span>
            </button>
            <button
              type="button"
              className={`nav-item ${activeTab === 'objetos' && !mostrarTarifas ? 'active' : ''}`}
              onClick={() => navegarA('objetos')}
            >
              <IconObjetos />
              <span>Objetos perdidos</span>
            </button>
            <button
              type="button"
              className={`nav-item ${activeTab === 'calificacion' && !mostrarTarifas ? 'active' : ''}`}
              onClick={() => navegarA('calificacion')}
            >
              <IconCalificacion />
              <span>Calificación</span>
            </button>
            <button
              type="button"
              className={`nav-item ${activeTab === 'rutas' && !mostrarTarifas ? 'active' : ''}`}
              onClick={() => navegarA('rutas')}
            >
              <IconRutas />
              <span>Rutas</span>
            </button>
          </nav>

          {/* Botón solo con la silueta en blanco (sin redirección) */}
          <button
            type="button"
            className="btn-account-silhouette"
            aria-label="Perfil de usuario"
          >
            <IconSiluetaUsuario />
          </button>
        </div>
      </header>

      {/* --- PANTALLA DE INICIO --- */}
      {activeTab === 'inicio' && (
        <>
          <main className="content-container">
            {/* Banner Hero */}
            <section className="hero-card">
              <div className="hero-text">
                <h1 className="hero-title">CHAPUL-GO</h1>
                <h2 className="hero-subtitle">Movilidad clara, segura y cercana</h2>
                <p className="hero-description">
                  Encuentra tu ruta y llega más fácil a tu destino. Filtra horarios y salidas disponibles al instante.
                </p>

                <div className="hero-quick-cards">
                  <div
                    className="hero-tarifas-card"
                    onClick={() => navegarA('tarifas')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navegarA('tarifas')}
                  >
                    <div className="card-icon"><IconTarifas /></div>
                    <h3 className="card-title">Tarifas</h3>
                    <p className="card-sub">Consulta precios</p>
                  </div>

                  <div
                    className="hero-tarifas-card"
                    onClick={() => navegarA('proximas-salidas')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navegarA('proximas-salidas')}
                  >
                    <div className="card-icon"><IconProximasSalidas /></div>
                    <h3 className="card-title">Próximas salidas</h3>
                    <p className="card-sub">Consulta horarios</p>
                  </div>
                </div>
              </div>

              {!filtroAbierto ? (
                <button
                  type="button"
                  className="btn-open-filtro"
                  onClick={() => setFiltroAbierto(true)}
                >
                  <IconBuscar />
                  <span>Buscar ruta</span>
                </button>
              ) : (
                <div className="hero-filter-wrapper">
                  <Filtro compacto onClose={() => setFiltroAbierto(false)} />
                </div>
              )}
            </section>

            {/* Casilla transparente (Glassmorphism) con Próximo servicio y salidas extra */}
            <section className="glass-departures-card">
              {salidasDestacadas.map((salida) => (
                <div key={salida.id} className="glass-departure-row">
                  <div className={`status-label ${salida.activo ? 'is-next' : 'is-scheduled'}`}>
                    <span className="status-dot">•</span> {salida.estado}
                  </div>
                  <div className="status-route">{salida.ruta}</div>
                  <div className="status-time">{salida.hora}</div>
                  <div className="status-eta">{salida.tiempoRestante}</div>
                  <button
                    type="button"
                    className="status-link"
                    onClick={() => navegarA('proximas-salidas')}
                  >
                    Ver detalles →
                  </button>
                </div>
              ))}
            </section>
          </main>

          {/* Sección Azul de Mapa de Ruta + Información de Chapulhuacán */}
          <section className="blue-showcase-section">
            <div className="blue-showcase-inner">
              <h2 className="showcase-heading map-heading">
                Mapa de Ruta: Chapulhuacán — El Rayo
              </h2>

              <div className="embedded-map-wrapper">
                <MapaRuta />
              </div>

              <div className="chapulhuacan-info-block">
                <h3 className="chapulhuacan-info-title">Acerca de Chapulhuacán</h3>
                <p className="chapulhuacan-info-text">
                  Habitada desde el siglo XV por pueblos chichimecas-pames y fundada en el siglo XVI por grupos chichimecas, otomíes y mexicas, la región formó parte de un extenso señorío junto con Jaltocán, Mecatlán, Cuesco, Tamazunchale, Huehuetla y Coxcatlán. Tras registrarse como ayuntamiento en 1826 y 1827, el 12 de julio de 1877 Chapulhuacán fue elevado oficialmente a la categoría de municipio.
                </p>
                <p className="chapulhuacan-info-text">
                  Situado en la Sierra Gorda (20°9′33.904″ N, 98°54′16.515″ O, a 922 m s. n. m.), posee un relieve predominantemente serrano dentro de la Sierra Madre Oriental y la subprovincia del Carso Huasteco. En hidrología pertenece a la región del Pánuco y a la cuenca del río Moctezuma, presentando un clima semicálido húmedo con lluvias abundantes propias de la sierra.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* --- PANTALLAS CONECTADAS --- */}
      {activeTab === 'rutas' && <MapaRuta />}
      {activeTab === 'objetos' && <ObjetosPerdidos />}
      {activeTab === 'comentarios' && <Comentarios />}
      {activeTab === 'calificacion' && <Calificacion />}
      {activeTab === 'proximas-salidas' && <ProximasSalidas />}
      {activeTab === 'filtro' && <Filtro />}

      {/* --- VENTANA FLOTANTE DE TARIFAS --- */}
      {mostrarTarifas && (
        <Tarifas
          onClose={() => setMostrarTarifas(false)}
          onVerRuta={() => navegarA('rutas')}
        />
      )}

      {/* Footer global */}
      <Footer setActiveTab={navegarA} />
    </div>
  );
}