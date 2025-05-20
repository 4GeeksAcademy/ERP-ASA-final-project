import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { MyProfile } from "../component/myprofile";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	useEffect(()=>{
		actions.resetWorkerData()
	}, [])

	return (
		<div className="form-style pb-5">
			<MyProfile/>
		</div>
	);
};
