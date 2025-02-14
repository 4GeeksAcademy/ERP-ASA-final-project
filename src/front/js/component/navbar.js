import React from "react";
import { Link } from "react-router-dom";


  export const Navbar = () => {
	return (
	  <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#2D336B" }}>
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
				<Link to="/login">
					<button className="btn btn-light text-dark me-2">Login</button>
				</Link>
				<Link to="/signup">
					<button className="btn btn-light text-dark">Sign Up</button>
				</Link>
			</div>
		  </div>
		</div>
	  </nav>
	);
  };
  
  
