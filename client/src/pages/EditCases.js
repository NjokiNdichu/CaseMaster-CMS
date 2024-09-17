import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import * as Yup from "yup"; 

const EditCase = () => {
  const { id } = useParams(); 
  const [initialValues, setInitialValues] = useState(null); 
  const navigate = useNavigate();

 
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    client_id: Yup.number().required("Client ID is required"),
    status: Yup.string().required("Status is required"),
    date_opened: Yup.date().required("Date opened is required"),
    date_closed: Yup.date().nullable(),
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/cases/${id}`)
      .then((response) => response.json())
      .then((data) => setInitialValues(data))
      .catch((error) => console.error("Error fetching case data:", error));
  }, [id]);

  const handleSubmit = (values) => {
    fetch(`http://127.0.0.1:5555/cases/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/cases"); 
        } else {
          console.error("Failed to update the case");
        }
      })
      .catch((error) => console.error("Error updating case:", error));
  };

  if (!initialValues) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Case</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} 
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field name="title" type="text" className="form-field" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="client_id">Client ID</label>
              <Field name="client_id" type="number" className="form-field" />
              <ErrorMessage name="client_id" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <Field name="status" type="text" className="form-field" />
              <ErrorMessage name="status" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="date_opened">Date Opened</label>
              <Field name="date_opened" type="date" className="form-field" />
              <ErrorMessage name="date_opened" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="date_closed">Date Closed</label>
              <Field name="date_closed" type="date" className="form-field" />
              <ErrorMessage name="date_closed" component="div" className="error" />
            </div>

            <button type="submit" className="form-button" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCase;
