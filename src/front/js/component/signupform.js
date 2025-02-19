import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const SignupForm = () => {

    const {store,actions} = useContext(Context)
    let navigate = useNavigate();

	useEffect(()=>{
		if (!store.auth) navigate("/")
		actions.fetchData();
	}, [])

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		lastname: Yup.string().required("Last name is required"),
		dni: Yup.string()
		  .matches(/^\d{8}$/, "DNI must be 8 digits")
		  .required("DNI is required"),
		address: Yup.string().required("Address is required"),
		email: Yup.string()
		  .email("Invalid email format")
		  .required("Email is required"),
		departmentId: Yup.string().required("Department is required"),
		salaryId: Yup.string().required("Salary is required"),
		roleId: Yup.string().required("Role is required"),
		birthDate: Yup.string()
		  .matches(
			/^\d{2}\/\d{2}\/\d{4}$/,
			"Birth date must be in the format DD/MM/YYYY"
		  )
		  .required("Birth date is required"),
		password: Yup.string()
		  .min(8, "Password must be at least 8 characters")
		  .required("Password is required"),
	  });
 
	return (
		<>
		  <div className="form-container-2">
			<p className="form-title-2">Sign up on our ERP</p>
			<Formik
			  initialValues={{
				name: "",
				lastname: "",
				dni: "",
				address: "",
				email: "",
				departmentId: "",
				salaryId: "",
				roleId: "",
				birthDate: "",
				password: ""
			  }}
			  validationSchema={validationSchema}
			  onSubmit={async (values) => {
				console.log(values);
				
				const success = await actions.addWorker(
					values.name,
					values.lastname,
					values.dni,
					values.address,
					values.email,
					values.departmentId,
					values.salaryId,
					values.roleId,
					values.birthDate,
					values.password
				)
				if (success) {
					navigate("/profile")
				}
				else{
                 alert("Error adding worker")
				}
			  }} 

			  >

			  <Form className="form-2">
				<div className="input-container-2">
				  <Field placeholder="Name" name="name" type="text" />
				  <div className="error-container">
                <ErrorMessage name="name" component="p" className="error" />
              </div>
				</div>
				<div className="input-container-2">
				  <Field placeholder="Last name" name="lastname" type="text"  />
				  <div className="error-container">
                <ErrorMessage name="lastname" component="p" className="error" />
              </div>
				</div>
				<div className="input-container-2">
				  <Field placeholder="Dni" name="dni" type="text"  />
				  <div className="error-container">
					<ErrorMessage name="dni" component="p" className="error" />
				  </div>
				</div>
				<div className="input-container-2">
				  <Field placeholder="Address" name="address" type="text"  />
				  <div className="error-container">
                <ErrorMessage name="address" component="p" className="error" />
              </div>
				</div>
				<div className="input-container-2">
				<Field as="select" name="salaryId">
						<option value="">Select Salary</option>
						{store.salaries.map((salary) => (
							<option key={salary.id} value={salary.id}>{salary.gross_salary}</option>
						))}
						</Field>
						<div className="error-container">
                        <ErrorMessage name="salaryId" component="p" className="error" />
                        </div>
					<span>
					<i className="fa-light fa-dollar-sign"></i>
					</span>
				</div>
				<div className="input-container-2">
				<Field as="select" name="roleId">
						<option value="">Select Role</option>
						{store.roles.map((role) => (
							<option key={role.id} value={role.id}>{role.name}</option>
						))}
						</Field>
						<div className="error-container">
                        <ErrorMessage name="roleId" component="p" className="error" />
                        </div>
				</div>
				<div className="input-container-2">
				<Field as="select" name="departmentId">
						<option value="">Select Department</option>
						{store.departments.map((department) => (
							<option key={department.id} value={department.id}>{department.name}</option>
						))}
						</Field>
						<div className="error-container">
                        <ErrorMessage name="departmentId" component="p" className="error" />
                        </div>
					    <span>
						<i className="fa-regular fa-building"></i>
						</span>
				</div>
				<h5>Birth date</h5>
				<div className="input-container-2">
				  <Field placeholder="00/00/0000" name="birthDate" type="text"/>
				  <div className="error-container">
					<ErrorMessage name="birthDate" component="p" className="error" />
				  </div>
				  <span>
					<i className="fa-regular fa-calendar"></i>
				  </span>
				</div>
				<div className="input-container-2">
				  <Field placeholder="Email" name="email" type="email"  />
				  <div className="error-container">
                <ErrorMessage name="email" component="p" className="error" />
              </div>
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
			  </Form>
			</Formik>
		  </div>
		</>
	  );
	};