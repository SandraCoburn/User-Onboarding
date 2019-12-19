import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm({ values, errors, touched }) {
  return (
    <div className="user-form">
      <Form>
        <label htmlFor="name">
          <Field id="name" type="text" name="name" placeholder="Name" />
        </label>
        <label htmlFor="email">
          <Field id="email" type="text" name="email" placeholder="Email" />
        </label>
        <label htmlFor="password">
          <Field
            id="password"
            type="text"
            name="password"
            placeholder="Password"
          />
        </label>
        <label htmlFor="termsOfService" className="checkbox-container">
          Terms of Service
          <Field
            id="termsOfService"
            type="chekbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
          <span className="checkmark" />
        </label>
        <button>Submit</button>
      </Form>
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
  }
})(UserForm);
export default FormikUserForm;
