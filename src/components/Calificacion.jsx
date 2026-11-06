import React, { useState } from 'react';
import './Calificacion.css';

// Ícono de estrella interactiva
const IconStar = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 24 24"
    fill={filled ? "#0b1736" : "none"}
    stroke="#0b1736"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="star-icon"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Íconos SVG para los campos del formulario
const IconMessage = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconSpark = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
  </svg>
);

const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function Calificacion() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comentario, setComentario] = useState('');
  const [ruta, setRuta] = useState('');
  const [fecha, setFecha] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Calificación enviada:', { rating, comentario, ruta, fecha });
    setEnviado(true);
  };

  return (
    <main className="content-container">
      {/* Encabezado */}
      <div className="rating-header">
        <h2 className="rating-title">
          <span className="star-title-icon">★</span> ¿Cómo fue tu experiencia de viaje?
        </h2>
        <p className="rating-subtitle">Selecciona una calificación de 1 a 5 estrellas</p>
      </div>

      {/* Selector de Estrellas */}
      <div className="stars-section">
        <div className="stars-row">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="star-item">
              <IconStar
                filled={star <= (hoverRating || rating)}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
              {star === 1 && <span className="star-label">Muy malo</span>}
              {star === 5 && <span className="star-label">Excelente</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="rating-form">
        <div className="form-group full-width">
          <label className="form-label">
            <IconMessage />
            Cuéntanos más sobre tu experiencia
          </label>
          <textarea
            placeholder="Comentario opcional..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="form-textarea"
            rows="3"
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">
              <IconSpark />
              Selecciona la ruta
            </label>
            <select
              value={ruta}
              onChange={(e) => setRuta(e.target.value)}
              className="form-input form-select"
            >
              <option value="">Elige una ruta</option>
              <option value="el-rayo">El Rayo — Chapulhuacán</option>
              <option value="centro">Centro — Santa Ana</option>
              <option value="mercado">Mercado — Estación</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <IconCalendar />
              Fecha del viaje
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Botón de envío e insignia de éxito */}
        <div className="rating-footer">
          <button type="submit" className="btn-submit">
            Enviar calificación
          </button>

          {enviado && (
            <div className="success-badge">
              ✓ ¡Gracias por calificar!
            </div>
          )}
        </div>
      </form>
    </main>
  );
}