import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AiFillFileText } from 'react-icons/ai';
import Swal from 'sweetalert2'
import { Pagination, Input } from 'antd';
import { Loanding } from '../app/Loanding';
const { Search } = Input;

export const ListRequest = () => {

  const navigate = useNavigate();
  const [request, setRequest] = useState([]);
  const token = localStorage.getItem('token');

  let intdor = useRef(5)
  const [BuscaTotal, SetBuscaTotal] = useState([]);
  const [buscador, SetBuscador] = useState('');
  const [usuarios_mostrar, setUsuarios_mostrar] = useState(null);
  const [count, setCount] = useState(1);
  const [counTotal, setCounTotal] = useState(1);
  const [mensajeB, SetMensajeB] = useState('');

  /*   Aqui obtengo la lista de solicitudes de afiliacion pendiente 
        que el administrador tiene que aceptar o rechazar */

  const getRequest = async () => {
    try {
      const response = await axios.get(
        'https://tecnony-v1.herokuapp.com/api/v1/manage/affiliation',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );

      setRequest(response.data.data.affiliations);

      let temporalR =
        []
      temporalR = response.data.data.affiliations
      SetBuscaTotal(temporalR);

    } catch (error) {
      console.log(error);
    }
  }

  /* Aqui se acepta la afiliacion pendiente */
  const Aceptar = async (id) => {
    try {

      const response = await axios.post(
        `https://tecnony-v1.herokuapp.com/api/v1/manage/affiliation/create/${id}`,
        { "state": 2, "observation": '' },
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );

      await getRequest();
    } catch (error) {
      console.log(error);
    }
  }

  /* Aqui se rechazar la afiliacion pendiente */
  const Rechazar = async (id) => {
    try {
      const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: '¿Cuál es el motivo por el cual va a rechazar la solicitud?',
        inputPlaceholder: 'Ingresa la observación',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        inputValidator: (value) => {
          if (!value) {
            return 'Necesitas ingresar una observación'
          }
        }
      })
      if (text) {
        Swal.fire('La afiliación fue rechazada', '', 'warning')
        const response = await axios.post(
          `https://tecnony-v1.herokuapp.com/api/v1/manage/affiliation/create/${id}`,
          { "state": 3, "observation": text },
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );

        await getRequest();
      }
    } catch (error) {
      console.log(error);
    }

  }

  /*   Aqui cambiamos el estado de la afiliacion pendiente si fue aceptada o rechazada */
  const Estado = async (request) => {
    try {
      Swal.fire({
        title: 'Deseas aceptar o rechazar la afiliación?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Rechazar`,
      }).then((result) => {

        if (result.isConfirmed) {
          Swal.fire('La afiliación esta aceptada', '', 'success')
          Aceptar(request.id);

        } else if (result.isDenied) {

          Rechazar(request.id);
        }
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRequest();

  }, [])

  useEffect(() => {
    setRequest(BuscaTotal);
  }, [BuscaTotal])

  const buscadorB = (text) => {
    let resultado = [];

    for (let i = 0; i < BuscaTotal.length; i++) {
      if (BuscaTotal[i].full_name.toLowerCase().includes(text.target.value.toLowerCase())) {
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
      setRequest(BuscaTotal);
    } else {
      setRequest(resultado)
    }
    SetBuscador(text.target.value)
  }

  const onChangePage = (tam, size) => {

    if (tam == 1) {
      setCount(1);
      let temporales = request.slice(0, intdor.current * tam);
      setUsuarios_mostrar(temporales);
    } else {
      setCount(intdor.current * tam - 4)
      let temporales = request.slice(intdor.current * tam - 5, intdor.current * tam);
      setUsuarios_mostrar(temporales);
    }
  }

  useEffect(() => {
    if (request.length > 0) {

      let temporales = request.slice(0, 5);
      setUsuarios_mostrar(temporales);

      let total_temporal = request.length / 5;

      let total_temporal_entero = parseInt(total_temporal);

      if (total_temporal > total_temporal_entero) {
        setCounTotal((total_temporal_entero + 1) * 10)

      } else {
        setCounTotal((total_temporal_entero) * 10)
      }
    }
  }, [request])

  useEffect(() => {

  }, [usuarios_mostrar])

  return (
    <div>
      <div className="container-fluid">
        <div className="panel panel-success ">
          <h3>Lista de afiliaciones pendientes</h3>
          <Search onChange={buscadorB} placeholder="Buscar" className="col-xs-12 col-sm-6" />
          <p>{mensajeB}</p>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Nombre Completo</th>
                    <th className="text-center">Profesión</th>
                    <th className="text-center">Ver detalle</th>
                    <th className="text-center">Aprobar o Rechazar</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    usuarios_mostrar &&
                    usuarios_mostrar.map((request, index) => (
                      <tr key={request.id}>
                        <td>{count + index}</td>
                        <td>{request.full_name}</td>
                        <td>{request.profession}</td>
                        <td>
                          <Link to={`/request/show/${request.id}`} className="btn btn-warning btn-raised btn-xs">
                            <i><AiFillFileText /></i>
                          </Link>
                        </td>

                        <td>
                          <form>
                            <a type="submit" onClick={() => { Estado(request) }}
                              className={`btn btn-info btn-raised btn-xs`}>
                              {request.state ? <i className="bi bi-person-check-fill"></i> :
                                <i><AiFillFileText /></i>
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
                   No tienes solicitudes de solicitudes pendientes.
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
