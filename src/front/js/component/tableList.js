import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const TableList = () => {

	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getEmployeesList();
	}, [])


	return (
		<>
			<div className="list row">
				<table className="table mt-4 align-self-center">
					<thead>
						<tr>
							<th className="check-row text-end bg-white border-0">
								<input type="checkbox" name="id" value="-1"/>
							</th>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Last Name</th>
							<th scope="col">Email</th>
							<th scope="col">Department</th>
							<th scope="col">Role</th>
							<th scope="col">Salary</th>
						</tr>
					</thead>
					<tbody>
						{
							store.employeesList.map((item, index) => {
								return (
									<tr key={item.id}>
										<th className="check-row text-end bg-white border-0">
											<input type="checkbox" name="id" value={item.id} onClick={() => actions.setSelected(item.id)}/>
										</th>
										<th scope="row">{index + 1}</th>
										<td>{item.name}</td>
										<td>{item.lastname}</td>
										<td>{item.email}</td>
										<td>{item.department ? item.department.name : "No Department"}</td>
										<td>{item.role ? item.role.name : "No Role"}</td>
										<td>{item.salary ? item.salary.gross_salary : "No Data"}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		</>
	)
}