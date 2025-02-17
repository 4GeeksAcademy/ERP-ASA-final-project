import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { TableList } from "./tableList";

export const EmployeesList = () => {

	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="container mt-3" action="#" id="employeesForm" method="POST">
				<div className="row d-flex justify-content-between align-items-center">
					<div className="search col-11 col-lg-4">
						<div className="">
							<div id="searchForm" role="search" className="rounded-pill p-2">
								<i className="fa-solid fa-magnifying-glass col-1"></i>
								<input className="search-input border-0 col-11" type="search" placeholder="Search" />
							</div>
						</div>
					</div>
					<div className="col-11 col-lg-6 d-flex justify-content-around my-3" aria-label="Edit buttons">
						<button type="button" className="btn fs-4 col-3" onClick={() => actions.deleteWorker(store.selected[0])}>Delete</button>
						<button type="button" className="btn fs-4 col-3">Edit</button>
						<button type="button" className="btn fs-4 col-3">Create</button>
					</div>
				</div>
				<div className="container col-11">
					<TableList/>
				</div>
			</div>
		</>
	)
}