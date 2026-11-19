import React, { useState } from 'react';
import './ObjetosPerdidos.css';

const API_URL = import.meta.env?.VITE_BACKEND_URL || 'http://localhost:3000/api';

const FieldIcon = ({ d }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

export default function ObjetosPerdidos() {
  const initialFormState = {
    objeto: '',
    ruta: '',
    lugar: '',
    fecha: '',
    hora: '',
    descripcion: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Controla la ventana emergente al entrar a la pantalla
  const [mostrarAviso, setMostrarAviso] = useState(true);

  // Datos de sesión (se conectarán automáticamente cuando guardes estos datos en el Login)
  const nombreUsuario =
    localStorage.getItem('Nombre_User') || 'Usuario Chapul-Go';
  const idUserSesion = Number(localStorage.getItem('Id_User')) || 1;

  // Genera las iniciales para el avatar circular (ej. "Usuario Chapul-Go" -> "UC")
  const iniciales = nombreUsuario
    .split(' ')
    .slice(0, 2)
    .map((palabra) => palabra[0]?.toUpperCase())
    .join('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: '', texto: '' });

    const payload = {
      Descripcion: `Objeto: ${formData.objeto}. Ruta: ${formData.ruta}. Lugar: ${formData.lugar}. Fecha/Hora: ${formData.fecha} ${formData.hora}. Detalle: ${formData.descripcion}`,
      Id_User: idUserSesion,
      Id_Horario: 1, // Reemplazar por el Id_Horario correspondiente
    };

    try {
      const response = await fetch(`${API_URL}/cosas-perdidas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMensaje({ tipo: 'exito', texto: '✓ ¡Reporte guardado con éxito!' });
        setFormData(initialFormState);
      } else {
        throw new Error('Error al guardar el reporte en la base de datos');
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="objetos-viewport">
      {/* Ventana modal de aviso al ingresar */}
      {mostrarAviso && (
        <div className="aviso-overlay" role="dialog" aria-modal="true">
          <div className="aviso-modal">
            <div className="aviso-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h3 className="aviso-title">Aviso importante</h3>
            <p className="aviso-text">
              <strong>Chapul-Go</strong> no se hace responsable por objetos
              perdidos u olvidados dentro de las unidades; nuestra función es
              únicamente realizar el reporte correspondiente.
            </p>

            <button
              type="button"
              className="aviso-btn"
              onClick={() => setMostrarAviso(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Tarjeta principal con estilo de perfil */}
      <div className="objetos-card">
        {/* Banner superior azul marino */}
        <div className="objetos-banner" />

        {/* Avatar circular superpuesto con datos de la cuenta */}
        <div className="avatar-section">
          <div className="avatar-circle">
            <span>{iniciales || 'CG'}</span>
            <span className="verified-badge" title="Cuenta activa">
              ✓
            </span>
          </div>

          <h3 className="user-account-name">{nombreUsuario}</h3>
          <span className="user-account-role">
            Pasajero · ID Usuario #{idUserSesion}
          </span>
        </div>

        {/* Encabezado y texto breve centrado */}
        <div className="lost-found-intro">
          <h1 className="lost-found-title">Reporta un objeto extraviado</h1>
          <p className="lost-found-subtitle">
            ¿Olvidaste alguna pertenencia durante tu viaje? Completa los
            siguientes datos con la mayor precisión posible para registrar tu
            reporte.
          </p>
        </div>

        <hr className="section-divider" />

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="lost-found-form">
          <div className="form-grid">
            {/* Fila 1 - Objeto y Ruta */}
            <div className="form-group">
              <label className="form-label">
                <FieldIcon d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                ¿Qué objeto perdiste?
              </label>
              <input
                type="text"
                name="objeto"
                placeholder="Ej. Mochila, Celular..."
                value={formData.objeto}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FieldIcon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                Ruta o unidad
              </label>
              <input
                type="text"
                name="ruta"
                placeholder="Ej. El Rayo → Chapulhuacán, Unidad A1"
                value={formData.ruta}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Fila 2 - Lugar y Fecha */}
            <div className="form-group">
              <label className="form-label">
                <FieldIcon d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z M12 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                Lugar donde lo perdiste
              </label>
              <input
                type="text"
                name="lugar"
                placeholder="Ej. Asiento trasero, Base Chapulhuacán"
                value={formData.lugar}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FieldIcon d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18" />
                Fecha del viaje
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Fila 3 - Hora */}
            <div className="form-group full-width">
              <label className="form-label">
                <FieldIcon d="M12 8v4l3 3 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                Hora aproximada
              </label>
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Fila 4 - Descripción detallada */}
            <div className="form-group full-width">
              <label className="form-label">
                <FieldIcon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />
                Describe el objeto
              </label>
              <textarea
                name="descripcion"
                placeholder="Incluye color, marca, tamaño o características únicas..."
                value={formData.descripcion}
                onChange={handleChange}
                className="form-textarea"
                rows="4"
              />
            </div>
          </div>

          {mensaje.texto && (
            <div
              className={`feedback-banner ${
                mensaje.tipo === 'exito' ? 'feedback-success' : 'feedback-error'
              }`}
            >
              {mensaje.texto}
            </div>
          )}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Enviando reporte...' : 'Enviar reporte'}
          </button>
        </form>
      </div>
    </main>
  );
}