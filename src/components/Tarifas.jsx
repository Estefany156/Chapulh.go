import React, { useState } from 'react';
import './Tarifas.css';

// Íconos SVG
const IconSearchSquare = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <rect x="7" y="7" width="10" height="10" rx="1" />
  </svg>
);

const IconArrowsUpDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="7 15 12 20 17 15" />
    <polyline points="7 9 12 4 17 9" />
  </svg>
);

const IconRefresh = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

export default function Tarifas() {
  const [origen, setOrigen] = useState('Puerto Oscuro');
  const [destino, setDestino] = useState('Chapulhuacán');
  const [pasajeros, setPasajeros] = useState(1);
  const [resultado, setResultado] = useState({
    origen: 'Puerto Oscuro',
    destino: 'Chapulhuacán',
    precioBase: 14,
    tiempo: '35 min'
  });

  const handleConsultar = (e) => {
    e.preventDefault();
    setResultado({
      origen,
      destino,
      precioBase: 14,
      tiempo: '35 min'
    });
  };

  const precioTotal = (resultado.precioBase * pasajeros).toFixed(2);

  return (
    <main className="content-container">
      <div className="fares-wrapper">
        {/* Bloque Izquierdo: Formulario de búsqueda */}
        <div className="fares-search-card">
          <div className="fares-header">
            <IconSearchSquare />
            <h2>Busca tu tarifa</h2>
          </div>

          <form onSubmit={handleConsultar} className="fares-form">
            <div className="fares-field">
              <label className="fares-label">Origen</label>
              <div className="fares-input-icon-wrapper">
                <IconArrowsUpDown />
                <input
                  type="text"
                  value={origen}
                  onChange={(e) => setOrigen(e.target.value)}
                  className="fares-input"
                  placeholder="Lugar de origen"
                />
              </div>
            </div>

            <div className="fares-field">
              <label className="fares-label">Destino</label>
              <div className="fares-input-icon-wrapper">
                <IconArrowsUpDown />
                <input
                  type="text"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  className="fares-input"
                  placeholder="Lugar de destino"
                />
              </div>
            </div>

            <div className="fares-row-bottom">
              <div className="fares-field flex-1">
                <label className="fares-label">Usuarios</label>
                <select
                  value={pasajeros}
                  onChange={(e) => setPasajeros(Number(e.target.value))}
                  className="fares-input fares-select"
                >
                  <option value={1}>1 pasajero</option>
                  <option value={2}>2 pasajeros</option>
                  <option value={3}>3 pasajeros</option>
                  <option value={4}>4 pasajeros</option>
                </select>
              </div>

              <button type="submit" className="btn-consultar">
                Consultar
              </button>
            </div>
          </form>
        </div>

        {/* Bloque Derecho: Card de Resultado */}
        <div className="fares-result-card">
          <div className="result-top">
            <span className="result-tagline">Resultado de tarifa</span>
            <h3 className="result-route">
              {resultado.origen} → {resultado.destino}
            </h3>
          </div>

          <div className="result-price-block">
            <div className="result-price">$ {precioTotal}</div>
            <div className="result-time">Tiempo estimado: {resultado.tiempo}</div>
          </div>

          <div className="result-bottom">
            <button className="btn-view-route">
              Ver ruta →
            </button>
            <div className="result-updated">
              <IconRefresh />
              <span>Actualizado recientemente</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}