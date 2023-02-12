import React from 'react'
import { Link } from 'react-router-dom'
import { BiCommentDots, BiFolderMinus, BiCategory } from "react-icons/bi";
import { BsUiChecks } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";


export const BarraTec = () => {

    const [attention, setAttention] = useState({});
    const token = localStorage.getItem("token");


    useEffect(() => {
        const getAttention = async () => {
            try {
                const response = await axios.get(
                    `https://tecnony-v1.herokuapp.com/api/v1/affiliation/show`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const attention = { ...response.data.data.attention };
                console.log(attention);
                setAttention(attention);

            } catch (error) {
                console.log(error);
            }
        };
        getAttention();

    }, []);

    if (attention.state == 2) {

        return (
            <>
                {/*  TECNICO */}

                <Link to="/servic" className='zmdi zmdi-view-dashboard zmdi-hc-fw'>
                    <i><BiCategory /></i> Gestión de servicios</Link>

                <Link to="/servicesaprob" className='zmdi zmdi-view-dashboard zmdi-hc-fw'>
                    <i><BsUiChecks /></i> Aprobar o rechazar servicios</Link>

                <Link to="/coments" className='zmdi zmdi-view-dashboard zmdi-hc-fw'>
                    <i><BiCommentDots /></i> Comentarios y sugerencias</Link>
            </>
        )

    } else {
        return (
            <>
                {/*  TECNICO */}

                <Link to="/member" className='zmdi zmdi-view-dashboard zmdi-hc-fw'>
                    <i><BiFolderMinus /></i>Solicitar afiliación</Link>
            </>
        )
    }
}

export default BarraTec;