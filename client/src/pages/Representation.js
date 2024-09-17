import React, { useState, useEffect } from "react";

const Representation = () => {
  const [representations, setRepresentations] = useState([]);

  // Fetch updated representation data
  useEffect(() => {
    const fetchRepresentations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/representation");
        if (!response.ok) {
          throw new Error("Failed to fetch representation data");
        }
        const data = await response.json();
        setRepresentations(data);
      } catch (error) {
        console.error("Error fetching representation data:", error);
      }
    };

    fetchRepresentations();
  }, []);

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Lawyer Name</th>
          </tr>
        </thead>
        <tbody>
          {representations.map((entry) => (
            <tr key={`${entry.client_name}-${entry.lawyer_name}`}>
              <td>{entry.client_name}</td>
              <td>{entry.lawyer_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Representation;
