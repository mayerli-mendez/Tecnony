import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const ListMember = () => {
    const [member, setMember] = useState({});
    const [attention, setAttention] = useState({});
    const [by, setBy] = useState({});
    const token = localStorage.getItem("token");
    const [estado, setEstado] = useState('');

    const [mensajeError, setMensajeError] = useState('');
    const [isError, setisError] = useState(true);

    const getMember = async () => {
        try {
            const response = await axios.get(
                `https://tecnony-v1.herokuapp.com/api/v1/affiliation/show`,
                { headers: { accept: "application/json", authorization: token } }
            ); 

            if (response.data && response.data.data && response.data.data.affiliation) {
                setisError(false)
                const member = { ...response.data.data.affiliation };
                const attention = { ...response.data.data.attention };
                const by = { ...response.data.data.attended_by };
                setMember(member);
                setAttention(attention);
               
                if (attention.state == 4) {
                    setEstado('Re-agendado');
                }
                else if (attention.state == 3) {
                    setEstado('Rechazado');
                } else if (attention.state == 2) {
                    setEstado('Aceptado');
                } else if (attention.state == 1) {
                    setEstado('Pendiente');
                }
            } else {
                setisError(true)
                setMensajeError(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        getMember();
    }, []);

    return (
        <>
            {
                isError == false ?
                    <>
                        {
                            member.state === 1
                                ?
                                (
                                    <div className="text-center">
                                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-black px-4 py-3 m-5 text-center rounded-lg">La afiliación se encuentra en REVISIÓN.</p>

                                        <Link to={`/member/show/${member.id}`} className="btn btn-warning btn-raised btn-xs">
                                            <i className="bi bi-file-earmark-richtext-fill"></i><i>Ver detalle de la afiliación</i>
                                        </Link>


                                        <Link to={`/member/edit/${member}`} className="btn btn-info btn-raised btn-xs">
                                            <i className="bi-pencil-square"></i><i>Editar</i>
                                        </Link>
                                    </div>
                                )
                                :
                                member.state === 2
                                    ?
                                    (
                                        <div>
                                            <div className="container-fluid">
                                                <div className="panel panel-info">
                                                    <h3>Detalles de la afiliación </h3>
                                                    <div className="panel-body">
                                                        <div className="row">
                                                            {Object.keys(member).length > 0 ? (
                                                                <>
                                                                    <div className="col-xs-12">
                                                                        {/*   Informacion de la afiliacion */}
                                                                        <p className="">
                                                                            <span className="">
                                                                                <strong> Persona a cargo: </strong>{" "}
                                                                            </span>
                                                                            {by.username}
                                                                        </p>

                                                                        <p className="">
                                                                            <span className="">
                                                                                <strong> Estado: </strong>{" "}
                                                                            </span>
                                                                            {estado}
                                                                        </p>

                                                                        <p className="">
                                                                            <span className="">
                                                                                <strong> Dia de revisión: </strong>{" "}
                                                                            </span>
                                                                            {attention.date_acceptance}
                                                                        </p>

                                                                        <p className="">
                                                                            <span className="">
                                                                                <strong> Observación: </strong>{" "}
                                                                            </span>
                                                                            {attention.observation}
                                                                        </p>

                                                                        <Link to={`/member/show/${member.id}`} className="btn btn-warning btn-raised btn-xs">
                                                                            <i className="bi bi-file-earmark-richtext-fill"></i><i>Ver detalle</i>
                                                                        </Link>

                                                                    </div>
                                                                </>)
                                                                : (
                                                                    <p className="bg-yellow-600 border-t border-b border-yellow-900 text-black px-4 py-3 m-5 text-center rounded-lg">No ha registrado ninguna afiliaciòn.</p>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                    :
                                    (

                                        <div className="text-center">
                                            <p className="bg-yellow-600 border-t border-b 
                                border-yellow-900 text-black px-4 py-3 m-5 text-center rounded-lg
                                ">{/* La afiliación ha sido RECHAZADA. */  mensajeError}</p>


                                            <Link to={`/member/show/${member.id}`} className="btn btn-warning btn-raised btn-xs">
                                                <i className="bi bi-file-earmark-richtext-fill"></i><i>Ver detalle de la afiliación</i>
                                            </Link>

                                            <Link to={`/member/edit/${member}`} className="btn btn-info btn-raised btn-xs">
                                                <i className="bi-pencil-square"></i><i>Editar</i>
                                            </Link>

                                        </div>
                                    )
                        }
                    </> :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-black px-4 py-3 m-5 text-center rounded-lg">No ha registrado ninguna afiliaciòn.</p>
                    )

            }

        </>
    )

}