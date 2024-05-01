import React, { useState, useEffect, useCallback } from 'react';
import './FeedbackDashboard.css';
import { useCookies } from 'react-cookie';

function FeedbackDashboard({ onLogout }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, removeCookie] = useCookies(['authToken']);

  const handleLogout = useCallback(() => {
    removeCookie('authToken');
    onLogout();
  }, [onLogout, removeCookie]);

  useEffect(() => {
    const authToken = cookies.authToken;
    if (!authToken) {
      handleLogout();
      return;
    }

    fetchFeedbacks();

    const timeout = setTimeout(() => {
      handleLogout();
    }, 10 * 60 * 1000); // 10 Minuten

    return () => clearTimeout(timeout);
  }, [cookies, handleLogout]);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://get-store-delete-api.onrender.com/get-feedback/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFeedbacks(data.feedback);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setIsLoading(false);
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
  return (
    <div className='container'>
      {isLoading ? (
        <p>Laden...</p>
      ) : (
        <>
          <div className="feedback-dashboard">
            <h2 className="dashboard-heading">Feedback Dashboard</h2>
            <div className="feedback-table-wrapper">
              <div className="feedback-table-container">
                <table className="feedback-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Feedback</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                  <tbody>
                    {feedbacks.map((feedback, index) => (
                      <tr key={index}>
                        <td>{feedback[0]}</td>
                        <td>{feedback[1]}</td>
                        {Object.values(feedback).slice(2).map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                        <td><button onClick={() => handleDeleteFeedback(feedback[0])}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='logout'>
            <button onClick={handleLogout}>Ausloggen</button>
          </div>
        </>
      )}
    </div>
  );
}

export default FeedbackDashboard;
