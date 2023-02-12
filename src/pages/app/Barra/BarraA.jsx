import React from 'react'
import { Link } from 'react-router-dom'
import { BiCommentDots, BiFolderMinus } from "react-icons/bi";

const BarraAdmin = () => {
    return (
        <>

            {/* ADMINISTRADOR */}
            <Link to="/request" className='zmdi zmdi-view-dashboard zmdi-hc-fw'>  
            <i><BiFolderMinus/></i> Aprobar o rechazar solicitudes</Link>

            <Link to="/comentsAdmin" className='zmdi zmdi-view-dashboard zmdi-hc-fw'>
            <i><BiCommentDots/></i>  Comentarios o sugerencias</Link>

        </>
    )
}
export default BarraAdmin;