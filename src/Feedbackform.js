import React, { useState } from 'react';
import './FeedbackForm.css'; // Import der CSS-Datei

function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Zustand für die Anzeige der Benachrichtigung

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <button type="submit">Senden</button>
          {showAlert && <div className="alert-notification">Feedback sent successfully!</div>}
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
