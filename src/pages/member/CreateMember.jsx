import React from 'react';
import { MemberForm } from '../../components/organisms';

export const CreateMember = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <h3>Solicitar afiliación</h3>
                    <MemberForm/>
                </div>
            </div>
        </div>
    );
}