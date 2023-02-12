import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loanding } from '../app/Loanding';

export const ShowAtent = () => {

    const { id } = useParams();
    const [affiliations, setAffiliations] = useState({});
    const [tecnico, setTecnico] = useState({});
    const token = localStorage.getItem("token");
    const [estado, setEstado] = useState('');

    {/* Aqui traemos los datos de la atencion realizada por el administrador */ }

    const getAffiliations = async () => {
        try {
            const response = await axios.get(
                `https://tecnony-v1.herokuapp.com/api/v1/manage/affiliation/show/${id}`,
                { headers: { accept: "application/json", authorization: token } }
            );
            const affiliations = { ...response.data.data.affiliation, id };
            const tecnico = { ...response.data.data.tecnico, id };
           
            setAffiliations(affiliations);
            setTecnico(tecnico)

            if (affiliations.state == 4) {
                setEstado('Reatencion');
            }
            else if (affiliations.state == 3) {
                setEstado('Rechazado');
            } else if (affiliations.state == 2) {
                setEstado('Aceptado');

            } else {
                setEstado('Pendiente');
            }


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
                    <br />
                    <div className="panel-body">
                        <div className="row">
                            {Object.keys(affiliations).length > 0 ? (
                                <>

                                    {/* Informacion del tecnico afiliado */}
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-6">
                                                <div className="form-group label-floating">

                                                    {/* Informacion del tecnico */}
                                                    <h3>Detalles del tècnico </h3>

                                                    <p className="">

                                                        <span className="">
                                                            <strong> Nombre:</strong>{" "}
                                                        </span>
                                                        {tecnico.first_name}
                                                    </p>
                                                    <p className="">

                                                        <span className="">
                                                            <strong> Apellido :</strong>{" "}
                                                        </span>
                                                        {tecnico.last_name}
                                                    </p>
                                                    <p className="">
                                                        <span className="">
                                                            <strong> Cédula: </strong>{" "}
                                                        </span>
                                                        {tecnico.cedula}
                                                    </p>
                                                    <p className="">

                                                        <span className="">
                                                            <strong> Número celular:</strong>{" "}
                                                        </span>
                                                        {tecnico.personal_phone}
                                                    </p>
                                                    <p className="">

                                                        <span className="">
                                                            <strong>Número convencional:</strong>{" "}
                                                        </span>
                                                        {tecnico.home_phone}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Avatar tecnico */}
                                            <div className="col-xs-12 col-sm-6">
                                                <div className="form-group label-floating">

                                                    <b><h3>Avatar</h3></b>
                                                    <img width='250' height='250' class="rounded-circle" src={`${tecnico.avatar}`} />
                                                </div>
                                            </div>
                                            {/*   Informacion de la afiliacion */}
                                            <br />
                                            <div className="col-xs-12 col-sm-6">
                                                <br />
                                                <h3>Detalles de la afiliaciòn </h3>

                                                <p className="">
                                                    <span className="">
                                                        <strong>Estado:</strong>{" "}
                                                    </span>
                                                    {estado}
                                                </p>
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
                                                        <strong>Número celular :</strong>{" "}
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
        </div >
    );
};



