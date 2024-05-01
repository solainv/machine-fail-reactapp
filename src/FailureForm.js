// javascript
// Copy code
// import './failureForm.css';
// Hier importieren wir eine CSS-Datei, die für das Styling dieser Komponente verwendet wird.

// javascript
// Copy code
// import React, { useState } from 'react';
// Wir importieren React und die useState-Funktion aus dem React-Paket. React wird benötigt, um die Komponenten zu erstellen, und useState wird verwendet, um den Zustand innerhalb einer Funktionskomponente zu verwalten.

// javascript
// Copy code
// function FailureForm() {
// Wir definieren eine Funktion namens FailureForm, die eine React-Komponente repräsentiert.

// javascript
// Copy code
//   const [inputs, setInputs] = useState({
//     type: '',
//     air_temp_kelv: '',
//     process_temp_kelv: '',
//     rotat_speed_rpm: '',
//     torque_nm: '',
//     tool_wear_min: ''
//   });
// Hier verwenden wir useState, um den Zustand für die Eingabefelder im Formular zu initialisieren. inputs enthält die Werte der Eingabefelder, und setInputs wird verwendet, um diese Werte zu aktualisieren.

// javascript
// Copy code
//   const [responseText, setResponseText] = useState('');
// Wir initialisieren einen Zustand namens responseText, der den Text der Antwort vom Server speichert. setResponseText wird verwendet, um diesen Text zu aktualisieren.

// javascript
// Copy code
//   const [loading, setLoading] = useState(false);
// Dieser Zustand (loading) wird verwendet, um anzuzeigen, ob gerade eine Anfrage an den Server gesendet wird. setLoading wird verwendet, um diesen Zustand zu aktualisieren.

// javascript
// Copy code
//   const [loadingProgress, setLoadingProgress] = useState(0);
// Hier initialisieren wir einen Zustand (loadingProgress), um den Fortschritt des Ladevorgangs anzuzeigen. setLoadingProgress wird verwendet, um den Fortschritt zu aktualisieren.

// javascript
// Copy code
//   const handleInputChange = event => {
// Wir definieren eine Funktion namens handleInputChange, die jedes Mal aufgerufen wird, wenn sich der Wert eines Eingabefeldes im Formular ändert.

// javascript
// Copy code
//     const { name, value } = event.target;
// Hier extrahieren wir den Namen und den Wert des geänderten Eingabefeldes aus dem Ereignisobjekt.

// javascript
// Copy code
//     setResponseText('');
// Wir setzen den vorherigen Antworttext zurück.

// javascript
// Copy code
//     setInputs(prevInputs => ({
//       ...prevInputs,
//       [name]: value
//     }));
// Wir aktualisieren den Zustand der Eingabefelder mit dem neuen Wert.

// javascript
// Copy code
//   const handleFormSubmit = event => {
// Diese Funktion wird aufgerufen, wenn das Formular abgeschickt wird. Sie handhabt den Prozess des Sendens der Daten an den Server und das Verarbeiten der Antwort.

// javascript
// Copy code
//     setLoading(true);
//     setLoadingProgress(0);
// Wir setzen loading auf true und setzen den Ladezustand auf 0, um den Ladevorgang zu starten.

// javascript
// Copy code
//     const startTime = performance.now(); // Startzeit für die Zeitmessung
// Wir speichern die Startzeit, um die Zeit zu messen, die für das Senden der Anfrage benötigt wird.

// javascript
// Copy code
//     const totalSteps = 100;
//     const totalTime = 20000; // Gesamtzeit für den Fortschrittsbalken (in Millisekunden)
// Wir definieren die Anzahl der Schritte und die Gesamtzeit für den Fortschrittsbalken.

// javascript
// Copy code
//     let currentStep = 0;
// Wir initialisieren die aktuelle Schrittanzahl auf 0.

// javascript
// Copy code
//     const updateProgress = () => {
// Wir definieren eine Funktion namens updateProgress, um den Fortschritt des Ladevorgangs zu aktualisieren.

// javascript
// Copy code
//       const currentTime = performance.now(); // Aktuelle Zeit für die Zeitmessung
// Wir speichern die aktuelle Zeit, um die vergangene Zeit zu berechnen.

// javascript
// Copy code
//       const elapsedTime = currentTime - startTime; // Vergangene Zeit seit dem Start
// Wir berechnen die vergangene Zeit seit dem Start des Ladevorgangs.

// javascript
// Copy code
//       let progress = (elapsedTime / totalTime) * 100;
// Wir berechnen den Fortschritt basierend auf der vergangenen Zeit.

// javascript
// Copy code
//       setLoadingProgress(progress);
//       currentStep++;
// Wir aktualisieren den Fortschritt und die Schrittzahl.

