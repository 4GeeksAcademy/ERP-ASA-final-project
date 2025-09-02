import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../styles/navbar.css";
import { Context } from "../../store/appContext";


export const Navbar = () => {
	const { actions, store } = useContext(Context);

	useEffect(() => {
		// !store.auth && localStorage.getItem("token") ? actions.getProfile() : null;

		// !store.auth && localStorage.getItem(token) ? 
	}, [])

	return (
		<nav className="navbar sticky-top">
			<div className="container-fluid">
				<div className="col-2">
					<Link to="/" className="navbar-brand text-white fw-bold">
						<img className="logo rounded-circle w-100" src="https://yeeply.com/wp-content/uploads/2024/04/erp-planificacion-recursos-empresariales-produccion-industrial-productividad-mejora-empresa_100456-8252.jpeg" alt="Logo" />
					</Link>
				</div>
				<div className="btn-group" id="navbarContent">
					<button type="button" className="btn burger-btn rounded" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span className="navbar-toggler-icon fs-4"></span>
					</button>
					<ul className="dropdown-menu dropdown-menu-end">
						{store.auth ? (
							<>
								<Link to="/employees">
									<li className="dropdown-item w-auto rounded mx-2">Employees List</li>
								</Link>
								<Link to="/signup">
									<li className="dropdown-item w-auto rounded mx-2">New Worker</li>
								</Link>
								<Link to="/offers">
									<li className="dropdown-item w-auto rounded mx-2">Create offer</li>
								</Link>
								<Link to="/profile">
									<li className="dropdown-item w-auto rounded mx-2">My profile</li>
								</Link>
								<Link to="/" onClick={actions.logout}>
									<li className="text-danger dropdown-item w-auto rounded mx-2">Log Out</li>
								</Link>
							</>
						) : (
							<Link to="/login">
								<li className="dropdown-item w-auto rounded mx-2">Login</li>
							</Link>
						)}
					</ul>
				</div>
			</div>
		</nav >
	);
};

