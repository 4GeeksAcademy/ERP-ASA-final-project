import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { TableList } from "./tableList";
import { Link, useNavigate } from "react-router-dom";

export const EmployeesList = () => {
    const { store, actions } = useContext(Context);
    let navigate = useNavigate();

	useEffect(()=>{
		actions.resetSelected()
		if (!store.auth) navigate("/")
	}, [])

	const handleDelete = async () => {
		let logout = store.selected.find((id) => id === store.personalData.id)
		const promise = await actions.deleteWorker(store.selected)
		
		if (logout && promise) {
			actions.logout()
			navigate("/")
		}
	}


	return (
		<>
			{store.auth ?
				<div className="container mt-3" action="#" id="employeesForm" method="POST">
					<div className="row d-flex justify-content-between align-items-center">
						<div className="search col-11 col-lg-4">
							<div id="searchForm" role="search" className="rounded-pill p-2">
								<i className="fa-solid fa-magnifying-glass col-1"></i>
								<input className="search-input border-0 col-11" type="search" placeholder="Search" />
							</div>
						</div>
						<div className="col-11 col-lg-6 d-flex justify-content-end gap-3 my-3" aria-label="Edit buttons">
							{store.selected.length === 1 ? 
							<Link className="col-3" to={"/signup"} onClick={() => actions.getWorkerData(store.selected[0])}>
								<button type="button" className="btn fs-4 w-100">Edit</button>
							</Link>
							: null}
							<button type="button" className="btn fs-4 col-3" onClick={handleDelete}>Delete</button>
							<Link className="col-3" to="/signup">
								<button type="button" className="btn fs-4 w-100">Create</button>
							</Link>
						</div>
					</div>
					<div className="container col-11">
						<TableList />
					</div>
				</div>
				:
				<></>
			}
		</>
	)
}