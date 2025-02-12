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
							<div className="check-row text-end bg-white border-0">
								<input type="checkbox" />
							</div>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Last Name</th>
							<th scope="col">DNI</th>
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
										<div className="check-row text-end bg-white border-0">
											<input type="checkbox" />
										</div>
										<th scope="row">{index + 1}</th>
										<td>{item.name}</td>
										<td>{item.lastName}</td>
										<td>{item.dni}</td>
										<td>{item.email}</td>
										<td>{item.department}</td>
										<td>{item.role}</td>
										<td>{item.salary}</td>
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