import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AiFillFileText } from 'react-icons/ai';
import Swal from 'sweetalert2'
import { Pagination, Input } from 'antd';
import { useRef } from 'react';
import { Loanding } from '../app/Loanding';
const { Search } = Input;

export const ListFinalize = () => {

  const navigate = useNavigate();
  const [finalize, setFinalize] = useState([]);
  const token = localStorage.getItem('token');

  let intdor = useRef(5)
  const [count, setCount] = useState(1);
  const [counTotal, setCounTotal] = useState(1);
  const [buscador, SetBuscador] = useState('');
  const [mensajeB, SetMensajeB] = useState('');

  const [BuscaTotal, SetBuscaTotal] = useState([]);
  const [usuarios_mostrar, setUsuarios_mostratr] = useState(null);


  const getFinalize = async () => {
    console.log(finalize);
    try {
      const response = await axios.get(
        'https://tecnony-v1.herokuapp.com/api/v1/manage-hiring/show-finalize',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );

      setFinalize(response.data.data.service_requests);

      let temporalR =
        []
      temporalR = response.data.data.service_requests

      SetBuscaTotal(temporalR);


    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getFinalize();
  }, [])

  useEffect(() => {
    setFinalize(BuscaTotal);
  }, [BuscaTotal])

  const buscadorB = (text) => {
    let resultado = [];

    for (let i = 0; i < BuscaTotal.length; i++) {
      if (BuscaTotal[i].diagnosis.toLowerCase().includes(text.target.value.toLowerCase())) {
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
      setFinalize(BuscaTotal);
    } else {
      setFinalize(resultado)
    }

    console.log(text.target.value)
    SetBuscador(text.target.value)
  }

  const onChangePage = (tam, size) => {

    if (tam == 1) {
      setCount(1);
      let temporales = finalize.slice(0, intdor.current * tam);
      setUsuarios_mostratr(temporales);
    } else {

      setCount(intdor.current * tam - 4)
      let temporales = finalize.slice(intdor.current * tam - 5, intdor.current * tam);
      setUsuarios_mostratr(temporales);

    }

  }

  useEffect(() => {
   
  }, [usuarios_mostrar])


  useEffect(() => {

    if (finalize.length > 0) {
      let temporales = finalize.slice(0, 5);
      setUsuarios_mostratr(temporales);

      let total_temporal = finalize.length / 5;

      let total_temporal_entero = parseInt(total_temporal);

      if (total_temporal > total_temporal_entero) {
        setCounTotal((total_temporal_entero + 1) * 10)

      } else {
        setCounTotal((total_temporal_entero) * 10)
      }
    }

  }, [finalize])

  const Cambiar = async (id) => {
    try {
      console.log(id)
      const response = await axios.get(
        `https://tecnony-v1.herokuapp.com/api/v1/manage-hiring/paid/${id}`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      await getFinalize();

    } catch (error) {
      console.log(error);
    }
  }

  /* Cambiar el estado del pago */
  const ConfirmPay = async (id) => {
    try {

      Swal.fire({
        title: '¿El servicio ya fue pagado?',
        showDenyButton: true,
        confirmButtonText: 'Si',
      }).then((result) => {

        if (result.isConfirmed) {
          Swal.fire('Servicio pagado!', '', 'success')
          Cambiar(id);
        } else if (result.isDenied) {
          Swal.fire('No se han ejecutado cambios', '', 'info')
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

  }, [usuarios_mostrar])

  return (
    <div>
      <div className="container-fluid">
        <div className="panel panel-success ">
          <h3>Lista de servicios finalizados</h3>
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
                    <th className="text-center">Ver detalle</th>
                    <th className="text-center">Pagado</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    usuarios_mostrar &&
                    usuarios_mostrar.map((finalize, index) => (
                      <tr key={index}>
                        <td>{count + index}</td>
                        <td>{finalize.cliente}</td>
                        <td>{finalize.device}</td>
                        <td>
                          <Link to={`/finalize/show/${finalize.id}`} className="btn btn-warning btn-raised btn-xs">
                            <i><AiFillFileText /></i>
                          </Link>
                        </td>
                        <td>
                          <form>
                            <a type="submit" onClick={() => {

                              if (finalize.state == 4) {
                                ConfirmPay(finalize.id)
                              }
                            }} className={`btn ${finalize.state == 4 ? 'btn-info' : 'btn-sencundary'} btn-raised btn-xs`}>
                              {finalize.state == 4 ? <i className="bi bi-person-x-fill">Sin pagar</i> :
                                <i className="bi bi-person-check-fill  ">Pagado</i>
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
                   No tienes solicitudes de servicios finalizados.
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
