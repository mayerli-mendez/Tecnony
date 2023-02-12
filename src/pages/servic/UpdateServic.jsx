import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ServicForm } from '../../components/organisms/ServicForm';
import { Loanding } from '../app/Loanding';

export const UpdateServic = () => {
    const { id } = useParams();
    const [servic, setServic] = useState({});
    const token = localStorage.getItem('token');

    const getServic = async () => {
        try {
            const response = await axios.get(
                `https://tecnony-v1.herokuapp.com/api/v1/service/show/${id}`,
                { headers: { 'accept': 'application/json', 'authorization': token } }
            )
            const servic = { ...response.data.data.service }
                     
            setServic(servic);
        } catch (error) {
            console.log(error);
        }
    }
   

    useEffect(() => {
        getServic();
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    {
                        Object.keys(servic).length > 0 ?
                            (
                                <ServicForm servic={servic} />
                            )
                            :
                            (
                                <p className="bg-yellow-600 border-t border-b border-yellow-900 text-black px-4 py-3 m-5 text-center rounded-lg">
                                    <Loanding />
                                </p>
                            )
                    }
                </div>
            </div>

        </div>
    )
}
