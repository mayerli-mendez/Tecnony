import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import { Pagination, Input } from 'antd';
import { useRef } from 'react';
import { Loanding } from '../app/Loanding';
const { Search } = Input;


export const ListServic = () => {

  const navigate = useNavigate();
  const [servic, setServic] = useState([]);
  const token = localStorage.getItem('token');

  let intdor = useRef(5)
  const [count, setCount] = useState(1);
  const [counTotal, setCounTotal] = useState(1);
  const [buscador, SetBuscador] = useState('');
  const [mensajeB, SetMensajeB] = useState('');

  const [BuscaTotal, SetBuscaTotal] = useState([]);
  const [usuarios_mostratr, setUsuarios_mostratr] = useState(null);


  /* Aqui se trae los servicios */
  const getServic = async () => {
    console.log(servic);
    try {
      const response = await axios.get(
        'https://tecnony-v1.herokuapp.com/api/v1/service',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
    
      setServic(response.data.data.services);

      let temporalR =
        []
      temporalR = response.data.data.services

      SetBuscaTotal(temporalR);

    } catch (error) {
      console.log(error);
    }
  }

  const Cambiar = async (id) => {
    try {
      console.log(id)
      const response = await axios.get(
        `https://tecnony-v1.herokuapp.com/api/v1/service/destroy/${id}`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      await getServic();
    
    } catch (error) {
      console.log(error);
    }
  }

  /* Cambiar el estado del servicio */
  const deleteServic = async (id) => {
    try {
    
      Swal.fire({
        title: '¿Esta seguro?',
        showDenyButton: true,
        confirmButtonText: 'Si',
      }).then((result) => {

        if (result.isConfirmed) {
          Swal.fire('Cambio éxitoso!', '', 'success')
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
    getServic();
  }, [])

  useEffect(() => {
    setServic(BuscaTotal);
  }, [BuscaTotal])

  const buscadorB = (text) => {
    let resultado = [];

    for (let i = 0; i < BuscaTotal.length; i++) {
      if (BuscaTotal[i].name.toLowerCase().includes(text.target.value.toLowerCase())) {
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
      setServic(BuscaTotal);
    } else {
      setServic(resultado)
    }

    SetBuscador(text.target.value)
  }

  const onChangePage = (tam, size) => {

    if (tam == 1) {
      setCount(1);
      let temporales = servic.slice(0, intdor.current * tam);
      setUsuarios_mostratr(temporales);
    } else {
      setCount(intdor.current * tam - 4)
      let temporales = servic.slice(intdor.current * tam - 5, intdor.current * tam);
      setUsuarios_mostratr(temporales);

    }
  }

  useEffect(() => {

    if (servic.length > 0) {
      let temporales = servic.slice(0, 5);
      setUsuarios_mostratr(temporales);

      let total_temporal = servic.length / 5;

      let total_temporal_entero = parseInt(total_temporal);

      if (total_temporal > total_temporal_entero) {
        setCounTotal((total_temporal_entero + 1) * 10)

      } else {
        setCounTotal((total_temporal_entero) * 10)
      }
    }
  }, [servic])


  useEffect(() => {
  }, [usuarios_mostratr])


  return (
    <div>
      <div className="container-fluid">
        <div className="panel panel-success ">
          <h3>Lista de servicios ofertados</h3>
          <Search onChange={buscadorB} placeholder="Buscar" className="col-xs-12 col-sm-6" />
          <p>{mensajeB}</p>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Precio</th>
                    <th className="text-center">Ver detalle</th>
                    <th className="text-center">Editar</th>
                    <th className="text-center">Activar o Desactivar</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    usuarios_mostratr &&
                    usuarios_mostratr.map((servic, index) => (
                      <tr key={servic.id}>
                        <td>{count + index}</td>
                        <td>{servic.name}</td>
                        <td>${servic.price}</td>

                        <td>
                          <Link to={`/servic/show/${servic.id}`} className="btn btn-warning btn-raised btn-xs">
                            <i className="bi bi-file-earmark-richtext-fill"></i>
                          </Link>
                        </td>
                        <td>
                          {/*  Editar */}
                          <Link to={`/servic/edit/${servic.id}`} className="btn btn-info btn-raised btn-xs">
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                        </td>
                        <td>
                          <form>
                            <a type="submit" onClick={() => { deleteServic(servic.id) }} className={`btn ${servic.state ? ' btn-success' : 'btn-danger'} btn-raised btn-xs`}>
                              {servic.state ? <i className="bi bi-person-check-fill"></i> :
                                <i className="bi bi-person-x-fill"></i>
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
                !usuarios_mostratr && 
                <center>
                 No tienes tienes de servicios.
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
