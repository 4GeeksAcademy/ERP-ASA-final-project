import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const WorkerDataForm = (id) => {

	const { store, actions } = useContext(Context);

	let navigate = useNavigate();

	useEffect(() => {
		!store.auth ? navigate("/") : null
		actions.getWorkerData(id.id)
	}, [store.workerData])

	const deleteProfile = () => {
		actions.deleteWorker([store.workerData.id])
		navigate("/employees")
	}

	return (
		<>
			<div className="container mt-5">
				<div className="row col-11 card mx-auto">
					<div className="row card-header text-center text-white">
						<h3>Worker personal data</h3>
					</div>
					<div className="card-body row">
						<div className="text-center mb-3 img-container col-lg-4 col-11 d-flex align-items-center">
							<img src="https://cdn-icons-png.flaticon.com/512/3736/3736502.png" className="rounded-circle profile-img col-lg-12 col-5" alt="Foto del trabajador" />
						</div>
						{store.workerData ?
							<>
								<ul className="col-lg-8 col-12 list-group list-group-flush">
									<li className="list-group-item"><strong>Name:</strong> {store.workerData.name}</li>
									<li className="list-group-item"><strong>Last Name:</strong> {store.workerData.lastname}</li>
									<li className="list-group-item"><strong>DNI:</strong> {store.workerData.dni}</li>
									<li className="list-group-item"><strong>Address:</strong> {store.workerData.address}</li>
									<li className="list-group-item"><strong>Email:</strong> {store.workerData.email}</li>
									<li className="list-group-item"><strong>Birthdate:</strong> {store.workerData.birthdate}</li>
									<li className="list-group-item"><strong>Salary:</strong> {store.workerData.salary?.gross_salary}</li>
									<li className="list-group-item"><strong>Department:</strong> {store.workerData.department?.name}</li>
									<li className="list-group-item"><strong>Role:</strong> {store.workerData.role?.name}</li>
								</ul>
							</>
							: null}
					</div>
					<div className="card-footer text-center">
						<Link to={"/signup"}>
							<button className="btn me-2">Editar</button>
						</Link>
						<Link to="/">
							<button className="btn" onClick={() => deleteProfile()}>Eliminar</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
};