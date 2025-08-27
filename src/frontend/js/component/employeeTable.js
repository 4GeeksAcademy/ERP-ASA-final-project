import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const EmployeeTable = () => {
	const { store, actions } = useContext(Context);
	const [isHR, setIsHR] = useState(false);
	//const [EmployeeList, setEmployeeList] = useState([])
	const [allEmployees, setAllEmployees] = useState(false)


	useEffect(() => {
		actions.getEmployeeList()
		console.log(store.personalData.department.name);
		setTimeout(function(){
			if (store.personalData.department.name === "RRHH") {
			setIsHR(true);
			}
		}, 1000);
	}, [])

	const handleAllEmployees = () => {
		!allEmployees ?
			store.employeeList.map((item) => {
				if (!store.selected.some((selectedId) => selectedId == item.id)) actions.setSelected(item.id);
			})
			:
			actions.resetSelected();

		setAllEmployees(!allEmployees);
		return true
	}
	const handleCheckedId = (id) => {
		if (allEmployees) setAllEmployees(false)
		actions.setSelected(id)
		return true
	}


	return (
		<>
			<div className="list row">
				<table className="table mt-4 align-self-center">
					<thead>
						<tr>
							<th className="check-row text-end bg-white border-0">
								<input type="checkbox" name="id" value="-1" onChange={handleAllEmployees} checked={allEmployees} />
							</th>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Last Name</th>
							{isHR && <th scope="col">Email</th>}
							<th scope="col">Department</th>
							{isHR && <th scope="col">Salary</th>}
						</tr>
					</thead>
					<tbody>
						{
							store.employeeList.map((item, index) => {
								return (
									<tr key={item.id}>
										<th className="check-row text-end bg-white border-0">
											<input type="checkbox" name="id" value={item.id} onClick={() => handleCheckedId(item.id)} checked={store.selected.some((selectedId) => selectedId == item.id)} readOnly />
										</th>
										<th scope="row"><Link to={"/employee/" + item.id}>{index + 1}</Link></th>
										<td><Link to={"/employee/" + item.id}>{item.name}</Link></td>
										<td>{item.last_name}</td>
										{isHR && <td>{item.email}</td>}
										<td>{item.department ? item.department.name : "No Department"}</td>
										{isHR && <td>{item.salary ? item.salary.gross_salary : "No Data"}</td>} 
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

