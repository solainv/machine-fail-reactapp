import React from 'react';

function FeedbackTable({ feedbacks, handleDeleteFeedback }) {
  return (
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
  );
}

export default FeedbackTable;
