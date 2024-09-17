import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewLawyer from "./NewLawyer"; // Ensure this import path is correct

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    fetch("https://casemaster-cms.onrender.com/lawyers")
      .then((response) => response.json())
      .then((data) => setLawyers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleLawyerAdded = () => {
    // Refresh the lawyers list after adding a new lawyer
    fetch("https://casemaster-cms.onrender.com/lawyers")
      .then((response) => response.json())
      .then((data) => setLawyers(data))
      .catch((error) => console.error("Error fetching updated data:", error));
  };

  const handleEdit = (id) => {
    navigate(`/lawyers/edit/${id}`); // Navigate to the edit page with the lawyer ID
  };

  const handleDelete = (id) => {
    fetch(`https://casemaster-cms.onrender.com/lawyers/${id}`, { // Use the correct API endpoint
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setLawyers(lawyers.filter((lawyerItem) => lawyerItem.id !== id)); // Remove the deleted lawyer from the list
        } else {
          console.error("Failed to delete lawyer");
        }
      })
      .catch((error) => console.error("Error deleting lawyer:", error));
  };

  return (
    <div>
      {!showForm && (
        <button className="create-btn" onClick={() => setShowForm(true)}>
          Create New Lawyer
        </button>
      )}
      {showForm ? (
        <NewLawyer onLawyerAdded={handleLawyerAdded} />
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawyers.map((lawyer) => (
              <tr key={lawyer.id}>
                <td>{lawyer.name}</td>
                <td>{lawyer.email}</td>
                <td>{lawyer.specialization}</td>
                <td>
                  <button className = 'edit_btn'onClick={() => handleEdit(lawyer.id)}>Edit</button>
                  <button className = 'delete_btn'onClick={() => handleDelete(lawyer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Lawyers;
