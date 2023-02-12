import React from "react";
import { AuthContext } from '../../contexts';
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Member = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const urlActual = location.pathname;
	const [member, setMember] = useState({});
	const token = localStorage.getItem("token");

	const getMember = async () => {
		try {
			const response = await axios.get(
				`https://tecnony-v1.herokuapp.com/api/v1/affiliation/show`,
				{ headers: { accept: "application/json", authorization: token } }
			);
			console.log(response.data);
			const member = { ...response.data.data.affiliation};
			console.log(member);
			setMember(member);
		
		} catch (error) {
			console.log(error);
		}
	};
	
   	useEffect(() => {
        getMember();
    }, []);


if (member.state==null){
	return (
		<>
			<div className="container-fluid">
				<div className="page-header">

				</div>
				<p className="lead">
					Este módulo te permite solicitar una afiliación para que sea gestionada por el administrador.
				</p>
			</div>

			<div className="container-fluid">
				<ul className="breadcrumb breadcrumb-tabs">
					<li>
						<Link to="/member" className={`${urlActual === '/member' } btn `}>
							<i className="bi bi-list-check"></i> &nbsp;AFILIACIÓN
						</Link>
					</li>
					<br />
					<li>
						<Link to="/member/create" className={`${urlActual === '/member/create' ? ' btn-info': 'btn-outline-info'} btn `}>
							<i className="zmdi zmdi-plus"></i> &nbsp; SOLICITAR AFILIACIÓN
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
		</>
	);

} else {
	return (
		<>
			<div className="container-fluid">
				<div className="page-header">

				</div>
				<p className="lead">
					Este módulo te permite solicitar una afiliación para que sea gestionada por el administrador.
				</p>
			</div>

			<div className="container-fluid">
				<ul className="breadcrumb breadcrumb-tabs">
					<li>
						<Link to="/member" className={`${urlActual === '/member' } btn `}>
							<i className="bi bi-list-check"></i> &nbsp;AFILIACIÓN
						</Link>
					</li>
					<br />
					
				</ul>
			</div>
			<Outlet />
		</>
	);
}
};
