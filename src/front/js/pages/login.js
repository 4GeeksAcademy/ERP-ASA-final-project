import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { LoginForm } from "../component/loginform";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="form-style">
			<LoginForm/>
		</div>
	);
};
