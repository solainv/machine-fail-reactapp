

import React, { useState } from 'react';
import './FeedbackForm.css'; // Import der CSS-Datei

function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Zustand für die Anzeige der Benachrichtigung
  const [isLoading, setIsLoading] = useState(false); // Zustand für die Anzeige des Ladezustands

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Setze den Ladezustand auf true, wenn die Anfrage gesendet wird
    fetch('https://get-store-delete-api.onrender.com/insert-feedback/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        feedback
      })
    })
    .then(response => {
      if (response.ok) {
        setShowAlert(true); // Benachrichtigung anzeigen
        // Zurücksetzen des Formulars nach dem Absenden
        setName('');
        setEmail('');
        setFeedback('');
        // Benachrichtigung nach 3 Sekunden ausblenden
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      } else {
        throw new Error('Failed to submit feedback');
      }
    })
    .catch(error => {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again later.');
    })
    .finally(() => {
      setIsLoading(false); // Setze den Ladezustand unabhängig vom Ergebnis zurück
    });
  };

  return (
    <div className="feedback-form">
      <h2>Feedback geben</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">        
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete='off'
          />
        </div>
        <div className="input-container">        
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='off'
          />
        </div>
        <div className="textarea-container">
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            className="custom-height-textarea"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        </div>
        <div className="button-container">
          <button type="submit" disabled={isLoading}>{isLoading ? 'gesendet...' : 'Senden'}</button>
          
          {showAlert && <div className="alert-notification">Vielen Dank für Ihr Feedback</div>}
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
