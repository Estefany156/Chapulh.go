import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

// PEGA AQUÍ TU CLAVE DE HEIGIT
const ORS_API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImY4MjdlODI5Y2Q0YTQ5MTA4ZjVjZjI0OGVkZWE4NjA2IiwiaCI6Im11cm11cjY0In0=';

// 1. BASE DE DATOS LOCAL DE PARADAS EN CHAPULHUACÁN
// (Puedes agregar más paradas o ajustar sus lat/lng exactos aquí)
const PARADAS_LOCALES = [
  { nombre: 'Centro Chapulhuacán', lat: 21.1542, lng: -98.9045 },
  { nombre: 'El Rayo', lat: 21.1610, lng: -98.8980 },
  { nombre: 'La Providencia', lat: 21.1480, lng: -98.9120 },
  { nombre: 'Barrio Arriba', lat: 21.1585, lng: -98.9100 },
  { nombre: 'Terminal Sur', lat: 21.1420, lng: -98.9010 },
];

export default function MapaRuta() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const rutaLayerRef = useRef(null);
  const origenMarkerRef = useRef(null);
  const destinoMarkerRef = useRef(null);

  const [origenNombre, setOrigenNombre] = useState('Centro Chapulhuacán');
  const [destinoNombre, setDestinoNombre] = useState('El Rayo');
  const [cargando, setCargando] = useState(false);
  const [infoRuta, setInfoRuta] = useState(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Inicializar el mapa centrado en Chapulhuacán
    const map = L.map(mapContainerRef.current).setView([21.1542, -98.9045], 14);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Renderizar marcadores de las paradas en el mapa
    PARADAS_LOCALES.forEach((parada) => {
      L.marker([parada.lat, parada.lng])
        .addTo(map)
        .bindPopup(`<b>Parada:</b> ${parada.nombre}`);
    });

    return () => {
      map.remove();
    };
  }, []);

  // Busca coordenadas en la lista local o recurre a búsqueda web
  const obtenerCoordenadas = async (nombreLugar) => {
    // 1. Verificar si existe en la lista local de Chapulhuacán
    const paradaLocal = PARADAS_LOCALES.find(
      (p) => p.nombre.toLowerCase().trim() === nombreLugar.toLowerCase().trim()
    );

    if (paradaLocal) {
      return { lat: paradaLocal.lat, lng: paradaLocal.lng };
    }

    // 2. Si no es una parada de la lista, intentar geocodificar externamente
    try {
      const query = encodeURIComponent(`${nombreLugar}, Chapulhuacán, Hidalgo, México`);
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const data = await response.json();

      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    } catch (error) {
      console.error('Error buscando ubicación:', error);
    }

    return null;
  };

  const handleBuscarRuta = async () => {
    if (!origenNombre || !destinoNombre) {
      alert('Por favor selecciona o ingresa un origen y destino.');
      return;
    }

    if (origenNombre === destinoNombre) {
      alert('El origen y el destino deben ser diferentes.');
      return;
    }

    setCargando(true);
    setInfoRuta(null);

    const coordsOrigen = await obtenerCoordenadas(origenNombre);
    const coordsDestino = await obtenerCoordenadas(destinoNombre);

    if (!coordsOrigen || !coordsDestino) {
      alert('No se pudieron obtener las coordenadas de uno de los puntos.');
      setCargando(false);
      return;
    }

    const map = mapInstanceRef.current;

    // Actualizar marcadores de inicio y fin
    if (origenMarkerRef.current) map.removeLayer(origenMarkerRef.current);
    if (destinoMarkerRef.current) map.removeLayer(destinoMarkerRef.current);

    origenMarkerRef.current = L.marker([coordsOrigen.lat, coordsOrigen.lng])
      .addTo(map)
      .bindPopup(`<b>Origen:</b> ${origenNombre}`)
      .openPopup();

    destinoMarkerRef.current = L.marker([coordsDestino.lat, coordsDestino.lng])
      .addTo(map)
      .bindPopup(`<b>Destino:</b> ${destinoNombre}`);

    // Petición de ruta a HeiGIT / OpenRouteService
    const url = `https://api.heigit.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${coordsOrigen.lng},${coordsOrigen.lat}&end=${coordsDestino.lng},${coordsDestino.lat}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.features && data.features.length > 0) {
        if (rutaLayerRef.current) map.removeLayer(rutaLayerRef.current);

        const rutaLayer = L.geoJSON(data, {
          style: { color: '#00875A', weight: 6, opacity: 0.8 },
        }).addTo(map);

        rutaLayerRef.current = rutaLayer;
        map.fitBounds(rutaLayer.getBounds(), { padding: [40, 40] });

        const summary = data.features[0].properties.summary;
        setInfoRuta({
          distanciaKm: (summary.distance / 1000).toFixed(2),
          duracionMin: Math.round(summary.duration / 60),
        });
      } else {
        alert('No se pudo calcular una ruta entre estos dos puntos.');
      }
    } catch (error) {
      console.error('Error al trazar ruta:', error);
      alert('Error consultando la API. Verifica tu API Key de HeiGIT.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Consulta de Rutas de Transporte</h2>

      {/* Selectores de Paradas Fijas */}
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '15px', alignItems: 'flex-end' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Origen / Parada A:</label>
          <select
            value={origenNombre}
            onChange={(e) => setOrigenNombre(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
          >
            {PARADAS_LOCALES.map((p, idx) => (
              <option key={idx} value={p.nombre}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Destino / Parada B:</label>
          <select
            value={destinoNombre}
            onChange={(e) => setDestinoNombre(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
          >
            {PARADAS_LOCALES.map((p, idx) => (
              <option key={idx} value={p.nombre}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleBuscarRuta}
          disabled={cargando}
          style={{
            padding: '9px 20px',
            cursor: cargando ? 'not-allowed' : 'pointer',
            background: '#00875A',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          {cargando ? 'Buscando...' : 'Buscar Ruta'}
        </button>
      </div>

      {/* Información de la ruta */}
      {infoRuta && (
        <div style={{ background: '#e6f4ea', padding: '12px 16px', borderRadius: '6px', marginBottom: '15px', color: '#137333' }}>
          🚌 <strong>Distancia:</strong> {infoRuta.distanciaKm} km | ⏳ <strong>Tiempo estimado:</strong> ~{infoRuta.duracionMin} min
        </div>
      )}

      {/* Contenedor del Mapa */}
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '480px', borderRadius: '8px', border: '1px solid #ddd' }}
      />
    </div>
  );
}