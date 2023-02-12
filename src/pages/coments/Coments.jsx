import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Coments = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const urlActual = location.pathname;

    console.log(Coments);
    return (
        <>
            <div className="container-fluid">
                <div className="page-header">
                </div>
                <p className="lead">
                Este módulo te permite visualizar los comentarios recibidos .
                </p>
                <hr />
            </div>
            <Outlet />
        </>
    );
};
