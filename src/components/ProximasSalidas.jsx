import React, { useState } from 'react';
import './ProximaSalidas.css';

const SALIDA_DESTACADA_INICIAL = {
  origen: 'El Rayo',
  destino: 'Chapulhuacán',
  hora: '08:35',
  minutosRestantes: '05',
  unidad: 'A1',
  estado: 'En ruta ',
  progreso: 68,
};

const SIGUIENTES_SALIDAS = [
  {
    id: 1,
    hora: '08:50',
    origen: 'Chapulhuacán',
    destino: 'Santa Ana',
    unidad: 'A2',
  },
  {
    id: 2,
    hora: '09:10',
    origen: 'El Rayo',
    destino: 'Chapulhuacán',
    unidad: 'A1',
  },
];

const BackIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const RefreshIcon = ({ spinning }) => (
  <svg
    className={`ps-refresh-icon ${spinning ? 'ps-spin' : ''}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
    <polyline points="21 3 21 8 16 8" />
  </svg>
);

const BusIcon = () => (
  <svg
    className="ps-bus-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="3" width="16" height="15" rx="3" />
    <path d="M4 11h16" />
    <path d="M8 15h.01" />
    <path d="M16 15h.01" />
    <path d="M6 18v2" />
    <path d="M18 18v2" />
  </svg>
);

const obtenerFechaActual = () => {
  const fecha = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return fecha.charAt(0).toUpperCase() + fecha.slice(1);
};

export default function ProximasSalidas({ onBack }) {
  const [salidaActual] = useState(SALIDA_DESTACADA_INICIAL);
  const [actualizando, setActualizando] = useState(false);
  const [estadoActualizacion, setEstadoActualizacion] =
    useState('Actualizado ahora');

  const fechaHoy = obtenerFechaActual();

  const irAPaginaPrincipal = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = '/';
    }
  };

  const handleActualizar = () => {
    setActualizando(true);
    setEstadoActualizacion('Actualizando...');

    setTimeout(() => {
      setActualizando(false);
      setEstadoActualizacion('Actualizado ahora');
    }, 600);
  };

  return (
    <div className="ps-wrapper">
      {/* Encabezado superior con botón de regreso */}
      <div className="ps-header">
        <div className="ps-header-left">
          <button
            type="button"
            className="ps-back-btn"
            onClick={irAPaginaPrincipal}
            aria-label="Volver a la página principal"
            title="Volver a la página principal"
          >
            <BackIcon />
          </button>

          <div>
            <span className="ps-eyebrow"></span>
            <h1 className="ps-title">Próximas salidas</h1>
          </div>
        </div>
      </div>

      {/* Tarjeta principal destacada */}
      <section className="ps-featured-card">
        <div className="ps-featured-top">
          <div className="ps-route-badge">
            <span className="ps-route-origin">{salidaActual.origen}</span>
            <span className="ps-route-arrow">→</span>
            <span className="ps-route-dest">{salidaActual.destino}</span>
          </div>

          <button
            type="button"
            className="ps-refresh-btn"
            onClick={handleActualizar}
          >
            <RefreshIcon spinning={actualizando} />
            <span>{estadoActualizacion}</span>
          </button>
        </div>

        <div className="ps-featured-main">
          <div className="ps-time-block">
            <span className="ps-time-label">Hora programada</span>
            <div className="ps-time-value">{salidaActual.hora}</div>
          </div>

          <div className="ps-meta-pills">
            <div className="ps-eta-pill">
              <span className="ps-pulse-dot" />
              Sale en {salidaActual.minutosRestantes} min
            </div>

            <div className="ps-unit-pill">
              <BusIcon />
              <span>Unidad {salidaActual.unidad}</span>
            </div>
          </div>
        </div>

        {/* Barra de progreso del recorrido */}
        <div className="ps-progress-box">
          <div className="ps-progress-header">
            <span>Progreso del recorrido</span>
            <span className="ps-status-text">{salidaActual.estado}</span>
          </div>

          <div className="ps-progress-track">
            <div
              className="ps-progress-fill"
              style={{ width: `${salidaActual.progreso}%` }}
            />
          </div>

          <div className="ps-progress-endpoints">
            <div className="ps-endpoint">
              <span className="ps-endpoint-dot active" />
              <span>{salidaActual.origen}</span>
            </div>
            <div className="ps-endpoint">
              <span>{salidaActual.destino}</span>
              <span className="ps-endpoint-dot" />
            </div>
          </div>
        </div>
      </section>

      {/* Tarjeta inferior: Siguientes salidas + Fecha del día */}
      <section className="ps-next-card">
        <div className="ps-next-header">
          <div>
            <h2 className="ps-next-title">Siguientes salidas</h2>
            <p className="ps-next-subtitle">Horarios próximos disponibles hoy</p>
          </div>

          <div className="ps-today-badge">
            <span className="ps-today-value">{fechaHoy}</span>
          </div>
        </div>

        <div className="ps-next-list">
          {SIGUIENTES_SALIDAS.map((item) => (
            <div key={item.id} className="ps-next-row">
              <div className="ps-next-time-box">
                <span className="ps-next-time">{item.hora}</span>
              </div>

              <div className="ps-next-route-info">
                <span className="ps-next-route">
                  {item.origen} <span className="ps-route-arrow">→</span>{' '}
                  {item.destino}
                </span>
                <span className="ps-next-unit">Unidad {item.unidad}</span>
              </div>

              <span className="ps-next-status">Programada</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}