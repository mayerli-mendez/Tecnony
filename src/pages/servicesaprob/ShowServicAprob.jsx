import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loanding } from '../app/Loanding';


export const ShowServicAprob = () => {
    const { id } = useParams();
    const [servicesaprob, setServicesaprob] = useState([]);
    const [estado, setEstado] = useState('');
    const token = localStorage.getItem("token");
   
    const getServicesaprob = async () => {
        try {
            const response = await axios.get(
                `https://tecnony-v1.herokuapp.com/api/v1/manage-hiring/showone/${id}`,
                { headers: { accept: "application/json", authorization: token } }
            );
            const servicesaprob = { ...response.data.data.service_requests };
            console.log(servicesaprob);
            setServicesaprob(servicesaprob);
            if (servicesaprob.state == 0) {
                setEstado('Pendiente');
            } else if (servicesaprob.state == 1) {
                setEstado('Rechazado');
            } else if (servicesaprob.state == 2) {
                setEstado('Cancelado');
            } else if (servicesaprob.state == 3) {
                setEstado('En proceso');
            } else if (servicesaprob.state == 4) {
                setEstado('Finalizada');
            } else if (servicesaprob.state == 5) {
                setEstado('Comentado');
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServicesaprob();
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">

                    <div className="panel-body">
                        <div className="row">
                            {Object.keys(servicesaprob).length > 0 ? (
                                <>
                                    <div className="col-xs-12 col-sm-6">
                                        <div className="form-group label-floating">
                                            <b><h3>Detalles del servicio</h3></b>
                                            
                                            <p className="">
                                                <span className="">
                                                    <strong>Estado:</strong>{" "}
                                                </span>
                                                {estado}
                                            </p>
                                            <p className="">
                                                <span className="">
                                                    <strong> Fecha de emisión: </strong>{" "}
                                                </span>
                                                {servicesaprob.date_issue}
                                            </p>

                                            <p className="">
                                                <span className="">
                                                    <strong> Dispositivo: </strong>{" "}
                                                </span>
                                                {servicesaprob.device}
                                            </p>
                                            <p className="">
                                                <span className="">
                                                    <strong> Modelo: </strong>{" "}
                                                </span>
                                                {servicesaprob.model}
                                            </p>
                                            <p className="">
                                                <span className="">
                                                    <strong> Marca: </strong>{" "}
                                                </span>
                                                {servicesaprob.brand}
                                            </p>
                                            <p className="">
                                                <span className="">
                                                    <strong> Serie: </strong>{" "}
                                                </span>
                                                {servicesaprob.serie}
                                            </p>
                                            <p className="">
                                                <span className="">
                                                    <strong> Descripción: </strong>{" "}
                                                </span>
                                                {servicesaprob.description_problem}
                                            </p>
                                            <br />
                                        </div>
                                    </div>

                                </>)
                                : (
                                    <p className="bg-yellow-600 border-t border-b border-yellow-900 px-4 py-3 m-5 text-center rounded-lg">
                                        <Loanding />
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


