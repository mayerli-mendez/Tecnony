import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label, Button } from '../../components'
import { AuthContext } from '../../contexts';
import teamHero from '../../img/hero-img.png';
import { validateEmail, validatePassword } from '../../Validations';
import Swal from 'sweetalert2'
import { TecnonyContext } from '../app/Context/TecnonyContext';

export const Login = () => {
    const { login } = useContext(AuthContext);

    const { cargarInfor} = useContext(TecnonyContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState('');

    /*   Contantes para poner la alerta  */
    const [sms, setSms] = useState(null)
    const [disable, setDisable] = useState(true);
    const [pass, setPass] = useState(null);

    useEffect(() => {
        
        if ((sms && sms.result) && (pass && pass.result)) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [sms, pass])

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://tecnony-v1.herokuapp.com/api/v1/login',
                { email, password },
                { headers: { 'accept': 'application/json' } }
            )
            const { access_token, token_type, user } = response.data.data
            cargarInfor(user);

            login(user, `${token_type} ${access_token}`);
            setAlerta(response.data.message)

			Swal.fire({
				position: 'center',
				icon: 'success',
				title: response.data.message,
				showConfirmButton: false,
				timer: 1500,
                background: 'transparent',
			})
            navigate('/');
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
            setPassword('');
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

                                <form className='' onSubmit={onLogin}>

                                    <div className="form-group label-floating">
                                       <b><Label description="Correo Electrónico" htmlFor='email' /></b>
                                        <input
                                            className='form-control'
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
                                    </div>

                                    <small class="text-primary">{sms ? sms.message : 'Ingrese el correo'}</small>
                                  
                                    <div className="form-group label-floating">
                                    <br />
                                       <b> <Label description="Contraseña" htmlFor='password' /></b>
                                        <input
                                            className='form-control'
                                            id='password'
                                            name='password'
                                            type='password'
                                            value={password}
                                            required
                                            onChange={e => {
                                                setPassword(e.target.value)
                                                if (e.target.value.length > 0) {
                                                    setPass(validatePassword(e.target.value))
                                                } else {
                                                    setPass(null)
                                                }
                                                console.log(pass)
                                            }}
                                        />

                                    </div>

                                    <small class="text-primary">{pass ? pass.message : 'Ingrese la contraseña'}</small>

                                    <div className='pt-4 flex justify-center'>
                                        <Button name='Iniciar sesión'
                                            disablebled={disable}
                                            styles='w-3/5' />
                                    </div>
                                    <div className="text-center">
                                        <a onClick={() => { navigate("/landing/forgot_password") }} className="small text-info" href="#">¿Ha olvidado su contraseña?</a>
                                    </div>
                                    <div className="text-center">
                                        <a onClick={() => { navigate("/landing/register") }} className="small text-info" href="#">Registrarse</a>
                                    </div>

                                </form>
                                <div class="alert-success"  >
                                    {alerta}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
