import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Input } from 'antd';
import { Loanding } from '../app/Loanding';
import { useRef } from 'react';
const { Search } = Input;

export const ListComents = () => {
  const navigate = useNavigate();
  const [coments, setComents] = useState([]);
  const token = localStorage.getItem('token');

  let intdor = useRef(5)
  const [count, setCount] = useState(1);
  const [counTotal, setCounTotal] = useState(1);
  const [buscador, SetBuscador] = useState('');
  const [mensajeB, SetMensajeB] = useState('');

  const [BuscaTotal, SetBuscaTotal] = useState([]);
  const [usuarios_mostrar, setUsuarios_mostrar] = useState(null);

  const getComents = async () => {
    try {
      const response = await axios.get(
        'https://tecnony-v1.herokuapp.com/api/v1/view-satisfaction-form',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
    
      setComents(response.data.data.satisfaction_forms);
      let temporalR =
        []
      temporalR = response.data.data.satisfaction_forms
      SetBuscaTotal(temporalR);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getComents();
  }, [])

  useEffect(() => {
    setComents(BuscaTotal);
  }, [BuscaTotal])

  const buscadorB = (text) => {
    let resultado = [];


    for (let i = 0; i < BuscaTotal.length; i++) {
      if (BuscaTotal[i].comment && BuscaTotal[i].comment.toLowerCase().includes(text.target.value.toLowerCase())) {
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
      setComents(BuscaTotal);
    } else {
      setComents(resultado)
    }
    SetBuscador(text.target.value)
  }

  const onChangePage = (tam, size) => {
    if (tam == 1) {
      setCount(1);
      let temporales = coments.slice(0, intdor.current * tam);
      setUsuarios_mostrar(temporales);
    } else {
      setCount(intdor.current * tam - 4)
      let temporales = coments.slice(intdor.current * tam - 5, intdor.current * tam);
      setUsuarios_mostrar(temporales);
    }
  
  }

  useEffect(() => {
    if (coments.length > 0) {
      let temporales = coments.slice(0, 5);
      setUsuarios_mostrar(temporales);
  
      let total_temporal = coments.length / 5;
  
      let total_temporal_entero = parseInt(total_temporal);
  
      if (total_temporal > total_temporal_entero) {
        setCounTotal((total_temporal_entero + 1) * 10)
  
      } else {
        setCounTotal((total_temporal_entero) * 10)
      }
    }
    
  }, [coments])

  return (
    <div>
      <div className="container-fluid">
        <div className="panel panel-success ">
          <h3>Lista de Comentarios</h3>
          <div className="panel-body">

            <Search onChange={buscadorB} placeholder="Buscar" className="col-xs-12 col-sm-6" />
            <p>{mensajeB}</p>

            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Comentario</th>
                    <th className="text-center">Sugerencia</th>
                    <th className="text-center">Calificación</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    usuarios_mostrar &&
                    usuarios_mostrar.map((coments, index) => (
                      <tr key={coments.id}>
                        <td>{count + index}</td>
                        <td>{coments.comment}</td>
                        <td>{coments.suggestion}</td>
                        <td>{Math.round(coments.qualification)}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              {
                !usuarios_mostrar &&
                <center>
                 No tienes comentarios
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
