import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css"

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand text-white fw-bold">
					<img className="logo" src="https://placeholder.pics/images/icons/apple-icon-180x180.png" alt="Logo" />
				</Link>
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

				<div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarContent">
					{store.auth ?
						<>
							<Link to="/employees">
								<button className="btn btn-light text-dark">Employees List</button>
							</Link>
							<Link to="/signup" className="ms-2">
								<button className="btn btn-light text-dark">New Worker</button>
							</Link>
							<Link to="/" className="ms-2">
								<button className="btn btn-danger text-dark" onClick={actions.logout}>Log out</button>
							</Link>
							<Link to="/profile" className="ms-2">
								<img className="my-profile rounded-circle" alt="Foto del trabajador" src="https://cdn-icons-png.flaticon.com/512/3736/3736502.png" />
							</Link>
						</>
						:
						<>
							<Link to="/login">
								<button className="btn btn-light text-dark me-2">Login</button>
							</Link>
						</>
					}
				</div>
			</div>
		</nav>
	);
};


