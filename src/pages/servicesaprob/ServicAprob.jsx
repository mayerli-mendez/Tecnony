import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ServicAprob = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const urlActual = location.pathname;

	return (
		<>
			<div className="container-fluid">
				<div className="page-header">
					
				</div>
				<p className="lead">
				Este módulo te permite aprobar o rechazar las solicitudes de servicios enviadas por los clientes.  
				</p>
				<hr />
			</div>

			<div className="container-fluid separador">
				<ul className="breadcrumb breadcrumb-tabs">
				<li>
						<Link to="/servicesaprob" className={`${urlActual === '/servicesaprob' } btn `}>
							<i className="bi bi-list-check"></i> &nbsp;LISTA DE SERVICIOS
						</Link>
					</li>
					<br />
					<li>
						<Link to="/finalize" className={`${urlActual === '/finalize' } btn `}>
							<i className="bi bi-list-check"></i> &nbsp;SERVICIOS FINALIZADOS
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
		</>
	);
};
