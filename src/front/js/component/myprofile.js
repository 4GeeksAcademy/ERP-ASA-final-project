import React, { useContext, useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const MyProfile = () => {

	const { store, actions } = useContext(Context);
	const [isHR, setIsHR] = useState(false);

	let navigate = useNavigate();
	//console.log("Departamento del usuario:", store.user.department);
	useEffect(() => {
		actions.getProfile()
        // Obtener el departamento del usuario logueado desde localStorage
        if (store.personalData.id==store.user.id || store.user.department === "RRHH") {
            setIsHR(true);
        }
	}, [store.auth])

	const deleteMyProfile = () => {
		actions.deleteWorker([store.personalData.id])
		actions.logout()
		navigate("/")
	}

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
									<li className="list-group-item"><strong>Last Name:</strong> {store.personalData.last_name}</li>
									<li className="list-group-item"><strong>DNI:</strong> {store.personalData.dni}</li>
									<li className="list-group-item"><strong>Address:</strong> {store.personalData.address}</li>
									<li className="list-group-item"><strong>Email:</strong> {store.personalData.email}</li>
									<li className="list-group-item"><strong>Birthdate:</strong> {store.personalData.birthdate}</li>
									<li className="list-group-item"><strong>Salary:</strong> {store.personalData.salary?.gross_salary}</li>
									<li className="list-group-item"><strong>Department:</strong> {store.personalData.department?.name}</li>
									<li className="list-group-item"><strong>Role:</strong> {store.personalData.role?.name}</li>
								</ul>
							</div>
						</>
						: null}
				</div>
			</div>
		</>
	)
}