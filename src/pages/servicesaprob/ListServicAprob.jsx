import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AiFillFileText } from 'react-icons/ai';
import Swal from 'sweetalert2'
import { Pagination, Input } from 'antd';
import { useRef } from 'react';
import { Loanding } from '../app/Loanding';
const { Search } = Input;

export const ListServicAprob = () => {

  const navigate = useNavigate();
  const [servicesaprob, setServicesaprob] = useState([]);
  const token = localStorage.getItem('token');

  let intdor = useRef(5)
  const [count, setCount] = useState(1);
  const [counTotal, setCounTotal] = useState(1);
  const [buscador, SetBuscador] = useState('');
  const [mensajeB, SetMensajeB] = useState('');

  const [BuscaTotal, SetBuscaTotal] = useState([]);
  const [usuarios_mostrar, setUsuarios_mostrar] = useState(null);


  const getServicesaprob = async () => {
    try {
      const response = await axios.get(
        'https://tecnony-v1.herokuapp.com/api/v1/manage-hiring/shownew',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data)
      setServicesaprob(response.data.data.service_requests);
      console.log(response.data.service_requests);

      let temporalR =
        []
      temporalR = response.data.data.service_requests

      SetBuscaTotal(temporalR);

    } catch (error) {
      console.log(error);
    }
  }

  const Aprobar = async (id) => {
    try {
     
      const response = await axios.get(
        `https://tecnony-v1.herokuapp.com/api/v1/manage-hiring/approve/${id}`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
     
      await getServicesaprob();
    } catch (error) {
      console.log(error);
    }
  }

  const Rechazar = async (id) => {
    try {
     
      const response = await axios.get(
        `https://tecnony-v1.herokuapp.com/api/v1/manage-hiring/decline/${id}`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
     
      await getServicesaprob();
    } catch (error) {
      console.log(error);
    }
  }

  const Atencion = async (id) => {
    try {
    
      Swal.fire({
        title: '¿Desea aprobar o rechazar el servicio?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aprobar',
        denyButtonText: `Rechazar`,

      }).then((result) => {

        if (result.isConfirmed) {
          Swal.fire('Servicio aprobado!', '', 'success')
          Aprobar(id);
        } else if (result.isDenied) {
          Swal.fire('Servicio rechazado', '', 'warning')
          Rechazar(id);
        }
      })

    } catch (error) {
      console.log(error);
    }
  }

  const Determinar = async (servicesaprob) => {

    if (servicesaprob.state == 3) {
      navigate(`/servicesaprob/create/${servicesaprob.id}`);
    } else {
      Atencion(servicesaprob.id);
    }
  }

  useEffect(() => {
    getServicesaprob();
  }, [])


  useEffect(() => {
    setServicesaprob(BuscaTotal);
  }, [BuscaTotal])

  const buscadorB = (text) => {
    let resultado = [];

    for (let i = 0; i < BuscaTotal.length; i++) {
      if (BuscaTotal[i].device.toLowerCase().includes(text.target.value.toLowerCase())) {
        resultado.push(BuscaTotal[i])
      }
    }
    if (resultado.length <= 0) {
      SetMensajeB('No se ha encontrado');
    }
    else {
      SetMensajeB('');
    }

    if (text.target.value.length <= 0) {
      setServicesaprob(BuscaTotal);
    } else {
      setServicesaprob(resultado)
    }

  
    SetBuscador(text.target.value)
  }

  const onChangePage = (tam, size) => {
    
    if (tam == 1) {
      setCount(1);
      let temporales = servicesaprob.slice(0, intdor.current * tam);
      setUsuarios_mostrar(temporales);
    } else {
      setCount(intdor.current * tam - 4)
      let temporales = servicesaprob.slice(intdor.current * tam - 5, intdor.current * tam);
      setUsuarios_mostrar(temporales);

    }
  }

  useEffect(() => {

    if (servicesaprob.length > 0) {
      let temporales = servicesaprob.slice(0, 5);
      setUsuarios_mostrar(temporales);

      let total_temporal = servicesaprob.length / 5;

      let total_temporal_entero = parseInt(total_temporal);

      if (total_temporal > total_temporal_entero) {
        setCounTotal((total_temporal_entero + 1) * 10)

      } else {
        setCounTotal((total_temporal_entero) * 10)
      }
    }

  }, [servicesaprob])


  useEffect(() => {
    console.log(usuarios_mostrar)
  }, [usuarios_mostrar])


  return (
    <div>
      <div className="container-fluid">
        <div className="panel panel-success ">
          <h3>Lista de servicios</h3>
          <div className="panel-body">

            <Search onChange={buscadorB} placeholder="Buscar" className="col-xs-12 col-sm-6" />
            <p>{mensajeB}</p>

            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Cliente</th>
                    <th className="text-center">Dispositivo</th>
                    <th className="text-center">Descripción</th>
                    <th className="text-center">Ver detalle</th>
                    <th className="text-center">Acción</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    usuarios_mostrar &&
                    usuarios_mostrar.map((servicesaprob, index) => (
                      <tr key={servicesaprob.id}>
                        <td>{count + index}</td>
                        <td>{servicesaprob.cliente}</td>
                        <td>{servicesaprob.device}</td>
                        <td>{servicesaprob.description_problem}</td>
                        <td>
                          <Link to={`/servicesaprob/show/${servicesaprob.id}`} className="btn btn-warning btn-raised btn-xs">
                            <i><AiFillFileText /></i>
                          </Link>
                        </td>
                        <td>
                          <form>
                            <a type="submit" onClick={() => { Determinar(servicesaprob) }} className={`btn ${servicesaprob.state == 3 ? ' btn-success' : 'btn-info'} btn-raised btn-xs`}>
                              {servicesaprob.state == 3 ? <i className="bi bi-person-check-fill"> Finalizar</i> : <i className="bi bi-person-x-fill"> Pendiente</i>
                              }
                            </a>
                          </form>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              {
                !usuarios_mostrar && 
                <center>
                   No tienes solicitudes de servicios pendientes.
                  <Loanding />
                  </center>
              }
              <br />
              <center>
                <Pagination
                  defaultCurrent={1}
                  total={counTotal}
                  showSizeChanger
                  onChange={onChangePage}
                />
              </center>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
