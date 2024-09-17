import React, { useState, useEffect } from "react";

const LawyerCases = () => {
  const [lawyerCases, setLawyerCases] = useState([]);

  // Fetch updated lawyer-cases association data
  useEffect(() => {
    const fetchLawyerCases = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/lawyer_cases");
        if (!response.ok) {
          throw new Error("Failed to fetch lawyer cases");
        }
        const data = await response.json();
        setLawyerCases(data);
      } catch (error) {
        console.error("Error fetching lawyer-cases data:", error);
      }
    };

    fetchLawyerCases();
  }, []);

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Lawyer Name</th>
            <th>Case Name</th>
          </tr>
        </thead>
        <tbody>
          {lawyerCases.map((entry) => (
            <tr key={`${entry.lawyer_name}-${entry.case_name}`}>
              <td>{entry.lawyer_name}</td>
              <td>{entry.case_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LawyerCases;
