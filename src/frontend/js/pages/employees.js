import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/employees.css";
import { EmployeesList } from "../component/employeesList";

export const Employees = () => {
	const { store, actions } = useContext(Context);

	useEffect(()=>{
		actions.resetWorkerData()
	}, [])

	return (
		<div className="form-style pb-5">
			<EmployeesList/>
		</div>
	);
};

