import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/employees.css";
import { EmployeesList } from "../component/employeesList";

export const Employees = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="form-style">
			<EmployeesList/>
		</div>
	);
};

