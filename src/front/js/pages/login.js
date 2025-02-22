import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { LoginForm } from "../component/loginform";

export const Login = () => {
	const { store, actions } = useContext(Context);

	useEffect(()=>{
		actions.resetWorkerData()
	}, [])

	return (
		<div className="form-style">
			<LoginForm/>
		</div>
	);
};
