import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { ProfileFrame } from "../component/profileFrame";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.resetEmployeeData()
	}, [])

	return (
		<div className="form-style pb-5">
			<ProfileFrame />
		</div>
	);
};
