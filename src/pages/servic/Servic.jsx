import React from "react";
import { AuthContext } from '../../contexts';
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Servic = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const urlActual = location.pathname;

	return (
		<>
			<div className="container-fluid">
				<div className="page-header">
					
				</div>
				<p className="lead">
				Este módulo te permite gestionar tus servicios ofertados.
				</p>
				<hr />
			</div>

			<div className="container-fluid">
				<ul className="breadcrumb breadcrumb-tabs">
					<li>
						<Link to="/servic" className={`${urlActual === '/servic' } btn `}>
							<i className="bi bi-list-check"></i> &nbsp;LISTA DE SERVICIOS
						</Link>
					</li>
					<br />
					<li>
						<Link to="/servic/create" className={`${urlActual === '/servic/create' } btn `}>
							<i className="bi bi-list-check"></i> &nbsp;NUEVO SERVICIO
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
		</>
	);
};
