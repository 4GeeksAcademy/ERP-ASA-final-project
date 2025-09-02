import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/signup.css";
import { SignupForm } from "./signupform";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="form-style flex-column pb-5">
			<p className="form-title-2 mt-4 px-3">{store.employeeData.id ? "Update the data" : "Add a new worker"}</p>
			<SignupForm />
		</div>
	);
};
