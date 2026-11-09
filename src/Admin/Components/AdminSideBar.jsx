import React from 'react';

export default function AdminSidebar({ currentView, setCurrentView }) {
  const menuItems = [
    { id: 'dashboard', label: 'Panel de control' },
    { id: 'rutas', label: 'Rutas' },
    { id: 'vehiculos', label: 'Vehículos' },
    { id: 'choferes', label: 'Choferes' },
    { id: 'horarios', label: 'Horarios' },
    { id: 'objetos', label: 'Objetos perdidos' },
    { id: 'reportes', label: 'Reportes' },
  ];

  return (
    <aside style={{ width: '240px', backgroundColor: '#102a43', color: 'white', padding: '20px', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>CHAPUL-GO</h2>
      <span style={{ fontSize: '0.75rem', color: '#829ab1', display: 'block', marginBottom: '30px' }}>ADMINISTRACIÓN</span>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            style={{
              width: '100%',
              padding: '10px 14px',
              backgroundColor: currentView === item.id ? '#243b53' : 'transparent',
              color: currentView === item.id ? '#ffffff' : '#bcccdc',
              border: 'none',
              borderRadius: '6px',
              textAlign: 'left',
              cursor: 'pointer',
              fontWeight: currentView === item.id ? 'bold' : 'normal',
              fontSize: '0.9rem'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}