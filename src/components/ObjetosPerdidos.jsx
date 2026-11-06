import React, { useState } from 'react';
import './ObjetosPerdidos.css';



// Íconos pequeños para los campos del formulario
const FieldIcon = ({ d }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function ObjetosPerdidos() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    objeto: '',
    ruta: '',
    lugar: '',
    fecha: '',
    hora: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reporte enviado:', formData);
  };

  return (

        /* Formulario de Objetos Perdidos */
        <main className="content-container">
          <div className="badge-pill">Objeto perdido</div>

          <form onSubmit={handleSubmit} className="lost-found-form">
            <div className="form-grid">
              {/* Columna 1 - Fila 1 */}
              <div className="form-group">
                <label className="form-label">
                  <FieldIcon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Escribe aquí..."
                  value={formData.nombre}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Columna 2 - Fila 1 */}
              <div className="form-group">
                <label className="form-label">
                  <FieldIcon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Escribe aquí..."
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Columna 1 - Fila 2 */}
              <div className="form-group">
                <label className="form-label">
                  <FieldIcon d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  Teléfono de contacto
                </label>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Escribe aquí..."
                  value={formData.telefono}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Columna 2 - Fila 2 */}
              <div className="form-group">
                <label className="form-label">
                  <FieldIcon d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  ¿Qué objeto perdiste?
                </label>
                <input
                  type="text"
                  name="objeto"
                  placeholder="Escribe aquí..."
                  value={formData.objeto}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Columna 1 - Fila 3 */}
              <div className="form-group">
                <label className="form-label">
                  <FieldIcon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                  Ruta o unidad
                </label>
                <input
                  type="text"
                  name="ruta"
                  placeholder="Escribe aquí..."
                  value={formData.ruta}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Columna 2 - Fila 3 */}
              <div className="form-group">
                <label className="form-label">
                  <FieldIcon d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z M12 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                  Lugar donde lo perdiste
                </label>
                <input
                  type="text"
                  name="lugar"
                  placeholder="Escribe aquí..."
                  value={formData.lugar}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Columna 1 - Fila 4 */}
              <div className="form-group">
                <label className="form-label">
                  <FieldIcon d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18" />
                  Fecha del viaje
                </label>
                <input
                  type="text"
                  name="fecha"
                  placeholder="Escribe aquí..."
                  value={formData.fecha}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Columna 2 - Fila 4 */}
              <div className="form-group">
                <label className="form-label">
                  <FieldIcon d="M12 8v4l3 3 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                  Hora aproximada
                </label>
                <input
                  type="text"
                  name="hora"
                  placeholder="Escribe aquí..."
                  value={formData.hora}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Fila Completa - Descripción */}
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

            <button type="submit" className="btn-submit">
              Enviar reporte
            </button>
          </form>
        </main>
      );
    }