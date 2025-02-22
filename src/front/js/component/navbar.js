import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import "../../styles/navbar.css"

export const Navbar = () => {
	const { actions, store } = useContext(Context);

	return (
		<nav className="navbar">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand text-white fw-bold">
					<img className="logo rounded-circle" src="https://yeeply.com/wp-content/uploads/2024/04/erp-planificacion-recursos-empresariales-produccion-industrial-productividad-mejora-empresa_100456-8252.jpeg" alt="Logo" />
				</Link>
				<div className="btn-group" id="navbarContent">
					<button type="button" className="btn burger-btn rounded" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span className="navbar-toggler-icon"></span>
					</button>
					<ul className="dropdown-menu dropdown-menu-end">
								{store.auth ? (
									<>
										<li className="dropdown-item">
											<Link to="/employees">Employees List</Link>
										</li>
										<li className="dropdown-item">
											<Link to="/signup" onClick={() => actions.resetWorkerData()}>New Worker</Link>
										</li>
										<li className="dropdown-item">
											<Link to="/profile">My profile</Link>
										</li>
										<li className="dropdown-item">
											<Link to="/" className="text-danger link-opacity-100-hover" onClick={actions.logout}>Log Out</Link>
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
		</nav>
	);
};

