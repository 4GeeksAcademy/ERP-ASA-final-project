import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { EmployeeTable } from "./employeeTable";
import { Link, useNavigate } from "react-router-dom";

export const EmployeeList = () => {

	const { store, actions } = useContext(Context);
	const [isHR, setIsHR] = useState(false);

	let navigate = useNavigate();

	useEffect(() => {
		actions.resetSelected()
		if (!store.auth) navigate("/")
		setTimeout(function(){
			if (store.personalData.department.name === "RRHH") {
			setIsHR(true);
			}
		}, 1000);

	}, [])

	const handleDelete = async () => {
		let logout = store.selected.find((id) => id === store.personalData.id)
		const promise = await actions.deleteWorker(store.selected)
		actions.getEmployeeList()
		navigate("/employees")
		if (logout && promise) {
			actions.logout()
			navigate("/")
		}
	}

	const handleEdit = async () => {
		
	}


	return (
		<>
			{store.auth ?
				<div className="container mt-3" action="#" id="employeesForm" method="POST">
					<div className="row d-flex justify-content-center align-items-center">
						{isHR && <div className="col-12 col-lg-6 d-flex justify-content-center gap-4 my-3" aria-label="Edit buttons">
							<Link className="col-3 fs-5" to="/signup">
								<button type="button" className="button w-100">Create</button>
							</Link>
							<Link className="col-3" to={"/signup"} onClick={() => actions.getEmployeeData(store.selected[0])}>
								<button type="button" className="button w-100" disabled={store.selected.length === 1 ? false : true}>Edit</button>
							</Link>
							<button type="button" className="button col-3" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled={store.selected.length > 0 ? false : true}>Delete</button>

							{/* <!-- Modal --> */}
							<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h1 className="modal-title fs-5" id="exampleModalLabel">Delete worker{store.selected.length !== 1 ? "s" : null}</h1>
											<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div className="modal-body">
											Are you sure you want to delete {store.selected.length === 1 ? "this worker" : (store.selected.length + " workers")}?
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
											<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Delete worker</button>
										</div>
									</div>
								</div>
							</div>
						</div>}
						<div className="search d-flex justify-content-center col-11 col-lg-6 my-3">
							<div id="searchForm" role="search" className="rounded-pill p-2 col-12 col-md-10">
								<i className="fa-solid fa-magnifying-glass col-1"></i>
								<input className="search-input border-0 col-11" type="search" placeholder="Search name" onChange={(e) => actions.filterList(e.target.value)} />
							</div>
						</div>
					</div>
					<div className="container col-11">
						<EmployeeTable />
					</div>
				</div>
				:
				<></>
			}
		</>
	)
}