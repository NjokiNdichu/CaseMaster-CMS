import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewClient from "./NewClient"; // Ensure this import path is correct

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    fetch("http://127.0.0.1:5555/clients")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleClientAdded = () => {
    // Refresh the clients list after adding a new client
    fetch("http://127.0.0.1:5555/clients")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching updated data:", error));
  };

  const handleEdit = (id) => {
    navigate(`/clients/edit/${id}`); // Navigate to the edit page with the client ID
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5555/clients/${id}`, { // Use the correct API endpoint
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setClients(clients.filter((clientItem) => clientItem.id !== id)); // Remove the deleted client from the list
        } else {
          console.error("Failed to delete client");
        }
      })
      .catch((error) => console.error("Error deleting client:", error));
  };

  return (
    <div>
      {!showForm && (
        <button className="create-btn" onClick={() => setShowForm(true)}>
          Create New Client
        </button>
      )}
      {showForm ? (
        <NewClient onClientAdded={handleClientAdded} />
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.phone_no}</td>
                <td>{client.email}</td>
                <td>
                  <button className = 'edit_btn' onClick={() => handleEdit(client.id)}>Edit</button>
                  <button className = 'delete_btn' onClick={() => handleDelete(client.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Clients;
