import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm({ values, errors, touched, status }) {
  console.log("values are", values);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log("status has changed!", status);
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div className="user-form">
      <Form>
        <label htmlFor="name">
          Name:
          <Field id="name" type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>

        <label htmlFor="email">
          Email:
          <Field id="email" type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>
        <label htmlFor="password">
          Password:
          <Field
            id="password"
            type="text"
            name="password"
            placeholder="Password"
          />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        <label htmlFor="termsOfService" className="checkbox-container">
          Terms of Service
          <Field
            id="termsOfService"
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
          <span className="checkmark" />
        </label>
        <button type="submit">Submit</button>
      </Form>
      {users.map(user => {
        return (
          <ul key={user.id}>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <li>{user.password}</li>
          </ul>
        );
      })}
    </div>
  );
}
const FormikUserForm = withFormik({
  mapPropsToValues(name, email, password, termsOfService) {
    return {
      name: "",
      email: "",
      password: "",
      termsOfService: false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        console.log("success", response);
        setStatus(response.data);
        resetForm();
      })
      .catch(error => console.log(error.response));
  }
})(UserForm);
export default FormikUserForm;
