
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, {  useState } from 'react';
import { Label, Button } from '../../components'
import teamHero from '../../img/hero-img.png';
import Swal from 'sweetalert2'
import { validateEmail} from '../../Validations';

export const Forgot_password = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const [sms, setSms] = useState(null)

    const Forgot = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://tecnony-v1.herokuapp.com/api/v1/forgot-password',
                { email },
                { headers: { 'accept': 'application/json' } }
            )
           

            Swal.fire({
				position: 'center',
				icon: 'success',
				title: response.data.message,
				showConfirmButton: false,
				timer: 1500,
                background: 'transparent',
			})

            navigate('/login/reset_password');
        } catch (error) {
            console.log(error.response.data.message, 'error');
            Swal.fire({
				position: 'center',
				icon: 'warning',
				title: error.response.data.message,
				showConfirmButton: false,
				timer: 1500,
                background: 'transparent',
			})
            setEmail('');
        }
    }

    return (
        <>
            <section class=" text-center text-lg-start">
                <div class="card mb-3">

                    <div class="row g-0 d-flex align-items-center">
                        <div class="col-lg-4 d-none d-lg-flex">
                            <img src={teamHero} class="w-10 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" alt="" width='450' height='500'
                            />
                        </div>
                        <div class="col-lg-8">
                            <div class="card-body py-5 px-md-5">
                                <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" onClick={() => { navigate("/landing/login") }} role="tab"
                                            aria-controls="pills-login" aria-selected="true">Inicia sesión </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link" id="tab-register" data-mdb-toggle="pill" onClick={() => { navigate("/landing/register") }} role="tab"
                                            aria-controls="pills-register" aria-selected="false">Registrarse </a>
                                    </li>
                                </ul>

                                <form onSubmit={Forgot}>
                                    <p className="text-center text-light "><i className="zmdi zmdi-account-circle zmdi-hc-5x"></i></p>
                                   
                                    <div className="form-group label-floating">
                                        <Label description="Correo" htmlFor='email' />
                                        <input
                                            className="form-control"
                                            id='email'
                                            name='email'
                                            type='email'
                                            value={email}
                                            maxLength="35"
                                            required
                                            autoFocus
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                if (e.target.value.length > 0) {
                                                    setSms(validateEmail(e.target.value))

                                                } else {
                                                    setSms(null)
                                                }
                                                console.log(sms)
                                            }}
                                        />
                                         <small class="text-primary">{sms ? sms.message : 'Ingrese el correo'}</small>
                                    </div>
                                    <div className='pt-4 flex justify-center'>
                                        <Button name='Enviar correo' styles='w-3/5' />
                                    </div>
                                    <div className="text-center">
                                        <a onClick={() => { navigate("/landing/login") }} className="small text-info" href="">Regresar</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}



