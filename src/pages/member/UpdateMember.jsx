import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MemberForm } from '../../components/organisms/MemberForm';
import { Loanding } from '../app/Loanding';

export const UpdateMember = () => {
    const [member, setMember] = useState({});
    const token = localStorage.getItem('token');

    const getMember = async () => {
        try {
            const response = await axios.get(
                `https://tecnony-v1.herokuapp.com/api/v1/affiliation/show`,
                { headers: { 'accept': 'application/json', 'authorization': token } }
            )
            const member = { ...response.data.data.affiliation }
            console.log(member);
            setMember(member);
        } catch (error) {
            console.log(error);
        }
    }
    getMember();

    useEffect(() => {
            }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <h3>Editar solicitud</h3>
                    {
                        Object.keys(member).length > 0 ?
                            (
                                <MemberForm member={member} />
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
