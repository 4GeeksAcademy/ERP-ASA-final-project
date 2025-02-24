import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const TableList = () => {
    const { store, actions } = useContext(Context);
    const [isHR, setIsHR] = useState(false);

    useEffect(() => {
        actions.getEmployeesList();

        // Obtener el departamento del usuario logueado desde localStorage
        if (store.user.department === "RRHH") {
            setIsHR(true);
        }
    }, []);

    return (
        <>
            <div className="list row">
                <table className="table mt-4 align-self-center">
                    <thead>
                        <tr>
                            <th className="check-row text-end bg-white border-0">
                                <input type="checkbox" name="id" value="-1" />
                            </th>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Role</th>
                            {isHR && <th scope="col">Email</th>}
                            {isHR && <th scope="col">Salary</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {store.employeesList.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <th className="check-row text-end bg-white border-0">
                                        <input
                                            type="checkbox"
                                            name="id"
                                            value={item.id}
                                            onClick={() => actions.setSelected(item.id)}
                                        />
                                    </th>
                                    <th scope="row">
                                        <Link to={"/worker/" + item.id}>{index + 1}</Link>
                                    </th>
                                    <td>
                                        <Link to={"/worker/" + item.id}>{item.name}</Link>
                                    </td>
                                    <td>
                                        <Link to={"/worker/" + item.id}>{item.last_name}</Link>
                                    </td>
                                    <td>{item.department ? item.department.name : "No Department"}</td>
                                    <td>{item.role ? item.role.name : "No Role"}</td>
                                    {isHR && <td>{item.email}</td>}
                                    {isHR && <td>{item.salary ? item.salary.gross_salary : "No Data"}</td>}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};