import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import FeedbackForm from './Feedbackform';
import FailureForm from './FailureForm';
import DashAppIntegration from './dash';
import FeedbackDashboard from './FeedbackDashboard';
import './App.css';
import Login from './AdminLogin';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
    setIsLoading(false);

    // Hier würdest du normalerweise die Überprüfung durchführen, ob der Benutzer ein Administrator ist.
    // Für diese Beispielimplementierung setzen wir isAdmin einfach auf true.
    setIsAdmin(true);
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
      localStorage.setItem('isLoggedIn', 'true');
    }, 500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <div className="app">
        {isLoading ? (
          <p>Lade...</p>
        ) : (
          <>
            <Route exact path="/">
              {!isLoggedIn ? (
                <>
                  <header className="header">
                    <div className='h1-admin'>
                      <h1 className='title'>Machine Ausfall Prediction</h1>
                      <div className='hinweis'>
                        ⚠ "Bitte haben Sie Verständnis dafür, dass ich nur die kostenlose Version des Render-Cloud-Servers 
                        nutze. Das bedeutet, dass das Dashboard, die Anfragen und Antworten eine Weile dauern können, 
                        insbesondere beim ersten Abschicken. Vielen Dank für Ihre Geduld."
                      </div>
                      <a href='/admin'>Administration</a>
                    </div>

                    <p>
                      Guten Tag! In diesem App  können Sie die potentielle Ausfallsituation Ihrer Maschine vorhersagen. 
                      Zuerst müssen Sie den <strong>Type</strong> der Maschine wählen, das kann 'H', 'L' oder 'M' sein, je nachdem, ob Ihre Maschine 
                      Hochleistung, Niedrigleistung oder mittlere Leistung hat. Dann, um Umwelteinflüsse zu berücksichtigen, 
                      geben Sie bitte die Luft- und Prozesstemperatur in Kelvin ein (<strong>Air Temp (Kelvin), Process Temp (Kelvin)</strong> ).
                      Die Rotationsgeschwindigkeit der Maschine in Umdrehungen pro Minute <strong>Rotat Speed (RPM)</strong> spielt auch eine Rolle. 
                      Newtonmeter <strong>Torque (Nm)</strong>, sind ebenfalls wichtig für die Leistung. Vergessen Sie 
                      nicht, die Zeit in Minuten anzugeben, die das Werkzeug bereits in Betrieb war <strong>Tool Wear (Min)</strong>, 
                      da dies auch den Zustand der Maschine beeinflussen kann. Mit diesen Informationen können wir den möglichen Ausfall der 
                      Maschine vorhersagen und die Wahrscheinlichkeiten dafür. 
                      Ganz einfach, nicht wahr?"
                    </p>
                  </header>
                  <main className="main">
                    <div className="first-div-main">
                      <div className="element1">
                        <div className="first-card">
                          <FailureForm />
                        </div>
                      </div>
                      <div className="element2">
                        <div className="second-card">
                          <DashAppIntegration />
                        </div>
                      </div>
                    </div>
                    <div className="second-div-main">
                      <div className="element">
                        <div className="third-card">
                          <FeedbackForm />
                        </div>
                      </div>
                    </div>
                  </main>
                  <footer className="footer">
                    <p className='footer'>&copy; 2024 Solaiman Karroumi. Alle Rechte vorbehalten.</p>
                  </footer>
                </>
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/admin">
              {!isLoggedIn ? (
                <div className="admin-login-page">
                  <Login onLogin={handleLogin} />
                </div>
              ) : (
                <FeedbackDashboard onLogout={handleLogout} />
              )}
            </Route>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
