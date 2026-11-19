import React, { useState } from 'react';
import './Calificacion.css';

// Ícono de estrella interactiva (estilo dorado como en tu referencia)
const IconStar = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill={filled ? '#f59e0b' : '#e2e8f0'}
    stroke={filled ? '#f59e0b' : '#cbd5e1'}
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

// Horarios de ejemplo asociados a su Id_Horario de la base de datos
const HORARIOS_DISPONIBLES = [
  { id: 1, texto: '08:35 · El Rayo → Chapulhuacán (Unidad A1)' },
  { id: 2, texto: '09:05 · El Rayo → Chapulhuacán (Unidad A2)' },
  { id: 3, texto: '10:20 · Chapulhuacán → Santa Ana de Allende (Unidad A3)' },
  { id: 4, texto: '11:10 · Chapulhuacán → El Rayo (Unidad A1)' },
];

export default function Calificacion() {
  // Datos del usuario (cuando conectes el login, se leerán automáticamente de localStorage)
  const nombreUsuario =
    localStorage.getItem('Nombre_User') || 'Usuario Chapul-Go';
  const idUser = Number(localStorage.getItem('Id_User')) || 1;

  // Genera las iniciales para el avatar circular (ej. "Usuario Chapul-Go" -> "UC")
  const iniciales = nombreUsuario
    .split(' ')
    .slice(0, 2)
    .map((palabra) => palabra[0]?.toUpperCase())
    .join('');

  // Estados alineados con la tabla CALIFICACION DE SERVICIO
  const [idHorario, setIdHorario] = useState('');
  const [calServicio, setCalServicio] = useState(0);
  const [hoverServicio, setHoverServicio] = useState(0);

  const [calChofer, setCalChofer] = useState(0);
  const [hoverChofer, setHoverChofer] = useState(0);

  const [comentario, setComentario] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!idHorario || calServicio === 0 || calChofer === 0) {
      setError(
        'Por favor selecciona el horario y califica tanto el servicio como al chofer.'
      );
      return;
    }

    // Objeto listo para enviar a tu API / Base de Datos
    const payload = {
      Id_User: idUser,
      Id_Horario: Number(idHorario),
      Cal_Servicio: String(calServicio), // Tipo char en tu BD ('1' a '5')
      Cal_Chofer: String(calChofer),     // Tipo char en tu BD ('1' a '5')
    };

    console.log('Datos listos para guardar en CALIFICACION DE SERVICIO:', payload);

    /* Cuando conectes tu backend, descomenta este bloque:
    await fetch('http://localhost:3000/api/calificaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    */

    setEnviado(true);
  };

  return (
    <main className="calificacion-viewport">
      <div className="rating-card">
        {/* Banner superior azul marino */}
        <div className="rating-banner" />

        {/* Avatar circular superpuesto con insignia verde */}
        <div className="avatar-section">
          <div className="avatar-circle">
            <span>{iniciales || 'CG'}</span>
            <span className="verified-badge" title="Cuenta activa">
              ✓
            </span>
          </div>

          <h3 className="user-account-name">{nombreUsuario}</h3>
          <span className="user-account-role">
            Pasajero · ID Usuario #{idUser}
          </span>
        </div>

        {/* Título principal centrado */}
        <div className="rating-intro">
          <h2 className="rating-main-question">
            ¿Cómo fue tu experiencia de viaje?
          </h2>
        </div>

        <hr className="section-divider" />

        <form onSubmit={handleSubmit} className="rating-form">
          {/* Selector de Horario (Id_Horario) */}
          <div className="form-group">
            <label htmlFor="horario" className="field-label">
              Horario y ruta del viaje
            </label>
            <select
              id="horario"
              value={idHorario}
              onChange={(e) => setIdHorario(e.target.value)}
              className="form-select"
            >
              <option value="">Selecciona el horario en el que viajaste</option>
              {HORARIOS_DISPONIBLES.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.texto}
                </option>
              ))}
            </select>
          </div>

          {/* Calificación del Servicio (Cal_Servicio) */}
          <div className="stars-block">
            <span className="stars-caption">Calificación del servicio</span>
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <IconStar
                  key={`serv-${star}`}
                  filled={star <= (hoverServicio || calServicio)}
                  onClick={() => setCalServicio(star)}
                  onMouseEnter={() => setHoverServicio(star)}
                  onMouseLeave={() => setHoverServicio(0)}
                />
              ))}
            </div>
          </div>

          {/* Calificación del Chofer (Cal_Chofer) */}
          <div className="stars-block">
            <span className="stars-caption">Calificación del chofer</span>
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <IconStar
                  key={`chof-${star}`}
                  filled={star <= (hoverChofer || calChofer)}
                  onClick={() => setCalChofer(star)}
                  onMouseEnter={() => setHoverChofer(star)}
                  onMouseLeave={() => setHoverChofer(0)}
                />
              ))}
            </div>
          </div>

          <hr className="section-divider" />

          {/* Comentario detallado (opcional, igual que en la referencia) */}
          <div className="form-group">
            <label htmlFor="comentario" className="field-label">
              Agrega una reseña detallada (opcional)
            </label>
            <textarea
              id="comentario"
              placeholder="Escribe aquí tus comentarios sobre la unidad o el operador..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="form-textarea"
              rows="3"
            />
          </div>

          {error && <div className="error-banner">{error}</div>}

          <button type="submit" className="btn-submit-rating">
            Enviar calificación
          </button>

          {enviado && (
            <div className="success-badge">
              ✓ ¡Gracias por calificar! Tu evaluación ha sido registrada.
            </div>
          )}
        </form>
      </div>
    </main>
  );
}