import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loanding } from '../app/Loanding';
import Swal from 'sweetalert2'

export const ShowFinalize = () => {
    const { id } = useParams();
    const [finalize, setFinalize] = useState({});
    const [comprob, setComprob] = useState({});
    const [attention, setAttention] = useState({});
    const [estado, setEstado] = useState('');
    const [pay, setPay] = useState('');
    const token = localStorage.getItem("token");

    const getFinalize = async () => {
        try {

            const response = await axios.get(
                `https://tecnony-v1.herokuapp.com/api/v1/manage-hiring/show-finalize/${id}`,
                { headers: { accept: "application/json", authorization: token } }
            );

            const finalize = { ...response.data.data.service_request, id };
            const attention = { ...response.data.data.attention, id };
            const comprob = { ...response.data.data};

            setFinalize(finalize);
            setAttention(attention);
            setComprob(comprob);

            /* Estado */
            if (finalize.state == 0) {
                setEstado('Pendiente');
            } else if (finalize.state == 1) {
                setEstado('Rechazado');
            } else if (finalize.state == 2) {
                setEstado('Cancelado');
            } else if (finalize.state == 3) {
                setEstado('En proceso');
            } else if (finalize.state == 4) {
                setEstado('Finalizada');
            } else if (finalize.state == 5) {
                setEstado('Pagado');
            } else if (finalize.state == 6) {
                setEstado('Comentado');
            }


            /* Metodo de pago */
            if (finalize.payment_method == 1) {
                setPay('Efectivo');
            } else if (finalize.payment_method == 1) {
                setPay('Depósito o Transferencia');
            }


        } catch (error) {
            console.log(error.response.data.message, 'error');

            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500,
                background: 'transparent',
            })
        }
    };
   

    useEffect(() => {
        getFinalize();
    }, []);

   
    const okComprobante = () => {
       
        if (comprob.comprobante != null && comprob.comprobante != undefined && comprob.comprobante.startsWith("http")) {
           return <img width='250' height='250' class="rounded" src={`${comprob.comprobante}`} />
        }else {
            return <p>No existe un comprobante de pago</p>;
        }
    }

        return (
            <div>
                <div className="container-fluid">
                    <div className="panel panel-info">
                        <div className="panel-body">
                            <div className="row">
                                {Object.keys(finalize).length > 0 ? (
                                    <>
                                        <b><h3>Información del servicio finalizado</h3></b>
                                        <div className="col-xs-12 col-sm-6">
                                            <div className="form-group label-floating">

                                                <p className="">
                                                    <span className="">
                                                        <strong>Estado:</strong>{" "}
                                                    </span>
                                                    {estado}
                                                </p>
                                                <p className="">
                                                    <span className="">
                                                        <strong> Cliente: </strong>{" "}
                                                    </span>
                                                    {finalize.cliente}
                                                </p>

                                                <p className="">
                                                    <span className="">
                                                        <strong> Fecha de emisión: </strong>{" "}
                                                    </span>
                                                    {finalize.date_issue}
                                                </p>

                                                <p className="">
                                                    <span className="">
                                                        <strong> Dispositivo: </strong>{" "}
                                                    </span>
                                                    {finalize.device}
                                                </p>
                                                <p className="">
                                                    <span className="">
                                                        <strong> Modelo: </strong>{" "}
                                                    </span>
                                                    {finalize.model}
                                                </p>
                                                <p className="">
                                                    <span className="">
                                                        <strong> Marca: </strong>{" "}
                                                    </span>
                                                    {finalize.brand}
                                                </p>
                                                <p className="">
                                                    <span className="">
                                                        <strong> Serie: </strong>{" "}
                                                    </span>
                                                    {finalize.serie}
                                                </p>
                                                <p className="">
                                                    <span className="">
                                                        <strong> Descripción del problema: </strong>{" "}
                                                    </span>
                                                    {finalize.description_problem}
                                                </p>
                                                <p className="">
                                                    <span className="">
                                                        <strong> Método de pago: </strong>{" "}
                                                    </span>
                                                    {pay}
                                                </p>

                                                <br />
                                            </div>
                                        </div>

                                        {/* Imagen del servicio*/}

                                        <div className="col-xs-12 col-sm-6">
                                            <div className="form-group label-floating">
                                                <b><h3>Comprobante</h3></b>
                                                <div>
                                                {okComprobante()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Informacion de la atencion de los servicios finalizados. */}

                                        <b><h3>Información de la atención</h3></b>
                                        <div className="col-xs-12">
                                            <div className="form-group label-floating">

                                                <p className="">
                                                    <span className="">
                                                        <strong>Estado:</strong>{" "}
                                                    </span>
                                                    {estado}
                                                </p>
                                                <p className="">
                                                    <span className="">
                                                        <strong> Diagnóstico: </strong>{" "}
                                                    </span>
                                                    {attention.diagnosis}
                                                </p>
                                                <p className="">
                                                    <span className="">
                                                        <strong> Resolución de incidentes : </strong>{" "}
                                                    </span>
                                                    {attention.incident_resolution}
                                                </p>
                                                <p className="">
                                                    <span className="">
                                                        <strong> Garantía: </strong>{" "}
                                                    </span>
                                                    {attention.warranty}
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
