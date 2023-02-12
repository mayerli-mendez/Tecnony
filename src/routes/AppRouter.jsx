import React from 'react'
import { Routes, Route, redirect } from 'react-router-dom';

import { Login, Register, Forgot_password, Reset_password } from '../pages/auth';
import { Dashboard } from '../pages/app/Dashboard';
import { Home } from '../pages/app/Home';
import { AuthTemplate } from '../components';
import { AuthProvider } from "../contexts";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

/* Importaciones de gestion de solicitudes */
import { Request } from '../pages/request/Request';
import { ListRequest } from '../pages/request/ListRequest';
import { ListAtent } from '../pages/request/ListAtent';
import { ShowRequest } from '../pages/request/ShowRequest';
import { ShowAtent } from '../pages/request/ShowAtent';

/*Importanciones de gestion de servicio*/
import { Servic } from '../pages/servic/Servic';
import { ListServic } from '../pages/servic/ListServic';
import { ShowServic } from '../pages/servic/ShowServic';
import { CreateServic } from '../pages/servic/CreateServic';
import { UpdateServic } from '../pages/servic/UpdateServic';

/*Importanciones de aprobar o rechazar servicios*/
import { ServicAprob } from '../pages/servicesaprob/ServicAprob';
import { ListServicAprob } from '../pages/servicesaprob/ListServicAprob';
import { CreateServicAprob } from '../pages/servicesaprob/CreateServicAprob';
import { ShowServicAprob } from '../pages/servicesaprob/ShowServicAprob';

import { ListFinalize } from '../pages/servicesaprob/ListFinalize';
import { ShowFinalize } from '../pages/servicesaprob/ShowFinalize';



import { Member } from '../pages/member/Member';
import { ListMember } from '../pages/member/ListMember';
import { ShowMember } from '../pages/member/ShowMember';
import { CreateMember } from '../pages/member/CreateMember';
import { UpdateMember } from '../pages/member/UpdateMember';

import { LandingPage } from '../pages/app/Landingpage';

import { Coments } from '../pages/coments/Coments';
import { ListComents } from '../pages/coments/ListComents';
import { ShowComents } from '../pages/coments/ShowComents'

import { ComentsAdmin } from '../pages/comentsAdmin/ComentsAdmin';
import { ListComentsAdmin } from '../pages/comentsAdmin/ListComentsAdmin';
import { ShowComentsAdmin } from '../pages/comentsAdmin/ShowComentsAdmin';
import { Profile } from '../pages/profile/Profile';
import { TecnonyContext } from '../pages/app/Context/TecnonyContext';
import { useContext } from 'react';
import { useEffect } from 'react';

export const AppRouter = () => {
    const { reloadWindow } = useContext(TecnonyContext)
    useEffect(() => {
        reloadWindow(true)
    }, [])
    return (
        <AuthProvider>
            <Routes>
               
                <Route path='/landing/*' element={
                    <PublicRouteRedirectHome />
                } />

                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                            <Route element={<Dashboard />}>
                                <Route index path='/' element={<Home />} />
                                <Route path='profile' element={<Profile />} />
                                <Route path='request' element={<Request />} >
                                    <Route index element={<ListRequest />} />
                                    <Route path='show/:id' element={<ShowRequest />} />


                                </Route>

                                {/* atendidos */}
                                <Route path='atent' element={<Request />} >
                                    <Route index element={<ListAtent />} />
                                    <Route path='show/:id' element={<ShowAtent />} />

                                </Route>

                                {/* Comentarios de los tecnicos */}
                                <Route path='coments' element={<Coments />} >
                                    <Route index element={<ListComents />} />
                                    <Route path='show/:id' element={<ShowComents />} />
                                </Route>

                                {/* Comentarios de los administradores */}
                                <Route path='comentsAdmin' element={<ComentsAdmin />} >
                                    <Route index element={<ListComentsAdmin />} />
                                    <Route path='show/:id' element={<ShowComentsAdmin />} />
                                </Route>

                                {/* Gestionar servicios */}
                                <Route path='servic' element={<Servic />} >
                                    <Route index element={<ListServic />} />
                                    <Route path='show/:id' element={<ShowServic />} />
                                    <Route path='create' element={<CreateServic />} />
                                    <Route path='edit/:id' element={<UpdateServic />} />
                                </Route>

                                {/* Aprobar o rechazar servicios*/}
                                <Route path='servicesaprob' element={<ServicAprob />} >
                                    <Route index element={<ListServicAprob />} />
                                    <Route path='create/:id' element={<CreateServicAprob />} />
                                    <Route path='show/:id' element={<ShowServicAprob />} />
                                </Route>

                                {/*    Son los servicios que estan finalizando dentro de aprobar o rechazar servicios. */}
                                <Route path='finalize' element={<ServicAprob />} >
                                    <Route index element={<ListFinalize />} />
                                    <Route path='show/:id' element={<ShowFinalize />} />

                                </Route>


                                <Route path='member' element={<Member />} >
                                    <Route index element={<ListMember />} />
                                    <Route path='show/:id' element={<ShowMember />} />
                                    <Route path='create' element={<CreateMember />} />
                                    <Route path='edit/:id' element={<UpdateMember />} />
                                </Route>
                            </Route>
                        </Routes>
                    </PrivateRoute>
                } />

            </Routes>
        </AuthProvider >
    )
}

const PublicRouteRedirectHome = () => {
    return <PublicRoute>
        <Routes>
            <Route element={<AuthTemplate />}>
                <Route path='/*' element={<LandingPage />} />
                <Route path='landing' element={<LandingPage />} />
                <Route path='login' element={<Login />} />
            </Route>

            <Route path="forgot_password" element={<Forgot_password />} />
            <Route path="reset_password/:token/:email" element={<Reset_password />} />
            <Route path="register" element={<Register />} />


        </Routes>
    </PublicRoute>
}
