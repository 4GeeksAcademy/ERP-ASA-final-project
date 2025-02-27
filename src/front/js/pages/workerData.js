import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { WorkerDataForm } from "../component/workerDataForm";

export const WorkerData = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	
	useEffect(()=>{
		actions.resetWorkerData()
	}, [])

	return (
		<div className="form-style pb-5">
			<WorkerDataForm id={params.id}/>
		</div>
	);
};

WorkerData.propTypes = {
	match: PropTypes.object
};
