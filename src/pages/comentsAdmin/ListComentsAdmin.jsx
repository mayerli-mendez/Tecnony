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

export const ListComentsAdmin = () => {

  const navigate = useNavigate();
  const [tec, setTec] = useState([]);
  const token = localStorage.getItem('token');
  let intdor = useRef(5)
  const [count, setCount] = useState(1);
  const [counTotal, setCounTotal] = useState(1);
  const [buscador, SetBuscador] = useState('');
  const [mensajeB, SetMensajeB] = useState('');

  const [BuscaTotal, SetBuscaTotal] = useState([]);
  const [usuarios_mostrar, setusuarios_mostrar] = useState(null);

  {/* Aqui traemos los datos del tecnico*/ }
  const getTec = async () => {
    try {
      const response = await axios.get(
        'https://tecnony-v1.herokuapp.com/api/v1/manage-tec',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
     
      let temporalR =[]
      temporalR = response.data.data.users
      SetBuscaTotal(temporalR);

    }
    catch (error) {
      console.log(error);
    }
  }

  {/* Aqui se activa o desactiva a un tecnico de acuerdo a los comentarios del tecnico*/ }
  const Estado = async (tec) => {
    try {
      
      if (tec.state == 1) {
        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputLabel: '¿Cuál es el motivo por el cual va a desactivar a este técnico?',
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
          Swal.fire('El técnico fue desactivado', '', 'warning')
          const response = await axios.post(
            `https://tecnony-v1.herokuapp.com/api/v1/manage-tec/change-state/${tec.id}`,
            { observation: text },
            { headers: { 'accept': 'application/json', 'authorization': token } }
          );
          await getTec();
          console.log(response.message)
        }
      }

      else {
        Swal.fire({
          title: '¿Está seguro que desea activar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok',
        })
        Swal.fire('El técnico fue activado', '', 'success')

        const response = await axios.post(
          `https://tecnony-v1.herokuapp.com/api/v1/manage-tec/change-state/${tec.id}`,
          { observation: "" },
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getTec();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTec();
  }, [])

  useEffect(() => {
    setTec(BuscaTotal);
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
      setTec(BuscaTotal);
    } else {
      setTec(resultado)
    }

    SetBuscador(text.target.value)
  }


  const onChangePage = (tam, size) => {
    
    if (tam == 1) {
      setCount(1);
      let temporales = tec.slice(0, intdor.current * tam);
      setusuarios_mostrar(temporales);
    } else {
      setCount(intdor.current * tam - 4)
      let temporales = tec.slice(intdor.current * tam - 5, intdor.current * tam);
      setusuarios_mostrar(temporales);

    }
   
  }

  useEffect(() => {

    if (tec.length > 0) {
      let temporales = tec.slice(0, 5);
      setusuarios_mostrar(temporales);

      let total_temporal = tec.length / 5;

      let total_temporal_entero = parseInt(total_temporal);

      if (total_temporal > total_temporal_entero) {
        setCounTotal((total_temporal_entero + 1) * 10)

      } else {
        setCounTotal((total_temporal_entero) * 10)
      }
    }
  }, [tec])


  useEffect(() => {
  
  }, [usuarios_mostrar])

  return (

    <div>
      <div className="container-fluid">
        <div className="panel panel-success ">
          <h3>Lista de Técnicos </h3>
          <Search onChange={buscadorB} placeholder="Buscar" className="col-xs-12 col-sm-6" />
          <p>{mensajeB}</p>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Nombre de Usuario </th>
                    <th className="text-center">Nombre Completo</th>
                    <th className="text-center">Ver detalle</th>
                    <th className="text-center">Activar o Desactivar</th>
                  </tr>

                </thead>
                <tbody>

                  {
                    usuarios_mostrar &&
                    usuarios_mostrar.map((tec, index) => (
                      <tr key={tec.id}>
                        <td>{count + index}</td>
                        <td>{tec.username}</td>
                        <td>{tec.full_name}</td>

                        <td>
                          <Link to={`/comentsAdmin/show/${tec.id}`} className="btn btn-warning btn-raised btn-xs">
                            <i><AiFillFileText /></i>
                          </Link>
                        </td>

                        <td>
                          <form>
                            <a type="submit" onClick={() => { Estado(tec) }} className={`btn ${tec.state ? ' btn-success' : 'btn-danger'} btn-raised btn-xs`}>
                              {tec.state ? <i className="bi bi-person-check-fill"></i> :
                                <i className="bi bi-person-x-fill"></i>
                              }
                            </a>
                          </form>
                        </td>
                      </tr>
                    )
                    )
                  }
                </tbody>
              </table>

              {
                !usuarios_mostrar && 
                <center>
                   No tienes comentarios.
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
