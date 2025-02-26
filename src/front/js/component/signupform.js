import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";


export const SignupForm = () => {

	const { store, actions } = useContext(Context)
	const navigate = useNavigate();
	const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

	useEffect(() => {
		if (!store.auth) navigate("/")
		actions.fetchData();
	}, [store.workerData])

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
			<div className="form-container-2 container d-flex flex-column align-items-center">
				<Formik
					initialValues={ 
						 store.workerData.name ? {
							name: store.workerData.name,
							lastname: store.workerData.last_name,
							dni: store.workerData.dni,
							address: store.workerData.address,
							birthDate: store.workerData.birthdate,
							email: store.workerData.email,
							departmentId: "",
							salaryId: "",
							roleId: "",
							password: ""
						}: 
					{
						name: "",
						lastname: "",
						dni: "",
						address: "",
						birthDate: "",
						email: "",
						departmentId: "",
						salaryId: "",
						roleId: "",
						password: ""
					}}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						let success;
						if (store.workerData.id) {
							success = actions.editWorker(store.workerData.id, values.name, values.lastname, values.dni, values.address, values.email, values.password, values.birthDate, parseInt(values.departmentId), parseInt(values.salaryId), parseInt(values.roleId),file)
						} else {
							success = actions.addWorker(values.name, values.lastname, values.dni, values.address, values.email, values.password, values.birthDate, parseInt(values.departmentId), parseInt(values.salaryId), parseInt(values.roleId),file)
						}
						console.log(success);
						
						if (success) {
							navigate("/profile")
						}
						else {
							alert("Error adding worker")
							navigate("/")
						}
						return true
					}}
				>

					<Form className="row d-flex justify-content-center gap-3 form-2 m-0">
						<div className="col-11 col-md-5">
							<h5>Name</h5>
							<div className="input-container-2">
								<Field placeholder="Name" name="name" type="text" />
								<div className="error-container">
									<ErrorMessage name="name" component="p" className="error" />
								</div>
							</div>
							<h5>Last name</h5>
							<div className="input-container-2">
								<Field placeholder="Last name" name="lastname" type="text" />
								<div className="error-container">
									<ErrorMessage name="lastname" component="p" className="error" />
								</div>
							</div>
							<h5>DNI</h5>
							<div className="input-container-2">
								<Field placeholder="Dni" name="dni" type="text" />
								<div className="error-container">
									<ErrorMessage name="dni" component="p" className="error" />
								</div>
							</div>
							<h5>Address</h5>
							<div className="input-container-2">
								<Field placeholder="Address" name="address" type="text" />
								<div className="error-container">
									<ErrorMessage name="address" component="p" className="error" />
								</div>
							</div>
							<h5>Birth date</h5>
							<div className="input-container-2">
								<Field placeholder="00/00/0000" name="birthDate" type="text" />
								<div className="error-container">
									<ErrorMessage name="birthDate" component="p" className="error" />
								</div>
							</div>
						</div>
						<div className="col-11 col-md-5">
							<h5>Salary</h5>
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
							</div>
							<div className="input-container-2">
								<h5>Role</h5>
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
							<h5>Department</h5>
							<div className="input-container-2"><Field as="select" name="departmentId">
								<option value="">Select Department</option>
								{store.departments.map((department) => (
									<option key={department.id} value={department.id}>{department.name}</option>
								))}
							</Field>
								<div className="error-container">
									<ErrorMessage name="departmentId" component="p" className="error" />
								</div>
							</div>
							<h5>Email</h5>
							<div className="input-container-2">
								<Field placeholder="Email" name="email" type="email" />
								<div className="error-container">
									<ErrorMessage name="email" component="p" className="error" />
								</div>
							</div>
							<h5>Password</h5>
							<div className="input-container-2">
								<Field placeholder="Password" name="password" type="password" />
								<div className="error-container">
									<ErrorMessage name="password" component="p" className="error" />
								</div>
							</div>
							<h5>Profile Image</h5>
							<div className="input-container-2">
                        		<input type="file" onChange={handleFileChange} />
							</div>
						</div>
						<button className="submit-2 col-10" type="submit">
							Send
						</button>
					</Form>
				</Formik>
			</div>
		</>
	);
};