import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <div className="dashboard-container">
        <div className="wrapper-top d-flex">
          <div className="wrapper-top-details d-flex justify-content-center align-items-center fully-rounded d-flex flex-column gap-medium">
            <div className="data-text">Completed cases</div>
            <div className="wrapper-top-details d-flex justify-content-center align-items-center fully-rounded d-flex flex-column gap-medium">
              400
            </div>
          </div>
          <div className="wrapper-top-details d-flex justify-content-center align-items-center fully-rounded d-flex flex-column gap-medium">
            <div className="data-text">Clients</div>
            <div className="wrapper-top-details d-flex justify-content-center align-items-center fully-rounded d-flex flex-column gap-medium">
              125
            </div>
          </div>
          <div className="wrapper-top-details d-flex justify-content-center align-items-center fully-rounded d-flex flex-column gap-medium">
            <div className="data-text">Lawyers</div>
            <div className="wrapper-top-details d-flex justify-content-center align-items-center fully-rounded d-flex flex-column gap-medium">
              56
            </div>
          </div>
        </div>
        <div className="wrapper-bottom">
          We are dedicated to providing exceptional legal services with a
          commitment to integrity, professionalism and excellence. Our tema of
          experienced attorneys is well-versed in a wide range of legal areas,
          ensuring comprehensive and effective representation for our clients.
          We prioritize clear communication, personalized solutions, and a
          result driven approach, striving to deliver the highest level of
          service and achieve the best possible outcomes for our clients.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
