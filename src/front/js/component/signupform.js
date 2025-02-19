import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const SignupForm = () => {

const { actions } = useContext(Context);
const navigate = useNavigate();

const [name, setName] = useState("");
const [last_name, setLastName] = useState("");
const [dni, setDni] = useState("");
const [address, setAddress] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [birthdate, setBirthdate] = useState("");
const [department_id, setDepartmentId] = useState("");
const [salary_id, setSalaryId] = useState("");
const [role_id, setRoleId] = useState("");

const [departments, setDepartments] = useState([]);
const [salaries, setSalaries] = useState([]);
const [roles, setRoles] = useState([]);


useEffect(() => {
	const fetchData = async () => {
		try {
			const deptResponse = await fetch(process.env.BACKEND_URL + "/api/departments");
			const salaryResponse = await fetch(process.env.BACKEND_URL + "/api/salaries");
			const roleResponse = await fetch(process.env.BACKEND_URL + "/api/roles");

			const deptData = await deptResponse.json();
			const salaryData = await salaryResponse.json();
			const roleData = await roleResponse.json();

			setDepartments(deptData);
			setSalaries(salaryData);
			setRoles(roleData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	fetchData();
}, []);

const handleSubmit = async (e) => {
	e.preventDefault();
	const success = await actions.addWorker(name, last_name, dni, address, email, password, birthdate, parseInt(department_id), parseInt(salary_id), parseInt(role_id));
	if (success) {
		navigate("/profile");
	} else {
		alert("Error adding worker");
	}
};

return (
	<>
		<div className="form-container-2">
			<p className="form-title-2">Sign up on our ERP</p>
			<form className="form-2" onSubmit={handleSubmit}>
				<div className="input-container-2">
					<input placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
				</div>
				<div className="input-container-2">
					<input placeholder="Last name" type="text" onChange={(e) => setLastName(e.target.value)} />
				</div>
				<div className="input-container-2">
					<input placeholder="Dni" type="text" onChange={(e) => setDni(e.target.value)} />
				</div>
				<div className="input-container-2">
					<input placeholder="Address" type="text" onChange={(e) => setAddress(e.target.value)} />
				</div>
				
				<div className="input-container-2">
					<select onChange={(e) => setSalaryId(e.target.value)}>
						<option value="">Select Salary</option>
						{salaries.map((salary) => (
							<option key={salary.id} value={salary.id}>{salary.gross_salary}</option>
						))}
					</select>
					<span><i className="fa-light fa-dollar-sign"></i></span>
				</div>

				<div className="input-container-2">
					<select onChange={(e) => setRoleId(e.target.value)}>
						<option value="">Select Role</option>
						{roles.map((role) => (
							<option key={role.id} value={role.id}>{role.name}</option>
						))}
					</select>
				</div>

				<div className="input-container-2">
					<select onChange={(e) => setDepartmentId(e.target.value)}>
						<option value="">Select Department</option>
						{departments.map((department) => (
							<option key={department.id} value={department.id}>{department.name}</option>
						))}
					</select>
					<span><i className="fa-regular fa-building"></i></span>
				</div>

				<h5>Birth date</h5>
				<div className="input-container-2">
					<input placeholder="00/00/0000" type="text" onChange={(e) => setBirthdate(e.target.value)} />
					<span><i className="fa-regular fa-calendar"></i></span>
				</div>
				<div className="input-container-2">
					<input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
					<span>
						<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
						</svg>
					</span>
				</div>
				<div className="input-container-2">
					<input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
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
			</form>
		</div>
	</>
);
};
