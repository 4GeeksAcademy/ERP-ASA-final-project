import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { WorkerDataForm } from "../component/workerDataForm";

export const WorkerData = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	
	useEffect(()=>{
		console.log(params);
		actions.resetWorkerData()
	}, [])

	return (
		<div className="form-style flex-column">
			<WorkerDataForm id={params.id}/>
		</div>
	);
};

WorkerData.propTypes = {
	match: PropTypes.object
};
