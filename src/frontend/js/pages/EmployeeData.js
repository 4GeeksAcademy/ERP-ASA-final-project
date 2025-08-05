import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { EmployeeDataFrame } from "../component/EmployeeDataFrame";

export const EmployeeData = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	
	useEffect(()=>{
		actions.resetEmployeeData()
	}, [])

	return (
		<div className="form-style pb-5">
			<EmployeeDataFrame id={params.id}/>
		</div>
	);
};

EmployeeData.propTypes = {
	match: PropTypes.object
};
