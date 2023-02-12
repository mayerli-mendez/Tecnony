import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Loanding } from '../app/Loanding';

export const ShowComentsAdmin = () => {
    const { id } = useParams();
    const [score, setScore] = useState({});
    const [tecnico, setTecnico] = useState({});
    const [comen, setComen] = useState([]);
    const token = localStorage.getItem('token');
    const [alerta, setAlerta] = useState('');
    const [estado, setEstado] = useState('');

    const location = useLocation();
    const urlActual = location.pathname;

    {/* Aqui traemos los comentarios del tecnico*/ }
    const getinfo = async () => {
        try {
            const response = await axios.get(
                `https://tecnony-v1.herokuapp.com/api/v1/manage-tec/show/${id}`,
                { headers: { 'accept': "application/json", 'authorization': token } }
            );
            const com = { ...response.data.data.technical, id };
            setTecnico(com);
            setScore(response.data.data);
            setComen(response.data.data.satisfaction_forms);

            if (tecnico.state == 0) {
                setEstado('Desactivado');
            } else if (tecnico.state == 1) {
                setEstado('Activado');
            }
            await getinfo();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getinfo();
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">

                    <div className="panel-body">
                        <div className="row">
                            {Object.keys(tecnico).length > 0 ? (
                                <>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-6">
                                                <div className="form-group label-floating">

                                                    <h3>Detalles del Técnico</h3>
                                                    <br />
                                                    <p className="">
                                                        <span className="">
                                                            <strong> Nombre de usuario: </strong>{" "}
                                                        </span>
                                                        {tecnico.username}
                                                    </p>
                                                    <p className="">
                                                        <span className="">
                                                            <strong> Nombre: </strong>{" "}
                                                        </span>
                                                        {tecnico.first_name}
                                                    </p>
                                                    <p className="">
                                                        <span className="">
                                                            <strong> Apellido: </strong>{" "}
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
                                                            <strong> Número de Celular: </strong>{" "}
                                                        </span>
                                                        {tecnico.personal_phone}
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
                                        </div>
                                    </div>
                                    <br />

                                    <h3>Detalle</h3>
                                    <div className="panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover text-center">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">#</th>
                                                        
                                                        <th className="text-center">Sugerencia</th>
                                                        <th className="text-center">Calificación</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        comen.map((comen, index) => (
                                                            <tr key={comen.id}>
                                                                <td>{++index}</td>
                                                               
                                                                <td>{comen.suggestion}</td>
                                                                <td>{Math.round(comen.qualification)}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <p className="">
                                        <span className="">
                                            <strong> Calificaciòn Final : </strong>{" "}
                                        </span>
                                        {score.score}

                                    </p>
                                    {/*   OBSERVACION */}
                                    <div className="panel-body">
                                        <center>
                                            <form >
                                                <p class="note-danger mb-3">
                                                    {alerta}
                                                </p>
                                                <br />
                                                <br />
                                            </form>
                                        </center>
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


