import React, { useState, useEffect } from 'react';

export default function RutasAdmin() {
  const [rutas, setRutas] = useState([]);

  // Aquí simularemos la consulta a tu base de datos/API para la tabla RUTAS
  useEffect(() => {
    // Datos simulados basados en tu wireframe de Rutas Registradas
    const dataMock = [
      { Id_Ruta: 1, Nombre_Ruta: 'Route 1: Chapu-el rayo', Tiempo_Estimado: '35 min', Distancia: '12 km', Estatus: 'Activa' },
      { Id_Ruta: 2, Nombre_Ruta: 'Route 2: Market Express', Tiempo_Estimado: '20 min', Distancia: '8 km', Estatus: 'Activa' },
      { Id_Ruta: 3, Nombre_Ruta: 'Route 3: South Community', Tiempo_Estimado: '48 min', Distancia: '18 km', Estatus: 'Pausa' }
    ];
    setRutas(dataMock);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* Encabezado de la pantalla idéntico a tu wireframe */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#102a43', fontSize: '1.5rem' }}>RUTAS REGISTRADAS</h1>
          <p style={{ margin: '4px 0 0 0', color: '#627d98', fontSize: '0.9rem' }}>Gestión de recorridos</p>
        </div>
        <button style={{ backgroundColor: '#102a43', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Agregar nuevo
        </button>
      </div>

      {/* Filtros de búsqueda y estado */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Buscar..." 
          style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e0', width: '250px' }} 
        />
        <select style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e0' }}>
          <option value="">Estado</option>
          <option value="Activa">Activa</option>
          <option value="Pausa">Pausa</option>
        </select>
      </div>

      {/* Tabla de datos conectada visualmente a tus atributos */}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ padding: '12px 16px', color: '#334e68' }}>Nombre de ruta</th>
            <th style={{ padding: '12px 16px', color: '#334e68' }}>Tiempo estimado</th>
            <th style={{ padding: '12px 16px', color: '#334e68' }}>Distancia</th>
            <th style={{ padding: '12px 16px', color: '#334e68' }}>Estado</th>
            <th style={{ padding: '12px 16px', color: '#334e68' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((r) => (
            <tr key={r.Id_Ruta} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px 16px', color: '#334e68' }}>{r.Nombre_Ruta}</td>
              <td style={{ padding: '12px 16px', color: '#334e68' }}>{r.Tiempo_Estimado}</td>
              <td style={{ padding: '12px 16px', color: '#334e68' }}>{r.Distancia}</td>
              <td style={{ padding: '12px 16px', fontWeight: 'bold', color: r.Estatus === 'Activa' ? '#2e7d32' : '#c62828' }}>
                {r.Estatus}
              </td>
              <td style={{ padding: '12px 16px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px' }}>🗑️</button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✏️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}