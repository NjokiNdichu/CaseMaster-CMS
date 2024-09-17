import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NewClient = ({ onClientAdded }) => {
  const initialValues = {
    name: "",
    phone_no: "",
    email: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    phone_no: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const handleSubmit = (values) => {
    fetch("https://casemaster-cms.onrender.com/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then((response) => response.json())
      .then(() => {
        onClientAdded();
      })
      .catch((error) => console.error("Error adding client:", error));
  };

  return (
    <div className="form-container">
      <h2>Create New Client</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="phone_no">Phone Number</label>
            <Field type="text" id="phone_no" name="phone_no" />
            <ErrorMessage name="phone_no" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>


          <button type="submit">Add Client</button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewClient;