// javascript
// Copy code
//       if (currentStep >= totalSteps) {
//         clearInterval(interval);
//       }
// Wenn alle Schritte abgeschlossen sind, löschen wir das Intervall.

// javascript
// Copy code
//     const interval = setInterval(updateProgress, totalTime / totalSteps);
// Wir definieren ein Intervall, um den Fortschritt periodisch zu aktualisieren.

// javascript
// Copy code
//     setTimeout(() => {
//       if (loadingProgress < 95) {
//         setLoadingProgress(95);
//       }
//     }, totalTime);
// Nach Ablauf einer bestimmten Zeit überprüfen wir den Fortschritt und setzen ihn auf 95, wenn er weniger als 95 beträgt.

// javascript
// Copy code
//     fetch('https://machine-ausfahl-pred-api.onrender.com/machine-ausfall', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(inputs)
//     })
// Hier senden wir eine POST-Anfrage an den Server mit den eingegebenen Daten.

// javascript
// Copy code
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
// Wir überprüfen die Antwort des Servers und wandeln sie in JSON um, wenn sie erfolgreich ist.

// javascript
// Copy code
//       .then(data => {
// Wenn die Daten erfolgreich empfangen wurden, führen wir diesen Block aus.

// javascript
// Copy code
//         setLoadingProgress(100);
//         setResponseText(data.prediction);
//         setLoading(false); // Ladevorgang erst nach Erhalt der Antwort beenden
//         clearInterval(interval); // Intervall nach Erhalt der Antwort löschen
//       })
// Wir aktualisieren den Fortschritt auf 100, setzen die Antworttext und beenden den Ladevorgang.

// javascript
// Copy code
//       .catch(error => {
// Wenn ein Fehler auftritt, führen wir diesen Block aus.

// javascript
// Copy code
//         console.error('Fehler beim Senden der Anfrage:', error);
//         setLoadingProgress(100);
//         setResponseText('Fehler: Bitte versuche es später erneut.');
//         setLoading(false); // Ladevorgang beenden, auch wenn ein Fehler auftritt
//         clearInterval(interval); // Intervall bei einem Fehler löschen
//       });
// Wir geben den Fehler aus, aktualisieren den Fortschritt auf 100, setzen die Fehlermeldung und beenden den Ladevorgang.

// javascript
// Copy code
//   return (
//     <div className="container">
// Hier beginnt die Rückgabe der Komponente. Wir verwenden ein Container-Div für das gesamte Formular.

// javascript
// Copy code
//       <form onSubmit={handleFormSubmit}>
// Hier beginnt das Formularelement, das die handleFormSubmit-Funktion aufruft, wenn das Formular abgeschickt wird.

// javascript
// Copy code
//         <label>
//           Type:
//           <select name="type" value={inputs.type} onChange={handleInputChange} required>
//             <option value="">Bitte auswählen</option>
//             <option value="H">H</option>
//             <option value="L">L</option>
//             <option value="M">M</option>
//           </select>
//         </label>
// Hier erstellen wir ein Label und ein Dropdown-Menü, um den Maschinentyp auszuwählen.

// javascript
// Copy code
//         <br />
// Ein Zeilenumbruch für das Layout.

// javascript
// Copy code
//         <label>
//           Air Temp (Kelvin):
//           <input
//             type="number"
//             name="air_temp_kelv"
//             value={inputs.air_temp_kelv}
//             onChange={handleInputChange}
//             placeholder="z.B. 298.1"
//             required
//           />
//         </label>
// Hier geben wir das Eingabefeld für die Lufttemperatur in Kelvin an.

// javascript
// Copy code
// <br />
// Dies ist ein HTML-Zeilenumbruch <br />. Es wird verwendet, um einen Zeilenumbruch im Formular zu erzeugen und das Layout zu verbessern.

// javascript
// Copy code
// <button type="submit">Vorhersage erhalten</button>
// Dies ist ein Submit-Button für das Formular. Wenn der Benutzer darauf klickt, wird das Formular abgeschickt und die Funktion handleFormSubmit wird ausgeführt, um die Daten an den Server zu senden.

// javascript
// Copy code
// {loading && (
//   <div className="progress-bar-container">
//     <div className="progress-bar-fill" style={{ width: `${loadingProgress}%` }} />
//   </div>
// )}
// Hier verwenden wir eine bedingte Anweisung, um zu überprüfen, ob loading true ist. Wenn dies der Fall ist, wird der Fortschrittsbalken angezeigt. Der Fortschrittsbalken wird durch zwei Div-Container dargestellt: progress-bar-container enthält progress-bar-fill, dessen Breite sich entsprechend dem loadingProgress ändert.

