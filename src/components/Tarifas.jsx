import React, { useState, useEffect } from 'react';
import './Tarifas.css';

// --- Íconos SVG ---
const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconSwap = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const IconPinOrigin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="3" />
    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
  </svg>
);

const IconPinDest = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </svg>
);

const IconInfo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default function Tarifas({ onClose, onVerRuta }) {
  const [visible, setVisible] = useState(true);
  const [origen, setOrigen] = useState('Puerto Oscuro');
  const [destino, setDestino] = useState('Chapulhuacán');
  const [pasajeros, setPasajeros] = useState(1);
  const [precioBase] = useState(14);
  const [tiempo] = useState('35 min');

  const cerrarVentana = () => {
    if (onClose) {
      onClose();
    } else {
      setVisible(false);
    }
  };

  const irAlMapa = () => {
    if (onVerRuta) {
      onVerRuta();
    } else {
      cerrarVentana();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        cerrarVentana();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!visible) return null;

  const intercambiarRuta = () => {
    const temp = origen;
    setOrigen(destino);
    setDestino(temp);
  };

  const totalCalculado = (precioBase * pasajeros).toFixed(2);
  const [enteros, decimales] = totalCalculado.split('.');

  return (
    <div
      className="tf-overlay"
      onClick={cerrarVentana}
      role="dialog"
      aria-modal="true"
      aria-label="Detalles de tarifa"
    >
      <div
        className="tf-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera superior azul marino con botón X */}
        <div className="tf-hero-header">
          <button
            type="button"
            className="tf-close-btn"
            onClick={cerrarVentana}
            aria-label="Cerrar ventana"
            title="Cerrar"
          >
            <IconClose />
          </button>

          <span className="tf-step-pill">TARIFA DE VIAJE</span>
          <h2 className="tf-hero-title">Detalles del traslado</h2>
        </div>

        {/* Franja azul marino medio con ruta A ⇄ B */}
        <div className="tf-route-bar">
          <div className="tf-point">
            <div className="tf-point-text">
              <span className="tf-city">{origen || 'Origen'}</span>
              <span className="tf-sub">SALIDA</span>
            </div>
          </div>

          <button
            type="button"
            className="tf-swap-btn"
            onClick={intercambiarRuta}
            title="Invertir origen y destino"
          >
            <IconSwap />
          </button>

          <div className="tf-point">

            <div className="tf-point-text">
              <span className="tf-city">{destino || 'Destino'}</span>
              <span className="tf-sub">LLEGADA</span>
            </div>
          </div>
        </div>

        {/* Lista de campos editables */}
        <div className="tf-body">
          <div className="tf-row">
            <div className="tf-row-label">
              <IconPinOrigin />
              <span>Origen:</span>
            </div>
            <input
              type="text"
              className="tf-row-input"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              placeholder="Escribe origen"
            />
          </div>

          <div className="tf-row">
            <div className="tf-row-label">
              <IconPinDest />
              <span>Destino:</span>
            </div>
            <input
              type="text"
              className="tf-row-input"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Escribe destino"
            />
          </div>

          <div className="tf-row">
            <div className="tf-row-label">
              <IconUsers />
              <span>Pasajeros:</span>
            </div>
            <select
              className="tf-row-select"
              value={pasajeros}
              onChange={(e) => setPasajeros(Number(e.target.value))}
            >
              <option value={1}>1 pasajero</option>
              <option value={2}>2 pasajeros</option>
              <option value={3}>3 pasajeros</option>
              <option value={4}>4 pasajeros</option>
              <option value={5}>5 pasajeros</option>
            </select>
          </div>

          <div className="tf-row">
            <div className="tf-row-label">
              <IconClock />
              <span>Tiempo est.:</span>
            </div>
            <span className="tf-row-value">{tiempo}</span>
          </div>
        </div>

        {/* Sección Total en azul cielo claro */}
        <div className="tf-total-band">
          <span className="tf-total-label">Total</span>
          <div className="tf-total-amount">
            <span className="tf-currency">$</span>
            <span className="tf-amount-int">{enteros}</span>
            <span className="tf-amount-dec">,{decimales}</span>
          </div>
        </div>

        

        
      </div>
    </div>
  );
}