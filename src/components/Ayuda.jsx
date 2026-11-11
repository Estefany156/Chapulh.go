import React, { useState, useRef, useEffect } from 'react';
import './Ayuda.css';

// Íconos SVG para accesos rápidos y botón de envío
const IconTarifas = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <rect x="7" y="7" width="10" height="10" rx="1" />
  </svg>
);

const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconRoute = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
  </svg>
);

const IconLost = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export default function Ayuda() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Soy el asistente oficial de Chapul-Go. ¿En qué te puedo ayudar hoy?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    // Cargar clave de API desde el archivo .env
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: '❌ ERROR: No se encontró VITE_GEMINI_API_KEY en tu archivo .env. Asegúrate de haber reiniciado el servidor Vite.'
        }
      ]);
      return;
    }

    const newMessages = [...messages, { sender: 'user', text: messageText }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [
                {
                  text: `Eres el asistente virtual oficial de 'Chapul-Go', la plataforma de transporte de Chapulhuacán.
                  
Responde de forma amable, clara y breve en español utilizando ÚNICAMENTE la siguiente información oficial de transporte:

- TARIFAS:
  * Pasaje general: $10.00 MXN.
  * Estudiantes y adultos mayores (con credencial vigente): $5.00 MXN.
  * Niños menores de 5 años: Viajan gratis.

- HORARIOS Y RUTAS:
  * Ruta Centro - Universidad (UTTT): Salidas cada 15 minutos, de 6:00 AM a 9:00 PM.
  * Ruta Mercado Municipal - Hospital: Salidas cada 20 minutos, de 7:00 AM a 8:00 PM.
  * Ruta Barrio San Rafael - Centro: Salidas cada 30 minutos, de 6:30 AM a 7:30 PM.

- OBJETOS PERDIDOS:
  * Si el usuario olvidó una pertenencia en una unidad, debe acudir a la base central ubicada en el Mercado Municipal indicando la ruta y hora aproximada, o reportarlo directamente en la pestaña 'Objetos Perdidos' de esta app.

Si el usuario realiza preguntas que no corresponden a Chapulhuacán o al servicio de transporte de Chapul-Go, indícale amablemente que solo estás capacitado para resolver dudas de movilidad y transporte local.`
                }
              ]
            },
            contents: newMessages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            }))
          })
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const botReply = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
      } else if (data.error) {
        console.error("Error devuelto por la API de Gemini:", data.error);
        if (data.error.code === 503) {
          setMessages(prev => [
            ...prev,
            { sender: 'bot', text: '⏳ Servidor con alta demanda. Por favor, reintenta en unos segundos.' }
          ]);
        } else {
          setMessages(prev => [
            ...prev,
            { sender: 'bot', text: `❌ Error de Google (${data.error.code}): ${data.error.message}` }
          ]);
        }
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'No se pudo obtener una respuesta válida del servidor.' }
        ]);
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: '❌ Error de red al conectar con los servidores de Google. Revisa tu conexión o desactiva bloqueadores de anuncios.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickAccess = [
    { label: 'Consultar tarifas', icon: <IconTarifas />, prompt: '¿Cuáles son las tarifas del transporte?' },
    { label: 'Ver próximas salidas', icon: <IconClock />, prompt: '¿Con qué frecuencia salen las unidades?' },
    { label: 'Buscar una ruta', icon: <IconRoute />, prompt: '¿Qué rutas tienen disponibles?' },
    { label: 'Consultar horarios', icon: <IconClock />, prompt: '¿Cuáles son los horarios de atención?' },
    { label: 'Objetos perdidos', icon: <IconLost />, prompt: '¿Qué hago si olvidé un objeto en la unidad?' },
  ];

  return (
    <main className="content-container">
      <div className="help-screen-wrapper">
        {/* Encabezado */}
        <div className="help-main-header">
          <h1 className="help-code-title">06 · SERVICIO Y AYUDA</h1>
          <p className="help-code-subtitle">Soporte, FAQ, chatbot y feedback</p>
        </div>

        {/* Área del Chat */}
        <div className="chat-area">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="chat-bubble bot typing">
              Escribiendo...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Accesos Rápidos */}
        <div className="quick-access-section">
          <h3 className="quick-access-title">Accesos rápidos</h3>
          <div className="quick-access-grid">
            {quickAccess.map((item, idx) => (
              <button
                key={idx}
                className="quick-access-btn"
                onClick={() => handleSend(item.prompt)}
                disabled={loading}
              >
                <span className="btn-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Campo de Entrada de Texto */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="chat-input-bar">
          <input
            type="text"
            placeholder="Escribe tu pregunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-field"
            disabled={loading}
          />
          <button type="submit" className="btn-send-round" disabled={loading || !input.trim()}>
            <IconSend />
          </button>
        </form>
      </div>
    </main>
  );
}