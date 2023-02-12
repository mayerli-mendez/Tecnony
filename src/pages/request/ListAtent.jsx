import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillFileText } from 'react-icons/ai';
import Swal from 'sweetalert2'
import { Pagination, Input } from 'antd';
import { Loanding } from '../app/Loanding';
import { useRef } from 'react';
const { Search } = Input;

export const ListAtent = () => {

  const navigate = useNavigate();
  const [atent, setAtent] = useState([]);
  const token = localStorage.getItem('token');
  const [reatent, setReatent] = useState([]);

  let intdor = useRef(5)
  const [count, setCount] = useState(1);
  const [counTotal, setCounTotal] = useState(1);
  const [buscador, SetBuscador] = useState('');
  const [mensajeB, SetMensajeB] = useState('');

  const [BuscaTotal, SetBuscaTotal] = useState([]);
  const [usuarios_mostrar, setUsuarios_mostrar] = useState(null);

  /*   Aqui obtengo la lista de solicitudes ATENDIDAS por el administrador*/
  const getAtent = async () => {
    console.log(atent);
    try {
      const response = await axios.get(
        'https://tecnony-v1.herokuapp.com/api/v1/manage/affiliations',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );

      setAtent(response.data.data.affiliations);
      setReatent(response.data.data.affiliations.state);

      let temporalR =
        []
      temporalR = response.data.data.affiliations
      SetBuscaTotal(temporalR);

    } catch (error) {
      console.log(error);
    }
  }
  /* Aqui se acepta la afiliacion que fue reagendada */
  const Aceptar = async (id) => {
    try {

      const response = await axios.post(
        `https://tecnony-v1.herokuapp.com/api/v1/manage/affiliation/update/${id}`,
        { "state": 2, "observation": '' },
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );

      await getAtent();
    } catch (error) {
      console.log(error);
    }
  }

  /*   Aqui se rechaza la afiliacion que fue reagendada */
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
          `https://tecnony-v1.herokuapp.com/api/v1/manage/affiliation/update/${id}`,
          { "state": 3, "observation": text },
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );

        await getAtent();
      }
    }

    catch (error) {
      console.log(error);
    }

  }

  /*   Aqui cambiamos el estado de la afiliacion si fue aceptada o rechazada */
  const Estado = async (atent) => {
    if (atent.state == 4) {
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
            Aceptar(atent.id);

          } else if (result.isDenied) {

            Rechazar(atent.id);
          }
        })
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      navigate(`/atent/show/${atent.id}`)
    }

  }

  useEffect(() => {
    getAtent();
  }, [])

  useEffect(() => {
    setAtent(BuscaTotal);
  }, [BuscaTotal])

  const buscadorB = (text) => {
    let resultado = [];


    for (let i = 0; i < BuscaTotal.length; i++) {
      if (BuscaTotal[i].observation && BuscaTotal[i].observation.toLowerCase().includes(text.target.value.toLowerCase())) {
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
      setAtent(BuscaTotal);
    } else {
      setAtent(resultado)
    }
    SetBuscador(text.target.value)
  }

  const onChangePage = (tam, size) => {
    if (tam == 1) {
      setCount(1);
      let temporales = atent.slice(0, intdor.current * tam);
      setUsuarios_mostrar(temporales);
    } else {
      setCount(intdor.current * tam - 4)
      let temporales = atent.slice(intdor.current * tam - 5, intdor.current * tam);
      setUsuarios_mostrar(temporales);
    }
  }

  useEffect(() => {
    if (atent.length > 0) {
      let temporales = atent.slice(0, 5);
      setUsuarios_mostrar(temporales);

      let total_temporal = atent.length / 5;

      let total_temporal_entero = parseInt(total_temporal);

      if (total_temporal > total_temporal_entero) {
        setCounTotal((total_temporal_entero + 1) * 10)

      } else {
        setCounTotal((total_temporal_entero) * 10)
      }
    }

  }, [atent])

  useEffect(() => {

  }, [usuarios_mostrar])

  return (
    <div>
      <div className="container-fluid">
        <div className="panel panel-success ">
          <h3>Lista de afiliaciones atendidas </h3>
          <Search onChange={buscadorB} placeholder="Buscar" className="col-xs-12 col-sm-6" />
          <p>{mensajeB}</p>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Día de aceptación</th>
                    <th className="text-center">Técnico</th>
                    <th className="text-center">Ver detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    usuarios_mostrar &&
                    usuarios_mostrar.map((atent, index) => (
                      <tr key={atent.id}>
                        <td>{count + index}</td>
                        <td>{atent.date_acceptance}</td>
                        <td>{atent.tecnico}</td>

                        <td>
                          <a size="small" onClick={() => { Estado(atent) }} className={`btn ${atent.state == 4 ? ' btn-success' : 'btn-warning'}`}
                          > {atent.state == 4 ? <i className="bi bi-person-check-fill" > Reatender </i> : <i> <AiFillFileText /> </i>}
                          </a>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              {
                !usuarios_mostrar && 
                <center>
                   No tienes solicitudes atendidas.
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
