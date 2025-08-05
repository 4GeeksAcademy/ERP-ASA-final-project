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
	}, [store.employeeData])

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
		birthDate: Yup.string()
			.matches(
				/^\d{2}\/\d{2}\/\d{4}$/,
				"Birth date must be in the format DD/MM/YYYY"
			)
			.required("Birth date is required")
	});

	return (
		<>
			<div className="form-container-2 container d-flex flex-column align-items-center">
				<Formik
					initialValues={
						store.employeeData.name ? {
							name: store.employeeData.name,
							lastname: store.employeeData.last_name,
							dni: store.employeeData.dni,
							address: store.employeeData.address,
							birthDate: store.employeeData.birthdate,
							email: store.employeeData.email,
							departmentId: "",
							salaryId: "",
							roleId: "",
						} :
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
							}}
					validationSchema={validationSchema}
					onSubmit={async (values) => {
						if (values.name) console.log("name ok")
						if (values.lastname) console.log("lastname ok")
						if (values.dni) console.log("dni ok")
						if (values.address) console.log("adress ok")
						if (values.email) console.log("email ok")
						if (values.birthDate) console.log("birthdate ok")
						if (values.departmentId) console.log("department ok")
						if (values.salaryId) console.log("salary ok")
						if (file) console.log("file: " + file.name)
						const success = await actions.addEmployee(values.name, values.lastname, values.dni, values.address, values.email, values.birthDate, parseInt(values.departmentId), parseInt(values.salaryId), file)
						

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
					<Form className="row d-flex justify-content-around form-2 m-0 w-100">
						<div className="input-container-2 col-md-5 ">
							<h5 className="strong-background">Name</h5>
							<Field placeholder="Name" name="name" type="text" />
							<div>
								<ErrorMessage name="name" component="p" className="error text-danger" />
							</div>
						</div>
						<div className="input-container-2 col-md-5">
							<h5 className="strong-background">Last name</h5>
							<Field placeholder="Last name" name="lastname" type="text" />
							<div>
								<ErrorMessage name="lastname" component="p" className="error text-danger" />
							</div>
						</div>
						<div className="input-container-2 col-md-5">
							<h5 className="strong-background">DNI</h5>
							<Field placeholder="Dni" name="dni" type="text" />
							<div>
								<ErrorMessage name="dni" component="p" className="error text-danger" />
							</div>
						</div>
						<div className="input-container-2 col-md-5">
							<h5 className="strong-background">Address</h5>
							<Field placeholder="Address" name="address" type="text" />
							<div>
								<ErrorMessage name="address" component="p" className="error text-danger" />
							</div>
						</div>
						<div className="input-container-2 col-md-5">
							<h5 className="strong-background">Birth date</h5>
							<Field placeholder="00/00/0000" name="birthDate" type="text" />
							<div>
								<ErrorMessage name="birthDate" component="p" className="error text-danger" />
							</div>
						</div>
						<div className="input-container-2 col-md-5">
							<h5 className="strong-background">Salary</h5>
							<Field as="select" name="salaryId">
								<option value="">Select Salary</option>
								{store.salaries.map((salary) => (
									<option key={salary.id} value={salary.id}>{salary.gross_salary}</option>
								))}
							</Field>
							<div>
								<ErrorMessage name="salaryId" component="p" className="error text-danger" />
							</div>
						</div>
						<div className="input-container-2 col-md-5">
							<h5 className="strong-background">Department</h5>
							<Field as="select" name="departmentId">
								<option value="">Select Department</option>
								{store.departments.map((department) => (
									<option key={department.id} value={department.id}>{department.name}</option>
								))}
							</Field>
							<div>
								<ErrorMessage name="departmentId" component="p" className="error text-danger" />
							</div>
						</div>
						<div className="input-container-2 col-md-5">
							<h5 className="strong-background">Email</h5>
							<Field placeholder="Email" name="email" type="email" />
							<div>
								<ErrorMessage name="email" component="p" className="error text-danger" />
							</div>
						</div>
						<div className="input-container-2 col-md-5">
							<h5 className="strong-background">Profile Image</h5>
							<input type="file" onChange={handleFileChange} />
						</div>
						<button className="submit-2 col-10 mt-4" type="submit">
							Send
						</button>
					</Form>
				</Formik>
			</div>
		</>
	);
};