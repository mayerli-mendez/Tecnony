import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loanding } from '../app/Loanding';

export const ShowRequest = () => {

    const { id } = useParams();
    const [affiliations, setAffiliations] = useState({});
    const token = localStorage.getItem("token");

    {/* Aqui traemos los datos de la afiliacion del tecnico*/ }
    const getAffiliations = async () => {
        try {
            const response = await axios.get(
                `https://tecnony-v1.herokuapp.com/api/v1/manage/affiliation/${id}`,

                { headers: { accept: "application/json", authorization: token } }
            );
            const affiliations = { ...response.data.data.affiliations, id };
         
            setAffiliations(affiliations);


        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAffiliations();

    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">

                    <div className="panel-body">
                        <div className="row">
                            {Object.keys(affiliations).length > 0 ? (
                                <>
                                    <div className="col-xs-12 col-sm-6">
                                        <h3> Información de solicitud</h3>
                                        <br />

                                        <p className="">
                                            <span className="">
                                                <strong> Nombre Completo :</strong>{" "}
                                            </span>
                                            {affiliations.full_name}
                                        </p>
                                        <p className="">

                                            <span className="">
                                                <strong> Fecha :</strong>{" "}
                                            </span>
                                            {affiliations.date_issue}
                                        </p>
                                        <p className="">
                                            <span className="">
                                                <strong> Profesión: </strong>{" "}
                                            </span>
                                            {affiliations.profession}
                                        </p>
                                        <p className="">

                                            <span className="">
                                                <strong> Especialización:</strong>{" "}
                                            </span>
                                            {affiliations.specialization}
                                        </p>
                                        <p className="">

                                            <span className="">
                                                <strong>Número de Teléfono :</strong>{" "}
                                            </span>
                                            {affiliations.work_phone}
                                        </p>
                                        <p className="">

                                            <span className="">
                                                <strong>Horario de atención :</strong>{" "}
                                            </span>
                                            {affiliations.attention_schedule}
                                        </p>
                                        <p className="">

                                            <span className="">
                                                <strong>Nombre del local :</strong>{" "}
                                            </span>
                                            {affiliations.local_name}
                                        </p>
                                        <p className="">
                                            <span className="">
                                                <strong>Dirección:</strong>{" "}
                                            </span>
                                            {affiliations.local_address}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong>Número de cuenta:</strong>{" "}
                                            </span>
                                            {affiliations.account_number}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong>Tipo de cuenta:</strong>{" "}
                                            </span>
                                            {affiliations.account_type}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong>Entidad bancaria:</strong>{" "}
                                            </span>
                                            {affiliations.banking_entity}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Documento: </strong>{" "}
                                            </span>

                                            <div>
                                                <button className={`btn`}>
                                                    <a href={affiliations.documento} target="_blank" rel="noopener noreferrer" download="nombre_pretendido_del archivo.pdf">
                                                        Visualizar el documento </a>
                                                </button>
                                            </div>
                                        </p>
                                        <br />
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



