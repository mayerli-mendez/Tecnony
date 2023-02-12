import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Request = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const urlActual = location.pathname;

	return (
		<>
			<div className="container-fluid">
				<div className="page-header">

				</div>
				<p className="lead">
					Este módulo te permite aprobar o rechazar los técnicos en base a las solicitudes de afiliación recibidas.
				</p>
				<hr />
			</div>

			{/* Aqui colocamos los botones de navegacion */}
			<div className="container-fluid separador">
				<ul className="breadcrumb breadcrumb-tabs">
					<li>
						<Link to="/request" className={`${urlActual === '/request'} btn `}>
							<i className="bi bi-list-check"></i> &nbsp;AFILIACIONES PENDIENTES
						</Link>
					</li>
					<br />
					<li>
						<Link to="/atent" className={`${urlActual === '/atent'} btn `}>
							<i className="bi bi-list-check"></i> &nbsp;AFILIACIONES ATENDIDAS
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
		</>
	);
};
