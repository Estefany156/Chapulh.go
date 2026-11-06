import React, { useState } from 'react';
import './Comentarios.css'; // Archivo CSS con el nuevo nombre

const IconUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconMessage = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="7" y1="8" x2="17" y2="8" />
    <line x1="7" y1="12" x2="17" y2="12" />
    <line x1="7" y1="16" x2="13" y2="16" />
  </svg>
);

export default function Comentarios() {
  const [tipo, setTipo] = useState('comentario');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Comentario/Sugerencia enviada:', { tipo, ...formData });
  };

  return (
    <main className="content-container">
      <div className="feedback-header">
        <h2 className="feedback-title">
          <span className="sparkle">✦</span> Comentarios y sugerencias
        </h2>
        <p className="feedback-subtitle">Comparte tu experiencia en un solo formulario</p>
      </div>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="toggle-group">
          <button
            type="button"
            className={`toggle-btn ${tipo === 'comentario' ? 'active' : ''}`}
            onClick={() => setTipo('comentario')}
          >
            <span className="radio-icon">{tipo === 'comentario' ? '◉' : '○'}</span> Comentario
          </button>

          <button
            type="button"
            className={`toggle-btn ${tipo === 'sugerencia' ? 'active' : ''}`}
            onClick={() => setTipo('sugerencia')}
          >
            <span className="radio-icon">{tipo === 'sugerencia' ? '◉' : '○'}</span> Sugerencia
          </button>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">
              <IconUser />
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Escribe tu nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <IconMail />
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="nombre@correo.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">
              <IconMessage />
              Escribe tu comentario o sugerencia
            </label>
            <textarea
              name="mensaje"
              placeholder="Cuéntanos cómo podemos mejorar..."
              value={formData.mensaje}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
            />
          </div>
        </div>

        <div className="feedback-footer">
          <span className="thanks-text">Gracias por compartir tu opinión</span>
          <button type="submit" className="btn-submit">
            {tipo === 'comentario' ? 'Enviar comentario' : 'Enviar sugerencia'}
          </button>
        </div>
      </form>
    </main>
  );
}