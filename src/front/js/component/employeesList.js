import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { TableList } from "./tableList";

export const EmployeesList = () => {

	return (
		<>
			<div className="container mt-3 ">
				<div className="row d-flex justify-content-between align-items-center">
					<div className="search col-12 col-lg-4">
						<div className="">
							<form id="searchForm" role="search" className="rounded-pill p-2">
								<i className="fa-solid fa-magnifying-glass col-1"></i>
								<input className="search-input border-0 col-11" type="search" placeholder="Search" />
							</form>
						</div>
					</div>
					<div className="col-12 col-lg-6 d-flex justify-content-around mt-3" aria-label="Edit buttons">
						<button type="button" className="btn fs-4 col-3">Delete</button>
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