import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import NewCase from "./NewCase"; 

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetch("https://casemaster-cms.onrender.com/cases")
      .then((response) => response.json())
      .then((data) => setCases(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCaseAdded = () => {
    // Refresh the cases list after adding a new case
    fetch("https://casemaster-cms.onrender.com/cases")
      .then((response) => response.json())
      .then((data) => setCases(data))
      .catch((error) => console.error("Error fetching updated data:", error));
  };

  const handleEdit = (id) => {
    navigate(`/cases/edit/${id}`); // Navigate to the edit page with the case ID
  };

  const handleDelete = (id) => {
    fetch(`https://casemaster-cms.onrender.com/cases/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCases(cases.filter((caseItem) => caseItem.id !== id)); // Remove the deleted case from the list
        } else {
          console.error("Failed to delete case");
        }
      })
      .catch((error) => console.error("Error deleting case:", error));
  };

  return (
    <div>
      {!showForm && (
        <button className="create-btn" onClick={() => setShowForm(true)}>
          Create New Case
        </button>
      )}
      {showForm ? (
        <NewCase onCaseAdded={handleCaseAdded} />
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Client ID</th>
              <th>Status</th>
              <th>Date Opened</th>
              <th>Date Closed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <tr key={caseItem.id}>
                <td>{caseItem.title}</td>
                <td>{caseItem.client_id}</td>
                <td>{caseItem.status}</td>
                <td>{new Date(caseItem.date_opened).toLocaleDateString()}</td>
                <td>
                  {caseItem.date_closed
                    ? new Date(caseItem.date_closed).toLocaleDateString()
                    : "Still Open"}
                </td>
                <td>
                  <button className = 'edit_btn' onClick={() => handleEdit(caseItem.id)}>Edit</button>
                  <button className = 'delete_btn' onClick={() => handleDelete(caseItem.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cases;
