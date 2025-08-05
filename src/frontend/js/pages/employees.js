import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/employees.css";
import { EmployeeList } from "../component/employeeList";

export const Employees = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.resetEmployeeData()
	}, [])

	return (
		<div className="form-style pb-5">
			<EmployeeList />
		</div>
	);
};

