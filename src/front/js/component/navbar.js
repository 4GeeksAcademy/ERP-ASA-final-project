import React from "react";
import { Link } from "react-router-dom";



export const Navbar = () => {
	return (
	  <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#2D336B" }}>
		<div className="container-fluid">
		  {/* Logo (Imagen) */}
		  <a className="navbar-brand" href="#">
			<img
			  src="https://placehold.co/60x60"  // Cambia esto por la ruta de tu logo
			  alt="Logo"
			  style={{ height: "40px" }}
			/>
		  </a>
  
		  {/* Botón de menú para móviles */}
		  <button 
			className="navbar-toggler navbar-light" 
			type="button" 
			data-bs-toggle="collapse" 
			data-bs-target="#navbarContent"
			aria-controls="navbarContent" 
			aria-expanded="false" 
			aria-label="Toggle navigation"
		  >
			<span className="navbar-toggler-icon color:white"></span>
		
		  </button>
  
		  {/* Contenido del Navbar */}
		  <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
			<div className="d-flex mt-2 mt-lg-0">
			<Link to="/login">
			  <button className="btn btn-outline-light me-2">Login</button>
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
  
  
