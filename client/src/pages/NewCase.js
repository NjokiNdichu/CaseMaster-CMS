import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const NewCase = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    client_id: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    date_opened: Yup.date().required('Required'),
    date_closed: Yup.date(),
  });

  const handleSubmit = (values) => {
    fetch('https://casemaster-cms.onrender.com/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(data => {
        // Redirect or handle success
        console.log('Case added:', data);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="form-container">
      <h1>Add New Case</h1>
      <Formik
        initialValues={{ title: '', client_id: '', status: '', date_opened: '', date_closed: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field name="title" type="text" />
              {errors.title && touched.title ? <div className="error">{errors.title}</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="client_id">Client ID</label>
              <Field name="client_id" type="text" />
              {errors.client_id && touched.client_id ? <div className="error">{errors.client_id}</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <Field name="status" type="text" />
              {errors.status && touched.status ? <div className="error">{errors.status}</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="date_opened">Date Opened</label>
              <Field name="date_opened" type="date" />
              {errors.date_opened && touched.date_opened ? <div className="error">{errors.date_opened}</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="date_closed">Date Closed</label>
              <Field name="date_closed" type="date" />
              {errors.date_closed && touched.date_closed ? <div className="error">{errors.date_closed}</div> : null}
            </div>
            <button type="submit">Add Case</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewCase;
