import React, { useState } from 'react';
import './Filtro.css';

const SALIDAS_INICIALES = [
  {
    id: 1,
    hora: '08:35',
    codigo: 'A1',
    ruta: 'El Rayo → Chapulhuacán',
    dia: 'Hoy',
  },
  {
    id: 2,
    hora: '09:05',
    codigo: 'A2',
    ruta: 'El Rayo → Chapulhuacán',
    dia: 'Hoy',
  },
  {
    id: 3,
    hora: '10:20',
    codigo: 'A3',
    ruta: 'Chapulhuacán → Santa Ana de Allende',
    dia: 'Hoy',
  },
  {
    id: 4,
    hora: '11:10',
    codigo: 'A1',
    ruta: 'Chapulhuacán → El Rayo',
    dia: 'Hoy',
  },
];

const ClockIcon = () => (
  <svg
    className="clock-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </svg>
);

export default function SalidasScreen({ compacto = false, onClose }) {
  const [rutaFiltro, setRutaFiltro] = useState('Todas las rutas');
  const [horaDesde] = useState('08:00');
  const [horaHasta] = useState('12:00');
  const [diaFiltro, setDiaFiltro] = useState('Hoy');

  const [salidasFiltradas, setSalidasFiltradas] = useState(SALIDAS_INICIALES);
  const [salidaSeleccionada, setSalidaSeleccionada] = useState(1);

  const handleAplicarFiltros = (e) => {
    e.preventDefault();

    const filtradas = SALIDAS_INICIALES.filter((item) => {
      const coincideRuta =
        rutaFiltro === 'Todas las rutas' || item.ruta === rutaFiltro;
      const coincideDia = item.dia === diaFiltro;
      const coincideDesde = !horaDesde || item.hora >= horaDesde;
      const coincideHasta = !horaHasta || item.hora <= horaHasta;

      return coincideRuta && coincideDia && coincideDesde && coincideHasta;
    });

    setSalidasFiltradas(filtradas);
    if (filtradas.length > 0) {
      setSalidaSeleccionada(filtradas[0].id);
    }
  };

  const renderFormulario = () => (
    <>
      <div className="filter-card-header">
        <h2 className="card-title">Filtrar salidas</h2>

        {compacto && onClose && (
          <button
            type="button"
            className="btn-close-filtro"
            onClick={onClose}
            title="Cerrar"
            aria-label="Cerrar filtro"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <form onSubmit={handleAplicarFiltros}>
        <div className="filters-row">
          <div className="filter-group">
            <label htmlFor={compacto ? 'ruta-hero' : 'ruta'} className="filter-label">
              Ruta
            </label>
            <div className="select-wrapper">
              <select
                id={compacto ? 'ruta-hero' : 'ruta'}
                className="filter-control"
                value={rutaFiltro}
                onChange={(e) => setRutaFiltro(e.target.value)}
              >
                <option value="Todas las rutas">Todas las rutas</option>
                <option value="El Rayo → Chapulhuacán">
                  El Rayo → Chapulhuacán
                </option>
                <option value="Chapulhuacán → El Rayo">
                  Chapulhuacán → El Rayo
                </option>
                <option value="Chapulhuacán → Santa Ana de Allende">
                  Chapulhuacán → Santa Ana de Allende
                </option>
              </select>
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor={compacto ? 'dia-hero' : 'dia'} className="filter-label">
              Día
            </label>
            <div className="select-wrapper">
              <select
                id={compacto ? 'dia-hero' : 'dia'}
                className="filter-control"
                value={diaFiltro}
                onChange={(e) => setDiaFiltro(e.target.value)}
              >
                <option value="Hoy">Hoy</option>
                <option value="Mañana">Mañana</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-aplicar">
          Aplicar filtros
        </button>
      </form>
    </>
  );

  const renderResultados = () => (
    <>
      <div className="results-header">
        <h2 className="card-title">Salidas disponibles</h2>
        <span className="results-count">
          {salidasFiltradas.length}{' '}
          {salidasFiltradas.length === 1 ? 'resultado' : 'resultados'}
        </span>
      </div>

      <div className="salidas-list">
        {salidasFiltradas.map((salida) => {
          const isSelected = salida.id === salidaSeleccionada;

          return (
            <div
              key={salida.id}
              className={`salida-item ${isSelected ? 'selected' : ''}`}
              onClick={() => setSalidaSeleccionada(salida.id)}
            >
              <div className="salida-time-col">
                <ClockIcon />
                <span className="salida-time">{salida.hora}</span>
              </div>

              <div className="salida-code-col">{salida.codigo}</div>

              <div className="salida-route-col">{salida.ruta}</div>
            </div>
          );
        })}
      </div>
    </>
  );

  if (compacto) {
    return (
      <div className="salidas-container salidas-compact">
        <section className="card unified-filter-card">
          <div className="unified-filter-top">{renderFormulario()}</div>
          <div className="unified-filter-divider" />
          <div className="unified-filter-bottom">{renderResultados()}</div>
        </section>
      </div>
    );
  }

  return (
    <div className="salidas-container">
      <section className="card">{renderFormulario()}</section>
      <section className="card">{renderResultados()}</section>
    </div>
  );
}