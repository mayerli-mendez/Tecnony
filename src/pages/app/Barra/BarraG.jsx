import React from 'react'
import { Link } from 'react-router-dom'
import BarraAdmin from './BarraA'
import BarraTec from './BarraT'
import { useContext } from 'react';
import { AuthContext } from '../../../contexts';


const BarraGen = () => {
    const { user, logout } = useContext(AuthContext);
    if (user.role == 'admin') {
        return <BarraAdmin></BarraAdmin>
    } else {
        return <BarraTec></BarraTec>
    }
}

export default BarraGen;