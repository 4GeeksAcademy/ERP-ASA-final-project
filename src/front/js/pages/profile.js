import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { MyProfile } from "../component/myprofile";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="form-style">
			<MyProfile/>
		</div>
	);
};