// javascript
// Copy code
// {responseText && (
//   <div className="response">
//     <h2>Prognoseergebnis:</h2>
//     <p>{responseText}</p>
//   </div>
// )}
// Hier wird eine weitere bedingte Anweisung verwendet, um zu überprüfen, ob responseText einen Wert enthält. Wenn dies der Fall ist, wird das Prognoseergebnis angezeigt. Es wird in einem Div-Container mit der Klasse response angezeigt, der einen Titel <h2> und den Text der Antwort <p> enthält.





import './FailureForm.css';
import React, { useState } from 'react';

function FailureForm() {
  const [inputs, setInputs] = useState({
    type: '',
    air_temp_kelv: '',
    process_temp_kelv: '',
    rotat_speed_rpm: '',
    torque_nm: '',
    tool_wear_min: ''
  });
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleInputChange = event => {
    const { name, value } = event.target;
  
    // Zurücksetzen der vorherigen Antwort
    setResponseText('');

    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };
  

  const handleFormSubmit = event => {
    event.preventDefault();
  
    setLoading(true);
    setLoadingProgress(0);
    
    const startTime = performance.now(); // Startzeit für die Zeitmessung
    
    const totalSteps = 100;
    const totalTime = 20000; // Gesamtzeit für den Fortschrittsbalken (in Millisekunden)
    
    let currentStep = 0;
    
    const updateProgress = () => {
      const currentTime = performance.now(); // Aktuelle Zeit für die Zeitmessung
      const elapsedTime = currentTime - startTime; // Vergangene Zeit seit dem Start
    
      // Berechne den Fortschritt basierend auf der vergangenen Zeit
      let progress = (elapsedTime / totalTime) * 100;
    
      setLoadingProgress(progress);
      currentStep++;
    
      if (currentStep >= totalSteps) {
        clearInterval(interval);
      }
    };
    
    const interval = setInterval(updateProgress, totalTime / totalSteps);
    
    // Überprüfe die Bedingung nach Ablauf der Zeit
    setTimeout(() => {
      if (loadingProgress < 95) {
        setLoadingProgress(95);
      }
    }, totalTime);
    // Hier die Anfrage senden
    // fetch('http://127.0.0.1:8000/machine-ausfall', {
    fetch('https://machine-ausfahl-pred-api.onrender.com/machine-ausfall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLoadingProgress(100);
        setResponseText(data.prediction);
        setLoading(false); // Ladevorgang erst nach Erhalt der Antwort beenden
        clearInterval(interval); // Intervall nach Erhalt der Antwort löschen
      })
      .catch(error => {
        console.error('Fehler beim Senden der Anfrage:', error);
        setLoadingProgress(100);
        setResponseText('Fehler: Bitte versuche es später erneut.');
        setLoading(false); // Ladevorgang beenden, auch wenn ein Fehler auftritt
        clearInterval(interval); // Intervall bei einem Fehler löschen
      });
  };
    
  
  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <label>
          Type:
          <select name="type" value={inputs.type} onChange={handleInputChange} required>
            <option value="">Bitte auswählen</option>
            <option value="H">H</option>
            <option value="L">L</option>
            <option value="M">M</option>
          </select>
        </label>
        <br />
        <label>
          Air Temp (Kelvin):
          <input
            type="number"
            name="air_temp_kelv"
            value={inputs.air_temp_kelv}
            onChange={handleInputChange}
            placeholder="z.B. 298.1"
            required
          />
        </label>
        <br />
        <label>
          Process Temp (Kelvin):
          <input
            type="number"
            name="process_temp_kelv"
            value={inputs.process_temp_kelv}
            onChange={handleInputChange}
            placeholder="z.B. 308.6"
            required
          />
        </label>
        <br />
        <label>
            Rotat Speed (RPM):
            <input
              type="text"
              name="rotat_speed_rpm"
              value={inputs.rotat_speed_rpm}
              onChange={handleInputChange}
              placeholder="z.B. 1551"
              autoComplete="off"
              pattern="\d+"
              title="Bitte geben Sie eine Ganzzahl ein."
              required
            />
          </label>
        <br />
        <label>
          Torque (Nm):
          <input
            type="number"
            name="torque_nm"
            value={inputs.torque_nm}
            onChange={handleInputChange}
            placeholder="z.B. 42.8"
            required
          />
        </label>
        <br />
        <label>
        Tool Wear (Min):
          <input
            type="text"
            name="tool_wear_min"
            value={inputs.tool_wear_min}
            onChange={handleInputChange}
            placeholder="z.B. 0"
            autoComplete="off"
            pattern="\d+"
            title="Bitte geben Sie eine Ganzzahl ein."
            required
          />
        </label>

        <br />
        <button type="submit">Vorhersage erhalten</button>
      </form>
      {loading && (
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${loadingProgress}%` }} />
        </div>
      )}

      {responseText && (
        <div className="response">
          <h2>Prognoseergebnis:</h2>
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
}

export default FailureForm;
