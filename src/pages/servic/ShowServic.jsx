import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loanding } from "../app/Loanding";

export const ShowServic = () => {
    const { id } = useParams();
    const [servic, setServic] = useState({});
    const [estado, setEstado] = useState('');

    const [moodPag, setMoodPag] = useState('');
    const [Paymood, setPaymood] = useState('');
    const token = localStorage.getItem("token");

    /* Aqui se ve mas informacion del servicio */
    const getServic = async () => {
        try {
            const response = await axios.get(
                `https://tecnony-v1.herokuapp.com/api/v1/service/show/${id}`,
                { headers: { accept: "application/json", authorization: token } }
            );
            const servic = { ...response.data.data.service, id };
           
            setServic(servic);
            if (servic.state == 0) {
                setEstado('Desactivado');
            } else if (servic.state == 1) {
                setEstado('Activado');
            }

            /* Modo de atención */

            if (servic.attention_mode == 2) {
                setMoodPag('Domicilio');
            } else if (servic.attention_mode == 1) {
                setMoodPag('En local');
            }

            /* Método de pago   */

            if (servic.payment_method == 1) {
                setPaymood('Efectivo');
            } else if (servic.payment_method == 2) {
                setPaymood('Depósito o tranferencia ');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServic();
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">

                    <div className="panel-body">
                        <div className="row">
                            {Object.keys(servic).length > 0 ? (
                                < >
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
                                                    <strong> Nombre: </strong>{" "}
                                                </span>
                                                {servic.name}
                                            </p>
                                            <p className="">
                                                <span className="">
                                                    <strong> Descripción: </strong>{" "}
                                                </span>
                                                {servic.description}
                                            </p>

                                            <p className="">
                                                <span className="">
                                                    <strong> Precio:</strong>
                                                    ${servic.price}
                                                </span>

                                            </p>
                                            <hr />
                                            <p className="">
                                                <span className="">
                                                    <strong> Modo de atención: </strong>{" "}
                                                </span>
                                                {moodPag}
                                            </p>

                                            <p className="">
                                                <span className="">
                                                    <strong> Descripción: </strong>{" "}
                                                </span>
                                                {servic.attention_description}
                                            </p>

                                            <hr />
                                            <p className="">
                                                <span className="">
                                                    <strong> Método de pago: </strong>{" "}
                                                </span>
                                                {Paymood}
                                            </p>

                                            <p className="">
                                                <span className="">
                                                    <strong> Descripción: </strong>{" "}
                                                </span>
                                                {servic.payment_description}
                                            </p>
                                            <br />

                                        </div>
                                    </div>
                                    {/* Imagen del servicio*/}
                                    <div className="col-xs-12 col-sm-6">
                                        <div className="form-group label-floating">
                                            <b><h3>Imagen</h3></b>
                                            <img width='250' height='250' class="rounded-circle" src={`${servic.image}`} />

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


