import React from 'react';

export default function DashboardAdmin() {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'sans-serif', color: '#102a43' }}>
      
      {/* Encabezado */}
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#102a43', fontWeight: 'bold' }}>PANEL DE CONTROL</h1>
        <p style={{ margin: '6px 0 0 0', color: '#627d98', fontSize: '0.95rem' }}>Resumen operativo y alertas del sistema</p>
      </header>

      {/* Tarjetas Superiores (Ocupan el ancho de forma flexible) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '30px' }}>
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '5px solid #2563eb' }}>
          <span style={{ fontSize: '0.9rem', color: '#627d98', fontWeight: '500' }}>Rutas activas</span>
          <h2 style={{ margin: '10px 0 0 0', fontSize: '2.2rem', color: '#1e293b' }}>12</h2>
        </div>
        
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '5px solid #2563eb' }}>
          <span style={{ fontSize: '0.9rem', color: '#627d98', fontWeight: '500' }}>Vehículos en servicio</span>
          <h2 style={{ margin: '10px 0 0 0', fontSize: '2.2rem', color: '#1e293b' }}>28</h2>
        </div>
        
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '5px solid #2563eb' }}>
          <span style={{ fontSize: '0.9rem', color: '#627d98', fontWeight: '500' }}>Objetos pendientes</span>
          <h2 style={{ margin: '10px 0 0 0', fontSize: '2.2rem', color: '#1e293b' }}>07</h2>
        </div>
      </div>

      {/* Sección Inferior: Actividad y Alertas */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Actividad Reciente */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '1.2rem', color: '#1e293b' }}>Actividad reciente</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: '#334155' }}>
              <span>Rutas completadas</span>
              <span style={{ fontWeight: 'bold' }}>86%</span>
            </div>
            <div style={{ background: '#f1f5f9', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '86%', background: '#2563eb', height: '100%', borderRadius: '5px' }}></div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: '#334155' }}>
              <span>Servicios puntuales</span>
              <span style={{ fontWeight: 'bold' }}>78%</span>
            </div>
            <div style={{ background: '#f1f5f9', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '78%', background: '#2563eb', height: '100%', borderRadius: '5px' }}></div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: '#334155' }}>
              <span>Informes resueltos</span>
              <span style={{ fontWeight: 'bold' }}>61%</span>
            </div>
            <div style={{ background: '#f1f5f9', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '61%', background: '#2563eb', height: '100%', borderRadius: '5px' }}></div>
            </div>
          </div>

          <p style={{ margin: '25px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Última actualización: hoy, 10:42</p>
        </div>

        {/* Panel de Alertas */}
        <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '1.2rem', color: '#1e293b' }}>Alertas</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem', color: '#334155' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#d97706', fontWeight: 'bold' }}>⚠️</span> 2 informes en revisión
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#d97706', fontWeight: 'bold' }}>⚠️</span> 1 combi en mantenimiento
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span> 5 comentarios respondidos
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}