import React from 'react'
import axios from 'axios';
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../contexts';
import BarraGen from './Barra/BarraG'
import { MdOutlineStorage, MdVerifiedUser, MdLogout } from "react-icons/md";
import logo from '../../img/logo-largo.png'
import { TecnonyContext } from './Context/TecnonyContext';
import { useEffect } from 'react';

export const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const urlActual = location.pathname;
    const { user, logout } = useContext(AuthContext);

    const { userinfo } = useContext(TecnonyContext);

    const token = localStorage.getItem('token');

    const onLogout = async () => {
        try {
            await axios.post(
                'https://tecnony-v1.herokuapp.com/api/v1/logout',
                {}, { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            navigate('/landing/', { replace: true });
            logout();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section className="full-box dashboard-sideBar" >
                <div className="full-box dashboard-sideBar-bg btn-menu-dashboard"></div>
                <div className="full-box dashboard-sideBar-ct">

                    <div className="full-box text-uppercase text-center text-titles dashboard-sideBar-title">
                        <i className="zmdi zmdi-close btn-menu-dashboard visible-xs"></i>
                        <img src={logo} alt="" width='250' height='40' />
                    </div>

                    <div className="full-box dashboard-sideBar-UserInfo">
                        <figure className="full-box">
                            <br />
                            <img src={userinfo && userinfo.avatar} />

                            {<figcaption className="text-center text-titles">{userinfo && userinfo.full_name}</figcaption>}
                            <p className="text-center " ><small>{userinfo && userinfo.role}</small></p>
                        </figure>

                        <center>
                            <div onClick={onLogout} type="button" class="btn btn-default btn-sm" >
                                <span class="glyphicon glyphicon-log-out"></span> < MdLogout /> Salir
                            </div>
                        </center>

                    </div>

                    <ul className="list-unstyled full-box dashboard-sideBar-Menu">
                        <li>
                            <Link to='/'>
                                <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"></i> <i><MdOutlineStorage /></i> Inicio
                            </Link>
                            <Link to="/profile" className='zmdi zmdi-view-dashboard zmdi-hc-fw'> <i><MdVerifiedUser /></i>Perfil</Link>
                        </li>
                        <li>
                            <BarraGen />
                        </li>
                    </ul>
                </div>
            </section>

            <section className="full-box dashboard-contentPage bg-light">
                <nav className="full-box dashboard-Navbar bg-dark">
                    <ul className="full-box list-unstyled text-right">

                    </ul>
                </nav>
                <Outlet />
            </section>
        </>
    )
}

