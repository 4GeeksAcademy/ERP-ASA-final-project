import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
	const { actions, store } = useContext(Context); 

	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container-fluid">
				<a className="navbar-brand text-white fw-bold" href="#">
					<img className="logo" src="https://placeholder.pics/images/icons/apple-icon-180x180.png" alt="Logo" />
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarContent"
					aria-controls="navbarContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse justify-content-end" id="navbarContent">
					<div className="d-flex">
						<div className="dropdown">
							<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								Options
							</button>
							<ul className="dropdown-menu">
								{store.auth ? (
									<>
										<li className="dropdown-item">
											<Link to="/employees">Employees List</Link>
										</li>
										<li className="dropdown-item">
											<Link to="/signup">New Worker</Link>
										</li>
										<li className="dropdown-item">
											<Link to="/" onClick={actions.logout}>Log Out</Link>
										</li>
										<li className="dropdown-item">
											<Link to="/profile">Profile</Link>
										</li>
									</>
								) : (
									<li className="dropdown-item">
										<Link to="/login">Login</Link>
									</li>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

