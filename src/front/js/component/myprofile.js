import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const MyProfile = () => {

	const { store, actions } = useContext(Context);

	let navigate = useNavigate();

	useEffect(() => {
		actions.getProfile()
		
	}, [store.auth])

	return (
		<>
			<div className="container mt-5">
				<div className="row col-11 card mx-auto">
					<div className="row card-header text-center text-white">
						<h3>My personal data</h3>
					</div>
					{store.auth ?
						<>
							<div className="card-body row">
								<div className="text-center mb-3 img-container col-lg-4 col-11 d-flex align-items-center">
									<img src="https://cdn-icons-png.flaticon.com/512/3736/3736502.png" className="rounded-circle profile-img col-lg-12 col-5" alt="Foto del trabajador" />
								</div>
								<ul className="col-lg-8 col-12 list-group list-group-flush">
									<li className="list-group-item"><strong>Name:</strong> {store.personalData.name}</li>
									<li className="list-group-item"><strong>Last Name:</strong> {store.personalData.lastname}</li>
									<li className="list-group-item"><strong>DNI:</strong> {store.personalData.dni}</li>
									<li className="list-group-item"><strong>Email:</strong> {store.personalData.email}</li>
									<li className="list-group-item"><strong>Address:</strong> {store.personalData.address}</li>
									<li className="list-group-item"><strong>Salary:</strong> {store.personalData.salary}</li>
									<li className="list-group-item"><strong>Department:</strong> {store.personalData.department}</li>
									<li className="list-group-item"><strong>Role:</strong> {store.personalData.role}</li>
									<li className="list-group-item"><strong>Level:</strong> {store.personalData.level}</li>
								</ul>
							</div>
							<div className="card-footer text-center">
								<button className="btn me-2">Editar</button>
								<Link to="/">
									<button className="btn" onClick={() => actions.deleteWorker(store.personalData.id)}>Eliminar</button>
								</Link>
							</div>
						</>
						: null}
				</div>
			</div>
		</>
	)
}