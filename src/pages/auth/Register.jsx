import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label, Button } from '../../components'
import { AuthContext } from '../../contexts';
import teamHero from '../../img/hero-img.png';
import { validateFirst, validateNames, validatePhoneNumber, validatePhoneNumberConvencional, validateDNI, validateDate, validatAdress, validateEmail, validatePassword } from '../../Validations';
import Swal from 'sweetalert2'

export const Register = () => {
    const { resgister } = useContext(AuthContext);
    const navigate = useNavigate();
    /*   Contantes para poner la alerta  */

    const [sms, setSms] = useState(null)
    const [sms1, setSms1] = useState(null)
    const [sms2, setSms2] = useState(null)
    const [sms3, setSms3] = useState(null)
    const [sms4, setSms4] = useState(null)
    const [sms5, setSms5] = useState(null)
    const [sms6, setSms6] = useState(null)
    const [sms7, setSms7] = useState(null)
    const [sms8, setSms8] = useState(null)
    const [sms9, setSms9] = useState(null)
    const [sms10, setSms10] = useState(null)

    const [alerta, setAlerta] = useState('');

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        personal_phone: "",
        address: "",
        cedula: "",
        birthdate: "",
        home_phone: "",
        email: "",
        password: "",
        password_confirmation: "",

    });

    const onRegister = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post(
                'https://tecnony-v1.herokuapp.com/api/v1/register-tecnico',
                { ...form },
                { headers: { 'accept': 'application/json' } }
            )
          
            setAlerta(response.data.message);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500,
                background: 'transparent',
            })

            navigate('/login');
        } catch (error) {
            console.log(error.response.data.message, 'error');
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500,
                background: 'transparent',
            })
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>

            <section className=" text-center text-lg-start">
                <div className="card mb-3">

                    <div className="row g-0 d-flex align-items-center">
                        <div className="col-lg-4 d-none d-lg-flex">
                            <img src={teamHero} className="w-10 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" alt="" width='450' height='500'
                            />
                        </div>
                        <div className="col-lg-8">
                            <div className="card-body py-5 px-md-5">
                                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" onClick={() => { navigate("/landing/login") }} role="tab"
                                            aria-controls="pills-login" aria-selected="true">Inicia sesión</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="tab-register" data-mdb-toggle="pill" onClick={() => { navigate("/landing/register") }} role="tab"
                                            aria-controls="pills-register" aria-selected="false">Registrarse </a>
                                    </li>
                                </ul>

                                <form className='' onSubmit={onRegister}>
                                    <div className="row">

                                        <div className="form-group label-floating">
                                            <b> <Label description="Nombre de Usuario" htmlFor='username' /></b>
                                            <input
                                                className='form-control'
                                                id='username'
                                                name='username'
                                                type='username'
                                                value={form.username}
                                                pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{5,35}"
                                                required
                                                onChange={(e) => {

                                                    setForm({ ...form, ...{ username: e.target.value } })
                                                    if (e.target.value.length > 0) {
                                                        setSms(validateFirst(e.target.value))
                                                    } else {
                                                        setSms(null)
                                                    }
                                                    console.log(sms)
                                                }}
                                            />

                                            <small className="text-primary">{sms ? sms.message : 'Ingrese el nombre de usuario'}</small>
                                        </div>


                                        <div className="col-md-6 mb-4">
                                            <b><Label description="Nombre" htmlFor='first_name' /></b>
                                            <input
                                                className='form-control'
                                                id='first_name'
                                                name='first_name'
                                                type='first_name'
                                                value={form.first_name}
                                                pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,30}"
                                                required
                                                onChange={(e) => {
                                                    setForm({ ...form, ...{ first_name: e.target.value } })
                                                    if (e.target.value.length > 0) {
                                                        setSms1(validateNames(e.target.value))

                                                    } else {
                                                        setSms1(null)
                                                    }
                                                    console.log(sms1)
                                                }}
                                            />
                                            <small className="text-primary">{sms1 ? sms1.message : 'Ingrese el nombre'}</small>
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <b> <Label description="Apellido" htmlFor='last_name' /></b>
                                            <input
                                                className='form-control'
                                                id='last_name'
                                                name='last_name'
                                                type='last_name'
                                                value={form.last_name}
                                                pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,30}"
                                                required

                                                onChange={(e) => {
                                                    setForm({ ...form, ...{ last_name: e.target.value } })
                                                    if (e.target.value.length > 0) {
                                                        setSms2(validateNames(e.target.value))
                                                    } else {
                                                        setSms2(null)
                                                    }
                                                    console.log(sms2)
                                                }}
                                            />
                                            <small className="text-primary">{sms2 ? sms2.message : 'Ingrese el apellido'}</small>

                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <b> <Label description="Número celular" htmlFor='personal_phone' /></b>
                                            <input
                                                className='form-control'
                                                id='personal_phone'
                                                name='personal_phone'
                                                type='personal_phone'
                                                value={form.personal_phone}
                                                pattern="[0-9+]{1,15}"
                                                required
                                                onChange={(e) => {
                                                    setForm({ ...form, ...{ personal_phone: e.target.value } })
                                                    if (e.target.value.length > 0) {
                                                        setSms3(validatePhoneNumber(e.target.value))
                                                    } else {
                                                        setSms3(null)
                                                    }
                                                    console.log(sms3)
                                                }}
                                            />
                                            <small className="text-primary">{sms3 ? sms3.message : 'Ingrese nùmero de celular'}</small>

                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <b> <Label description="Teléfono convencional" htmlFor='home_phone' /></b>
                                            <input
                                                className='form-control'
                                                id='home_phone'
                                                name='home_phone'
                                                type='home_phone'
                                                value={form.home_phone}
                                                pattern="[0-9+]{1,15}"
                                                required
                                                onChange={(e) => {
                                                    setForm({ ...form, ...{ home_phone: e.target.value } })
                                                    if (e.target.value.length > 0) {
                                                        setSms4(validatePhoneNumberConvencional(e.target.value))
                                                    } else {
                                                        setSms4(null)
                                                    }
                                                    console.log(sms4)
                                                }}
                                            />
                                            <small className="text-primary">{sms4 ? sms4.message : 'Ingrese el telèfono convencional'}</small>

                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <b><Label description="DNI/Cèdula" htmlFor='cedula' /></b>
                                            <input
                                                className='form-control'
                                                id='cedula'
                                                name='cedula'
                                                type='cedula'
                                                value={form.cedula}
                                                pattern="[0-9-]{1,30}"
                                                required

                                                onChange={(e) => {
                                                    setForm({ ...form, ...{ cedula: e.target.value } })
                                                    if (e.target.value.length > 0) {
                                                        setSms5(validateDNI(e.target.value))
                                                    } else {
                                                        setSms5(null)
                                                    }
                                                    console.log(sms5)
                                                }}
                                            />
                                            <small className="text-primary">{sms5 ? sms5.message : 'Ingrese la cèdula'}</small>


                                        </div>

                                        <div className="fcol-md-6 mb-4">
                                            <b><Label description="Fecha de nacimiento " htmlFor='birthdate' /></b>
                                            <input

                                                id='birthdate'
                                                name='birthdate'
                                                type="date"
                                                value={form.birthdate}
                                                required pattern="\d{4}-\d{2}-\d{2}"

                                                onChange={(e) => {
                                                    setForm({ ...form, ...{ birthdate: e.target.value } })
                                                    if (e.target.value.length > 0) {
                                                        setSms6(validateDate(e.target.value))
                                                    } else {
                                                        setSms6(null)
                                                    }
                                                    console.log(sms6)
                                                }}
                                            />
                                            <small className="text-primary">{sms6 ? sms6.message : 'Ingrese la fecha'}</small>

                                        </div>

                                        <div className="form-group label-floating">
                                            <b><Label description="Direcciòn" htmlFor='address' /></b>
                                            <input
                                                className='form-control'
                                                id='address'
                                                name='address'
                                                type='address'
                                                value={form.address}
                                                maxLength="100"
                                                required
                                                onChange={(e) => {
                                                    setForm({ ...form, ...{ address: e.target.value } })
                                                    if (e.target.value.length > 0) {
                                                        setSms7(validatAdress(e.target.value))
                                                    } else {
                                                        setSms7(null)
                                                    }
                                                    console.log(sms7)
                                                }}
                                            />
                                            <br />
                                            <small className="text-primary">{sms7 ? sms7.message : 'Ingrese la direcciòn'}</small>

                                        </div>

                                        <div className="form-group label-floating">
                                            <b><Label description="Correo Electrónico" htmlFor='email' /></b>
                                            <input
                                                className='form-control'
                                                id='email'
                                                name='email'
                                                type='email'
                                                value={form.email}
                                                maxLength="35"
                                                required
                                                autoFocus
                                                onChange={(e) => {
                                                    setForm({ ...form, ...{ email: e.target.value } })
                                                    if (e.target.value.length > 0) {
                                                        setSms8(validateEmail(e.target.value))
                                                    } else {
                                                        setSms8(null)
                                                    }
                                                    console.log(sms8)
                                                }}
                                            />
                                            <small className="text-primary">{sms8 ? sms8.message : 'Ingrese el correo electrònico'}</small>

                                        </div>
                                        
                                        <div className="form-group label-floating">
                                            <b><Label description="Contraseña" htmlFor='password' /></b>
                                            <input
                                                className='form-control'
                                                id='password'
                                                name='password'
                                                type='password'
                                                value={form.password}
                                                required
                                                onChange={(e) => {
                                                    setForm({ ...form, ...{ password: e.target.value } })
                                                    if (e.target.value.length > 0) {
                                                        setSms9(validatePassword(e.target.value))
                                                    } else {
                                                        setSms9(null)
                                                    }
                                                    console.log(sms9)
                                                }}
                                            />
                                            <small className="text-primary">{sms9 ? sms9.message : 'Ingrese la contraseña'}</small>

                                        </div>

                                        <div className="form-group label-floating">
                                            <b> <Label description="Confirmar Contraseña" htmlFor='password_confirmation' /></b>
                                            <input
                                                className='form-control'
                                                id='password_confirmation'
                                                name='password_confirmation'
                                                type='password'
                                                value={form.password_confirmation}
                                                required
                                                onChange={(e) => {
                                                    setForm({ ...form, ...{ password_confirmation: e.target.value } })
                                                    if (e.target.value.length > 0) {
                                                        setSms10(validatePassword(e.target.value))
                                                    } else {
                                                        setSms10(null)
                                                    }
                                                    console.log(sms10)
                                                }}
                                            />
                                            <small className="text-primary">{sms10 ? sms10.message : 'Ingrese la contraseña'}</small>

                                        </div>
                                    </div>
                                    <div className='pt-4 flex justify-center'>
                                        <Button name='Registrarse' styles='w-3/5'
                                        />
                                    </div>
                                    <div className="text-center">
                                        <a onClick={() => { navigate("/landing/forgot_password") }} className="small text-info" href="#">¿Ha olvidado su contraseña?</a>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
