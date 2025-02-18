import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";

export const SignupForm = () => {
	return (
		<>
		  <div className="form-container-2">
			<p className="form-title-2">Sign up on our ERP</p>
			<Formik
			  initialValues={{
				dni: "",
				birthDate: "",
				password: "",
			  }}
			  validate={(values) => {
				const errors = {};

				if (!/^\d+$/.test(values.dni)) {
				  errors.dni = "El DNI debe contener solo números.";
				}
	
				if (!/^\d{2}\/\d{2}\/\d{4}$/.test(values.birthDate)) {
				  errors.birthDate = "El formato de la fecha debe ser dd/mm/yyyy.";
				}
	
				if (values.password.length < 6) {
				  errors.password = "La contraseña debe tener al menos 6 caracteres.";
				}
	
				return errors;
			  }}
			  onSubmit={(values) => {
				console.log("Formulario enviado", values);
			  }}
			>
			  <Form className="form-2">
				<div className="input-container-2">
				  <Field placeholder="Name" name="name" type="text" />
				</div>
				<div className="input-container-2">
				  <Field placeholder="Last name" name="lastName" type="text" />
				</div>
				<div className="input-container-2">
				  <Field placeholder="Dni" name="dni" type="text" />
				  <div className="error-container">
					<ErrorMessage name="dni" component="p" className="error" />
				  </div>
				</div>
				<div className="input-container-2">
				  <Field placeholder="Address" name="address" type="text" />
				</div>
				<div className="input-container-2">
				  <Field placeholder="Salary" name="salary" type="text" />
				  <span>
					<i className="fa-light fa-dollar-sign"></i>
				  </span>
				</div>
				<div className="input-container-2">
				  <Field placeholder="Role" name="role" type="text" />
				</div>
				<div className="input-container-2">
				  <Field placeholder="Department" name="department" type="text" />
				  <span>
					<i className="fa-regular fa-building"></i>
				  </span>
				</div>
				<h5>Birth date</h5>
				<div className="input-container-2">
				  <Field placeholder="00/00/0000" name="birthDate" type="text" />
				  <div className="error-container">
					<ErrorMessage name="birthDate" component="p" className="error" />
				  </div>
				  <span>
					<i className="fa-regular fa-calendar"></i>
				  </span>
				</div>
				<div className="input-container-2">
				  <Field placeholder="Email" name="email" type="email" />
				  <span>
					<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					  <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
					</svg>
				  </span>
				</div>
				<div className="input-container-2">
				  <Field placeholder="Password" name="password" type="password" />
				  <div className="error-container">
					<ErrorMessage name="password" component="p" className="error" />
				  </div>
				  <span>
					<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
					  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
					</svg>
				  </span>
				</div>
				<button className="submit-2" type="submit">
				  Send
				</button>
				<p className="signup-link-2">
				  Got an account?
				  <Link to="/login">
					Log in
				  </Link>
				</p>
			  </Form>
			</Formik>
		  </div>
		</>
	  );
	};