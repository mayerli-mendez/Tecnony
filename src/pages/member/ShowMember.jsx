import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loanding } from '../app/Loanding';

export const ShowMember = () => {
    const [member, setMember] = useState({});
    const [estado, setEstado] = useState('');
    const token = localStorage.getItem("token");

    const getMember = async () => {
        try {
            const response = await axios.get(
                `https://tecnony-v1.herokuapp.com/api/v1/affiliation/show`,
                { headers: { accept: "application/json", authorization: token } }
            );
            const member = { ...response.data.data.affiliation };
            console.log(member);
            setMember(member);
            if (member.state == 3) {
                setEstado('Rechazado');
            } else if (member.state == 2) {
                setEstado('Aceptado');

            } else {
                setEstado('Pendiente');
            }

        } catch (error) {
            console.log(error);
        }
    };
  

    useEffect(() => {
        getMember();
    }, []);


    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <h3>Detalle de la solicitud </h3>
                    <div className="panel-body">
                        <div className="row">
                            {Object.keys(member).length > 0 ? (
                                <>
                                    <div className="col-xs-12">

                                        {/*   Informacion del tecnico  */}
                                        <p className="">
                                            <span className="">
                                                <strong> Estado: </strong>{" "}
                                            </span>
                                            {estado}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Nombre Completo: </strong>{" "}
                                            </span>
                                            {member.full_name}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Profesión: </strong>{" "}
                                            </span>
                                            {member.profession}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Especialización: </strong>{" "}
                                            </span>
                                            {member.specialization}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Nombre convencional: </strong>{" "}
                                            </span>
                                            {member.work_phone}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Horario de atención: </strong>{" "}
                                            </span>
                                            {member.attention_schedule}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Nombre del local: </strong>{" "}
                                            </span>
                                            {member.local_name}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Dirección: </strong>{" "}
                                            </span>
                                            {member.local_address}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Numero de cuenta: </strong>{" "}
                                            </span>
                                            {member.account_number}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Tipo de cuenta: </strong>{" "}
                                            </span>
                                            {member.account_type}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Entidad bancaria: </strong>{" "}
                                            </span>
                                            {member.banking_entity}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong> Documento: </strong>{" "}
                                            </span>

                                            <div>

                                                <button className={`btn`}>
                                                    <a href={member.documento} target="_blank" rel="noopener noreferrer" download="nombre_pretendido_del archivo.pdf">
                                                        Visualizar el documento                                                        </a>
                                                </button>

                                            </div>

                                        </p>
                                    </div>
                                </>)
                                : (
                                    <Loanding />
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


