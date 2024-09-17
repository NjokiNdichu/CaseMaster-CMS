import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import * as Yup from "yup"; 

const EditClient = () => {
  const { id } = useParams(); 
  const [initialValues, setInitialValues] = useState(null); 
  const navigate = useNavigate();


  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });


  useEffect(() => {
    fetch(`https://casemaster-cms.onrender.com/clients/${id}`)
      .then((response) => response.json())
      .then((data) => setInitialValues(data))
      .catch((error) => console.error("Error fetching client data:", error));
  }, [id]);

  const handleSubmit = (values) => {
    fetch(`https://casemaster-cms.onrender.com/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/clients"); 
        } else {
          console.error("Failed to update the client");
        }
      })
      .catch((error) => console.error("Error updating client:", error));
  };

  if (!initialValues) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Client</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} 
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" className="form-field" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field name="phone" type="text" className="form-field" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-field" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Field name="address" type="text" className="form-field" />
              <ErrorMessage name="address" component="div" className="error" />
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

export default EditClient;
