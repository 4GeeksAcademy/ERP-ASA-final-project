import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {

	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.resetWorkerData()
	}, [])

	return (
		<div className="container my-5">
			<section className="text-center text-white d-flex flex-column justify-content-center align-items-center medium-background p-5">
				<h1 className="fw-bold">Optimise Human Resource Management</h1>
				<p className="mt-3 section">
					Automate processes, improve efficiency and make better decisions with our HR module integrated into your ERP.
				</p>
				<button className="btn-demo mt-3">
					<div className="svg-wrapper-1">
						<div className="svg-wrapper">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<path fill="none" d="M0 0h24v24H0z"></path>
								<path
									fill="currentColor"
									d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
								></path>
							</svg>
						</div>
					</div>
					<span>Demo</span>
				</button>
			</section>
			<section className="container py-5">
				<h2 className="text-center strong-background">Why choose our module?</h2>
				<div className="row mt-4">
					<div className="col-md-4 text-center p-4 reason">
						<i className="bi bi-people-fill feat strong-background"></i>
						<h4 className="darkblue-text">Employee management</h4>
						<p className="darkblue-text">Manage employee profiles, roles and permissions easily.</p>
					</div>
					<div className="col-md-4 text-center p-4 reason">
						<i className="bi bi-clock-history feat strong-background"></i>
						<h4 className="darkblue-text">Attendance control</h4>
						<p className="darkblue-text">It registers timetables, absences and holidays automatically.</p>
					</div>
					<div className="col-md-4 text-center p-4 reason">
						<i className="bi bi-bar-chart-line feat strong-background"></i>
						<h4 className="darkblue-text">Intelligent reporting</h4>
						<p className="darkblue-text">Get detailed reports to make strategic decisions.</p>
					</div>
				</div>
			</section>
			<section className="py-5 light-background">
				<h2 className="text-center darkblue-text">What our customers say</h2>
				<div className="container mt-4">
					<div className="row">
						<div className="col-md-6">
							<div className="card p-3">
								<p className="darkblue-text">‘This module has saved us a lot of time and effort in employee management.’</p>
								<h6 className="text-end darkblue-text">- Laura Gómez, HR Manager</h6>
							</div>
						</div>
						<div className="col-md-6">
							<div className="card p-3">
								<p className="darkblue-text">‘Process automation has improved our productivity enormously.’</p>
								<h6 className="text-end darkblue-text">- Carlos Pérez, CEO</h6>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
