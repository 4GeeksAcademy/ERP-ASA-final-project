import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const WorkerDataForm = (id) => {

	const { store, actions } = useContext(Context);
	const [isHR, setIsHR] = useState(false);

	let navigate = useNavigate();

	useEffect(() => {
		if (!store.auth) navigate("/")
		actions.getWorkerData(id.id)
		if (store.auth && (store.user.department === "RRHH" || store.workerData.id == store.user.id)) {
			setIsHR(true);
		}
	}, [store.workerData])


	const handleDelete = async () => {
		const promise = await actions.deleteWorker([store.workerData.id])
		actions.getEmployeesList()
		if (store.workerData.id === store.personalData.id && promise) {
			actions.logout()
			navigate("/")
		}
		navigate("/employees")
	}

	return (
		<>
			<div className="container mt-5">
				<div className="row col-11 card align-items-center mx-auto border-0">
					<div className="row card-header text-center text-white">
						<h3>Worker personal data</h3>
					</div>

					<div className="card-body row justify-content-center">
						<div className="text-center my-2 img-container col-lg-4 col-11 d-flex justify-content-center align-items-center">
							<img src={store.workerData.profile_image_url || "https://cdn-icons-png.flaticon.com/512/3736/3736502.png"} className="rounded profile-img col-lg-12 col-5" alt="Foto del trabajador" />

						</div>
						{store.workerData ?
							<>
								<ul className="col-lg-8 col-12 list-group list-group-flush">
									<li className="list-group-item"><strong>Name:</strong> {store.workerData.name}</li>
									<li className="list-group-item"><strong>Last Name:</strong> {store.workerData.last_name}</li>
									{isHR && <li className="list-group-item"><strong>DNI:</strong> {store.workerData.dni}</li>}
									{isHR && <li className="list-group-item"><strong>Address:</strong> {store.workerData.address}</li>}
									{isHR && <li className="list-group-item"><strong>Email:</strong> {store.workerData.email}</li>}
									{isHR && <li className="list-group-item"><strong>Birthdate:</strong> {store.workerData.birthdate}</li>}
									{isHR && <li className="list-group-item"><strong>Salary:</strong> {store.workerData.salary?.gross_salary}</li>}
									<li className="list-group-item"><strong>Department:</strong> {store.workerData.department?.name}</li>
									<li className="list-group-item"><strong>Role:</strong> {store.workerData.role?.name}</li>
								</ul>
							</>
							: null}
					</div>
					{isHR && <div className="card-footer text-center border-0">
						<Link to={"/signup"}>
							<button className="btn button me-2 w-25">Edit</button>
						</Link>
						<button type="button" className="button w-25" data-bs-toggle="modal" data-bs-target="#exampleModal2">Delete</button>

						{/* <!-- Modal --> */}
						<div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id="exampleModalLabel">Delete {store.workerData.name + " " + store.workerData.last_name}</h1>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										Are you sure you want to delete {store.workerData.name + " " + store.workerData.last_name} as worker?
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
										<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Delete worker</button>
									</div>
								</div>
							</div>
						</div>
					</div>}
				</div>
			</div>
		</>
	)
};