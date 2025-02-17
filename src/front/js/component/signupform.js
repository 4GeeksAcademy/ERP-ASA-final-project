import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const SignupForm = () => {

	const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [dni, setDni] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [departmentId, setDepartmentId] = useState("")
    const [salaryId, setSalaryId] = useState("")
    const [roleId, setRoleId] = useState("")
    const {store,actions} = useContext(Context)

    let navigate = useNavigate();

	useEffect(()=>{
		if (!store.auth) navigate("/")
	}, [])

    async function handleSubmit(e) {
        e.preventDefault()
        // actions.addWorker(name, lastname, dni, address, email, password, birthdate, departmentId, salaryId, roleId);
        actions.addWorker(name, lastname, dni, address, email, password, birthdate);
		navigate("/")
	}
        
    
	return (
		<>
			<div className="form-container-2">
				<p className="form-title-2">Sign up on our ERP</p>
				<form className="form-2" onSubmit={handleSubmit}>
					<div className="input-container-2">
						<input placeholder="Name" type="text" onChange={(e)=>setName(e.target.value)}/>
					</div>
					<div className="input-container-2">
						<input placeholder="Last name" type="text" onChange={(e)=>setLastname(e.target.value)} />
					</div>
					<div className="input-container-2">
						<input placeholder="Dni" type="text" onChange={(e)=>setDni(e.target.value)} />
					</div>
					<div className="input-container-2">
						<input placeholder="Address" type="text" onChange={(e)=>setAddress(e.target.value)} />
					</div>
					<div className="input-container-2">
						<input placeholder="Salary" type="text" onChange={(e)=>setSalaryId(e.target.value)} />
						<span>
						<i className="fa-light fa-dollar-sign"></i>
						</span>
					</div>
					<div className="input-container-2">
						<input placeholder="Role" type="text" onChange={(e)=>setRoleId(e.target.value)} />
					</div>
					<div className="input-container-2">
						<input placeholder="Department" type="text" onChange={(e)=>setDepartmentId(e.target.value)} />
						<span>
						<i className="fa-regular fa-building"></i>
						</span>
					</div>
					<h5>Birth date</h5>
					<div className="input-container-2">
						<input placeholder="00/00/0000" type="text" onChange={(e)=>setBirthdate(e.target.value)} />
						<span>
						<i className="fa-regular fa-calendar"></i>
						</span>
					</div>
					<div className="input-container-2">
						<input placeholder="Email" type="email" onChange={(e)=>setEmail(e.target.value)} />
						<span>
							<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
							</svg>
						</span>
					</div>
					<div className="input-container-2">
						<input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
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
	)
}