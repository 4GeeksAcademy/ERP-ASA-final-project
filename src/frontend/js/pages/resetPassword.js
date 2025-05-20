import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { ResetPasswordForm } from "../component/resetPasswordForm";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

export const ResetPassword = (props) => {

	const { store, actions } = useContext(Context);
	const params = useParams();
	useEffect(() => {
		actions.resetWorkerData();
	}, [])

	return (
		<div className="container my-3 pb-5">
			<ResetPasswordForm token={params.token} />
		</div>
	);
};

ResetPassword.propTypes = {
	match: PropTypes.object
};
