

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies(['authToken']); // Hinzufügen von setCookie

  const predefinedUsername = 'admin'; // Vordefinierter Benutzername
  const predefinedPassword = 'pass123##'; // Vordefiniertes Passwort

  const handleAdminLogin = () => {
    if (username !== predefinedUsername || password !== predefinedPassword) {
      setError('Falscher Benutzername oder Passwort');
      return;
    }
    setIsLoading(true);
    // Simulieren einer erfolgreichen Anmeldung mit einem Timeout
    setTimeout(() => {
      setIsLoading(false);
      const fakeAccessToken = 'fake_access_token';
      setCookie('authToken', fakeAccessToken, { path: '/' }); // Setze das Authentifizierungstoken in den Cookies
      onLogin(fakeAccessToken);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdminLogin();
  };

  return (
    <div className='login-container'>
      <h1>Administration</h1>
      <div className='.login-card'>{
            !isLoading ?
            (
            <div className='login-form-container'> 
              <form className='login-form' onSubmit={handleSubmit}>
                <input type="text" placeholder="Benutzername" value={username} onChange={e => setUsername(e.target.value)} required />
                <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Einloggen</button>
              </form>
            </div>
            )
            :
            (<p className='laden'>Lade...</p>)            
          }
      </div>
      <div className='error'>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default AdminLogin;
