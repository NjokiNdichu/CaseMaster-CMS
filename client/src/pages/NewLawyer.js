import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NewLawyer = ({ onLawyerAdded }) => {
  const initialValues = {
    name: "",
    email: "",
    specialization: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    specialization: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    fetch("http://127.0.0.1:5555/lawyers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then((response) => response.json())
      .then(() => {
        onLawyerAdded();
      })
      .catch((error) => console.error("Error adding lawyer:", error));
  };

  return (
    <div className="form-container">
      <h2>Create New Lawyer</h2>
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
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <Field type="text" id="specialization" name="specialization" />
            <ErrorMessage name="specialization" component="div" className="error" />
          </div>

          <button type="submit">Add Lawyer</button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewLawyer;
