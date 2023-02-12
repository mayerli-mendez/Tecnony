import React from 'react';
import { ServicAprobForm } from '../../components/organisms';
import { useNavigate } from "react-router-dom";

export const CreateServicAprob= () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <ServicAprobForm />
                </div>
            </div> 
        </div>
    );
}