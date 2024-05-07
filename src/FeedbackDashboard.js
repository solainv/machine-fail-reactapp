import React, { useState, useEffect, useCallback } from 'react';
import './FeedbackDashboard.css';
import { useCookies } from 'react-cookie';
import FeedbackTable from './FeedbackTable';
import bild from './refre.png';
import Balls  from './Balls';
import logout from './power-taste.png';


function FeedbackDashboard({ onLogout }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Ändere den Initialwert von isLoading auf false
  const [sessionCookies, removeSessionCookie] = useCookies(['authToken']);

  const handleLogout = useCallback(() => {
    removeSessionCookie('authToken');
    onLogout();
  }, [onLogout, removeSessionCookie]);

  useEffect(() => {
    const authToken = sessionCookies.authToken;
    if (!authToken) {
      handleLogout();
      return;
    }

    fetchFeedbacks();

    const timeout = setTimeout(() => {
      handleLogout();
    }, 10 * 60 * 1000); // 10 Minuten

    window.addEventListener('beforeunload', handleLogout);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('beforeunload', handleLogout);
    };
  }, [sessionCookies, handleLogout]);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/get-feedback/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFeedbacks(data.feedback);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setIsLoading(false); // Setze isLoading auf false, wenn die Daten abgerufen wurden, unabhängig vom Ergebnis
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      const response = await fetch(`https://get-store-delete-api.onrender.com/del-feedback/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchFeedbacks();
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleRefresh = () => {
    fetchFeedbacks();
  };

  return (
    <div className='container_d'>
      <div className="feedback-dashboard">
        <div className="dashboard-heading">
          <h2>Feedback Dashboard</h2>
          <img src={bild} onClick={handleRefresh} alt="Refresh" />   
          
        </div>
        {/* Ladeanzeige wird angezeigt, wenn isLoading true ist */}
        {isLoading && <div className='lad'><Balls/></div>}
        {/* FeedbackTable wird nur gerendert, wenn Feedbacks vorhanden sind */}
        {feedbacks.length > 0 && <FeedbackTable feedbacks={feedbacks} handleDeleteFeedback={handleDeleteFeedback} />}
      </div>
      <div className='logout'>
        {/* <button onClick={handleLogout}>Ausloggen</button> */}
          <img onClick={handleLogout} src={logout}/>
      </div>
    </div>
  );
}

export default FeedbackDashboard;



