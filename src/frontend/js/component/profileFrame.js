import React, { useContext, useEffect, useState } from "react";
import { decodeJWT } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ProfileFrame = () => {

	const { store, actions } = useContext(Context);
	const [isHR, setIsHR] = useState(false);

	let navigate = useNavigate();

	useEffect(() => {
		if (!store.auth) {
			navigate("/");
			return;
		}

		const token = localStorage.getItem("token");
		if (token) {
			const decoded = decodeJWT(token);
			const userId = decoded.employee_id; 

			if (userId) {
				actions.getEmployeeById(userId);
			}
		}
	}, [store.auth]);

	// useEffect(() => {
	// 	if (!store.auth) navigate("/")
	// 	// actions.getProfile()
	// 	actions.getEmployeeById()
	// }, [store.auth])

	return (
		<>
			<div className="container mt-3">
				<div className="row col-11 card align-items-center mx-auto border-0">
					<div className="row card-header text-center text-white">
						<h3>My personal data</h3>
					</div>
					{store.auth ?
						<>

							<div className="card-body row justify-content-center">
								<div className="text-center my-2 img-container col-lg-4 col-11 d-flex justify-content-center align-items-center">
									<img src={store.personalData.profile_image_url || "https://cdn-icons-png.flaticon.com/512/3736/3736502.png"} className="rounded profile-img col-lg-12 col-5" alt="Foto del trabajador" />

								</div>
								<ul className="col-lg-8 col-12 list-group list-group-flush">
									<li className="list-group-item"><strong>Name:</strong> {store.personalData.name}</li>
									<li className="list-group-item"><strong>Last Name:</strong> {store.personalData.last_name}</li>
									<li className="list-group-item"><strong>DNI:</strong> {store.personalData.dni}</li>
									<li className="list-group-item"><strong>Address:</strong> {store.personalData.address}</li>
									<li className="list-group-item"><strong>Email:</strong> {store.personalData.email}</li>
									<li className="list-group-item"><strong>Birthdate:</strong> {store.personalData.birthdate}</li>
									<li className="list-group-item"><strong>Salary:</strong> {store.personalData.salary?.gross_salary}</li>
									<li className="list-group-item"><strong>Department:</strong> {store.personalData.department?.name}</li>
								</ul>
							</div>
						</>
						: null}
				</div>
			</div>
		</>
	)
}