import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loanding } from '../app/Loanding';

export const ShowComents = () => {
    const navigate = useNavigate();
    const [showcoments, setShowComents] = useState([]);
    const token = localStorage.getItem('token');

    const getShowComents = async () => {

        try {
            const response = await axios.get(
                'https://tecnony-v1.herokuapp.com/api/v1/view-satisfaction-form',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
           
            setShowComents(response.data.data.satisfaction_forms.suggestion);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getShowComents();
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-success ">
                    <h3>Sugerencia</h3>
                    <div className="panel-body">

                        {Object.keys(showcoments).length > 0 ? (
                            <>
                                <p className="">

                                    <span className="">
                                        <strong> Nombre:</strong>{" "}
                                    </span>
                                    {showcoments.suggestion}
                                </p>
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
    );
}
