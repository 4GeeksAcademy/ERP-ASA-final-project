import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
	<div className="container my-5">
		<section className="text-center text-white d-flex flex-column justify-content-center align-items-center"
			style={{ backgroundColor: "#7886C7", height: "90vh", padding: "50px" }}>
			<h1 className="fw-bold">Optimiza la Gestión de Recursos Humanos</h1>
			<p className="mt-3" style={{ maxWidth: "600px" }}>
				Automatiza procesos, mejora la eficiencia y toma mejores decisiones con nuestro módulo de RRHH integrado en tu ERP.
			</p>
			<button className="btn btn-light text-dark mt-3">Solicitar Demo</button>
		</section>
		<section className="container py-5">
			<h2 className="text-center" style={{ color: "#2D336B" }}>¿Por qué elegir nuestro módulo?</h2>
			<div className="row mt-4">
				<div className="col-md-4 text-center">
					<i className="bi bi-people-fill" style={{ fontSize: "40px", color: "#2D336B" }}></i>
					<h4>Gestión de empleados</h4>
					<p>Administra perfiles, roles y permisos de empleados de forma sencilla.</p>
				</div>
				<div className="col-md-4 text-center">
					<i className="bi bi-clock-history" style={{ fontSize: "40px", color: "#2D336B" }}></i>
					<h4>Control de asistencia</h4>
					<p>Registra horarios, ausencias y vacaciones de manera automática.</p>
				</div>
				<div className="col-md-4 text-center">
					<i className="bi bi-bar-chart-line" style={{ fontSize: "40px", color: "#2D336B" }}></i>
					<h4>Reportes inteligentes</h4>
					<p>Obtén informes detallados para tomar decisiones estratégicas.</p>
				</div>
			</div>
    	</section>
		<section className="py-5" style={{ backgroundColor: "#A9B5DF" }}>
			<h2 className="text-center text-dark">Lo que dicen nuestros clientes</h2>
			<div className="container mt-4">
				<div className="row">
				<div className="col-md-6">
					<div className="card p-3">
						<p>"Este módulo nos ha ahorrado mucho tiempo y esfuerzo en la gestión de empleados."</p>
						<h6 className="text-end">- Laura Gómez, HR Manager</h6>
					</div>
				</div>
					<div className="col-md-6">
						<div className="card p-3">
							<p>"La automatización de procesos ha mejorado nuestra productividad enormemente."</p>
							<h6 className="text-end">- Carlos Pérez, CEO</h6>
						</div>
					</div>
				</div>
			</div>
    </section>
	</div>
	);
};
