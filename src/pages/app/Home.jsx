import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate ,useLocation} from "react-router-dom";
import { AuthContext } from '../../contexts';
import { useContext } from 'react';
import { BiCommentDots, BiFolderMinus } from "react-icons/bi";

import axios from 'axios';

export const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
	const urlActual = location.pathname;
    /* PARA ADMIN */
    const [solicitud, setSolicitud] = useState([]);
    const [tecnico, setTecnico] = useState([]);
    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);
    const [attention, setAttention] = useState({});	
    

    /* PARA TECNICO */
    const [sevicios, setServicio] = useState([]);
    const [aprov, setAprov] = useState([]);
    const [comen, setComen] = useState([]);

    const getSolicitud = async () => {
        try {
            const response = await axios.get(
                'https://tecnony-v1.herokuapp.com/api/v1/manage/affiliation',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
           
            setSolicitud(response.data.data.affiliations)
        } catch (error) {
            console.log(error);
        }
    }
    const getTecnico = async () => {
        try {
            const response = await axios.get(
                'https://tecnony-v1.herokuapp.com/api/v1/manage-tec',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
          
            setTecnico(response.data.data.users)
        } catch (error) {
            console.log(error);
        }
    }
    /*  PARA TECNICO */
    const getServicios = async () => {
        try {
            const response = await axios.get(
                'https://tecnony-v1.herokuapp.com/api/v1/service',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
         
            setServicio(response.data.data.services)
        } catch (error) {
            console.log(error);
        }
    }
    const getAproServi = async () => {
        try {
            const response = await axios.get(
                'https://tecnony-v1.herokuapp.com/api/v1/manage-hiring/shownew',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
          
            setAprov(response.data.data.service_requests)
        } catch (error) {
            console.log(error);
        }
    }

    const getComenServi = async () => {
        try {
            const response = await axios.get(
                'https://tecnony-v1.herokuapp.com/api/v1/view-satisfaction-form',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
           
            setComen(response.data.data.satisfaction_forms)
        } catch (error) {
            console.log(error);
        }
    }

    /*   Para confirmar los home del tecnico  */
    const getAttention = async () => {
        try {
            const response = await axios.get(
                `https://tecnony-v1.herokuapp.com/api/v1/affiliation/show`,
                { headers: { accept: "application/json", authorization: token } }
            );
            const attention = { ...response.data.data.attention };
           
            setAttention(attention);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAttention();
        getSolicitud();
        getTecnico();
        getServicios();
        getAproServi();
        getComenServi();
    }, []);

    if (user.role == 'admin') {
        return (
            <>

                <div class="container-fluid">
                    <div class="page-header">
                        <h1 class="text-titles"><i class="zmdi zmdi-case zmdi-hc-fw"></i> Información del Sistema</h1>
                    </div>
                </div>
                <div class="full-box text-center">
                    <Link to="/request" class="full-box tile ">
                        <div class="full-box tile-title text-center text-titles text-uppercase ">
                            Solicitudes
                        </div>
                        <div class="full-box tile-icon text-center ">
                            <i><BiFolderMinus /></i>
                        </div>
                        <div class="full tile-number text-titles text-dark">
                            <p class="full-box">{solicitud.length}</p>
                            <small>Registrados</small>
                        </div>
                    </Link>
                    <Link to="/comentsAdmin" class="full-box tile ">
                        <div class="full-box tile-title text-center text-titles text-uppercase">
                            Comentarios
                        </div>
                        <div class="full-box tile-icon text-center black ">
                            <i><BiCommentDots /></i>
                        </div>
                        <div class="full tile-number text-titles text-dark">
                            <p class="full-box">{tecnico.length}</p>
                            <small>Registrados</small>
                        </div>
                    </Link>
                </div>
            </>)

    } else if (user.role == 'tecnico') {

        if (attention.state == 2) {

            return (
                <>
                    <>
                        <div class="container-fluid">
                            <div class="page-header">
                                <h1 class="text-titles"><i class="zmdi zmdi-case zmdi-hc-fw"></i> Información del sistema</h1>
                            </div>
                        </div>
                        <div class="full-box text-center">
                            <Link to="/servic" class="full-box tile ">
                                <div class="full-box tile-title text-center text-titles text-uppercase ">
                                    Servicios Creados
                                </div>
                                <div class="full-box tile-icon text-center ">
                                    <i><BiFolderMinus /></i>
                                </div>
                                <div class="full tile-number text-titles text-dark">
                                    <p class="full-box">{sevicios.length}</p>
                                    <small>Registrados</small>
                                </div>
                            </Link>
                            <Link to="/servic" class="full-box tile ">
                                <div class="full-box tile-title text-center text-titles text-uppercase ">
                                    Servicios sin atender
                                </div>
                                <div class="full-box tile-icon text-center ">
                                    <i><BiFolderMinus /></i>
                                </div>
                                <div class="full tile-number text-titles text-dark">
                                    <p class="full-box">{aprov.length}</p>
                                    <small>Registrados</small>
                                </div>
                            </Link>

                            <Link to="/coments" class="full-box tile ">
                                <div class="full-box tile-title text-center text-titles text-uppercase ">
                                    Cometarios
                                </div>
                                <div class="full-box tile-icon text-center ">
                                    <i><BiFolderMinus /></i>
                                </div>
                                <div class="full tile-number text-titles text-dark">
                                    <p class="full-box">{comen.length}</p>
                                    <small>Registrados</small>
                                </div>
                            </Link>
                        </div>
                    </>
                </>
            )

        } else {
            return (
                <>
                    {/*  TECNICO */}
                    <center>
                        <br />
                        <div class="bg-yellow-600 border-t border-b border-yellow-900 text-black px-4 py-3 m-5 text-center rounded-lg">
                            <h5 class="card-title">INFORMACIÓN</h5>
                            <p class="card-text">Para tener acceso a los módulos del sistema , envia una solicitud de afiliación.</p>
                           
                                <Link to="/member" className={`${urlActual === '/member' ? ' btn-info' : 'btn-outline-info'} btn `}>
                                    <i className="zmdi zmdi-plus"></i> &nbsp; SOLICITAR AFILIACIÓN
                                </Link>
                           
                        </div>
                    </center>

                </>
            )
        }
    }
}