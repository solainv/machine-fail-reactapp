import React, { useState, useEffect } from 'react';

function DashAppIntegration() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuliere eine Verzögerung von 2 Sekunden für den Ladeprozess
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Aufräumarbeiten bei Komponenten-Entfernung
    return () => clearTimeout(timeout);
  }, []); // Der Effekt wird nur einmal beim ersten Rendern ausgeführt

  return (
    <div style={{ textAlign: 'center' }}>
      {isLoading ? (
        <div style={{ fontSize: '20px', paddingTop: '20px' }}>Die App wird geladen...</div>
      ) : (
        <iframe
          title="Dash App"
          src="https://ausfall-dash.onrender.com" // Passen Sie die URL entsprechend an
          width="100%"
          height="700px"
          frameBorder="0"
        />
      )}
    </div>
  );
}

export default DashAppIntegration;
