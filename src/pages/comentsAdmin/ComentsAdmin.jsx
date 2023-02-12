import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ComentsAdmin = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const urlActual = location.pathname;
  
    return (
        <>
            <div className="container-fluid">
                <div className="page-header">
                </div>
                <p className="lead">
                Este módulo te permite activar o desactivar los técnicos en base a los comentarios recibidos. </p>
                <hr />
            </div>

			{/* Aqui colocamos los botones de navegacion */}
            <div className="container-fluid separador">
				<ul className="breadcrumb breadcrumb-tabs">
				<li>
						<Link to="/comentsAdmin" className={`${urlActual === '/comentsAdmin' } btn `}>
							<i className="bi bi-list-check"></i> &nbsp;LISTA DE TÉCNICOS 
						</Link>
					</li>
				</ul>
			</div>
            <Outlet />
        </>
    );
};
