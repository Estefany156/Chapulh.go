import React from 'react';

export default function DashboardAdmin() {
  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', color: '#102a43' }}>
      
      {/* Encabezado */}
      <header style={{ marginBottom: '25px' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#102a43', fontWeight: 'bold' }}>PANEL DE CONTROL</h1>
        <p style={{ margin: '4px 0 0 0', color: '#627d98', fontSize: '0.95rem' }}>Resumen operativo y alertas del sistema</p>
      </header>

      {/* Tarjetas de Indicadores (Responsivas) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px', 
        marginBottom: '25px',
        width: '100%' 
      }}>
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '5px solid #2563eb' }}>
          <span style={{ fontSize: '0.85rem', color: '#627d98', fontWeight: 'bold' }}>Rutas activas</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '2rem', color: '#102a43' }}>12</h2>
        </div>
        
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '5px solid #2563eb' }}>
          <span style={{ fontSize: '0.85rem', color: '#627d98', fontWeight: 'bold' }}>Vehículos en servicio</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '2rem', color: '#102a43' }}>28</h2>
        </div>
        
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '5px solid #2563eb' }}>
          <span style={{ fontSize: '0.85rem', color: '#627d98', fontWeight: 'bold' }}>Objetos pendientes</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '2rem', color: '#102a43' }}>07</h2>
        </div>
      </div>

      {/* Sección Inferior: Actividad y Alertas (Se ajusta según espacio) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        width: '100%' 
      }}>
        
        {/* Actividad Reciente */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: '#102a43' }}>Actividad reciente</h3>
          
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: '#334e68' }}>
              <span>Rutas completadas</span>
              <span style={{ fontWeight: 'bold' }}>86%</span>
            </div>
            <div style={{ background: '#e2e8f0', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '86%', background: '#2563eb', height: '100%' }}></div>
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: '#334e68' }}>
              <span>Servicios puntuales</span>
              <span style={{ fontWeight: 'bold' }}>78%</span>
            </div>
            <div style={{ background: '#e2e8f0', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '78%', background: '#2563eb', height: '100%' }}></div>
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: '#334e68' }}>
              <span>Informes resueltos</span>
              <span style={{ fontWeight: 'bold' }}>61%</span>
            </div>
            <div style={{ background: '#e2e8f0', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '61%', background: '#2563eb', height: '100%' }}></div>
            </div>
          </div>

          <p style={{ margin: '20px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Última actualización: hoy, 10:42</p>
        </div>

        {/* Panel de Alertas */}
        <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: '#102a43' }}>Alertas</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: '#334e68' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#d97706' }}>⚠️</span> 2 informes en revisión
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#d97706' }}>⚠️</span> 1 combi en mantenimiento
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#16a34a' }}>✓</span> 5 comentarios respondidos
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}