import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GrUpdate } from "react-icons/gr";
import { validateCategories, validateDescription, validateNamesService, validatePrice } from '../../Validations';
import { Drop } from '../../pages/app/Drop';
import Swal from 'sweetalert2'

export const ServicForm = ({ servic }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [alerta, setAlerta] = useState('');

    const [name, setName] = useState(servic?.name);
    const [description, setDescription] = useState(servic?.description);
    const [price, setPrice] = useState(servic?.price);
    const [categories, setCategories] = useState(servic?.categories);
    const [image, setImage] = useState(null);
    const [attention_mode, setMood_attention] = useState();
    const [attention_description, setDescrptionAtt] = useState(servic?.attention_description);
    const [payment_method, setPayment_method] = useState();
    const [payment_description, setDescrptionMeth] = useState(servic?.payment_description);

    const [moodAttention, setmoodAttentiontxt] = useState('Selecione el modo de atención');
    const [payMethod, setpayMethodtxt] = useState('Selecione el método de pago');

    const token = localStorage.getItem('token');

    const [sms, setSms] = useState(null)
    const [sms1, setSms1] = useState(null)
    const [sms2, setSms2] = useState(null)
    const [sms3, setSms3] = useState(null)
    const [sms4, setSms4] = useState(null)
    const [sms5, setSms5] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("name", name);
        data.append("categories", categories);
        data.append("description", description);
        data.append("price", price);
        data.append("attention_mode", attention_mode);
        data.append("attention_description", attention_description);
        data.append("payment_method", payment_method);
        data.append("payment_description", payment_description);

        if (image != null) {
            data.append("image", image);
        }

        try {
            console.log(servic)
            if (servic?.id) {
                const response = await axios.post(
                    `https://tecnony-v1.herokuapp.com/api/v1/service/update/${servic.id}`,
                    data,
                    { headers: { 'authorization': token } }
                );
                console.log(response.data)
                setAlerta(response.data.message)

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                    background: 'transparent',

                })

            } else {
                const response = await axios.post(
                    `https://tecnony-v1.herokuapp.com/api/v1/service/create`,
                    data,
                    { headers: { 'authorization': token } }
                );
                console.log(response.data)
                setAlerta(response.data.message)

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                    background: 'transparent',

                })

            }
            navigate('/servic');

        } catch (error) {
            console.log(error.response.data.message, 'error');
            
            Swal.fire({
				position: 'center',
				icon: 'warning',
				title: 'Debes ingresar los campos correctamente',
				showConfirmButton: false,
				timer: 1500
			})
        }
    }

    const onClickMood = ({ key }) => {

        let itemMood = moods.filter(item => item.key == key)
        setmoodAttentiontxt(itemMood[0].key)
        setMood_attention(itemMood[0].key)
    };
    const moods = [
        {
            label: 'Local',
            key: '1',

        },
        {
            label: 'Domicilio',
            key: '2',

        }
    ];

    const onClickPay = ({ key }) => {

        let itemPay = pay.filter(item => item.key == key)
        setpayMethodtxt(itemPay[0].key)
        setPayment_method(itemPay[0].key)
    };
    const pay = [
        {
            label: 'Efectivo',
            key: '1',
        },
        {
            label: 'Deposito o Transferencia',
            key: '2',
        },
    ];


    return (
        <>
            <div className="panel-body">
                <form onSubmit={handleSubmit}>
                    {
                        error && <p className='text-red-700 font-semibold text-xl'>Todos los campos son obligatorios</p>
                    }
                    <fieldset>

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <h3>Información</h3>
                                    {/* Categoria */}
                                    <b> <label htmlFor='categories' className="control-label">Categoria*</label></b>
                                    <input
                                        className="form-control"
                                        id='categories'
                                        type="text"
                                        placeholder='Categoria'
                                        name='categories'
                                        value={categories}
                                        required

                                        onChange={(e) => {
                                            setCategories(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms(validateCategories(e.target.value))

                                            } else {
                                                setSms(null)
                                            }
                                            console.log(sms)
                                        }}
                                    />

                                    <small className="text-primary">{sms ? sms.message : 'Ingrese la categoria'}</small>
                                    <br />
                                    {/* Nombre */}
                                    <b> <label htmlFor='first_name' className="control-label">Nombre*</label></b>
                                    <input
                                        className="form-control"
                                        id='name'
                                        type="text"
                                        placeholder='Nombre'
                                        name='name'
                                        value={name}
                                        required

                                        onChange={(e) => {
                                            setName(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms1(validateNamesService(e.target.value))

                                            } else {
                                                setSms1(null)
                                            }
                                            console.log(sms1)
                                        }}

                                    />
                                    <small className="text-primary">{sms1 ? sms1.message : 'Ingrese el nombre'}</small>
                                    <br />
                                    {/* Descripcion */}
                                    <b>  <label htmlFor='description' className="control-label">Descripción*</label></b>
                                    <textarea
                                        className="form-control"
                                        id='description'
                                        type="text"
                                        placeholder='Descripción '
                                        name='description'
                                        value={description}
                                        required

                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms2(validateDescription(e.target.value))

                                            } else {
                                                setSms2(null)
                                            }
                                            console.log(sms2)
                                        }}
                                    />
                                    <small className="text-primary">{sms2 ? sms2.message : 'Ingrese la descripción'}</small>
                                    <br />
                                    {/*  Precio */}
                                    <b> <label htmlFor='price' className="control-label">Precio*</label></b>
                                    <input
                                        className="form-control"
                                        id='price'
                                        type="number"
                                        placeholder='Precio'
                                        name='price'
                                        value={price}
                                        required
                                        onChange={(e) => {
                                            setPrice(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms3(validatePrice(e.target.value))

                                            } else {
                                                setSms3(null)
                                            }
                                            console.log(sms3)
                                        }}

                                    />
                                    <small className="text-primary">{sms3 ? sms3.message : 'Ingrese el precio'}</small>
                                    <br />
                                    <hr />
                                    {/* Modo de atención */}
                                    <b> <label htmlFor='attention_mode' className="control-label">Modo de atención*</label></b>
                                    <br />
                                    <small>1. Local</small ><br />
                                    <small>2. Domicilio</small><br />
                                    < Drop items={moods} onClick={onClickMood} title={moodAttention} />
                                    <br />
                                    <br />
                                    {/* Descripción de modo de atención */}
                                    <b>  <label htmlFor='description' className="control-label">Descripción del modo de atención*</label></b>
                                    <textarea
                                        className="form-control"
                                        id='attention_description'
                                        type="text"
                                        placeholder='Descripción '
                                        name='attention_description'
                                        value={attention_description}
                                        required
                                        onChange={(e) => {
                                            setDescrptionAtt(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms4(validateDescription(e.target.value))

                                            } else {
                                                setSms4(null)
                                            }
                                            console.log(sms4)
                                        }}

                                    />
                                    <small className="text-primary">{sms4 ? sms4.message : 'Ingrese la descripción'}</small>
                                    {/* Metodo de pago */}

                                    <br />
                                    <hr />
                                    <b> <label htmlFor='payment_method' className="control-label">Método de pago*</label></b>
                                    <br />
                                    <small>1. Efectivo</small ><br />
                                    <small>2. Deposito o transferencia</small><br />
                                    < Drop items={pay} onClick={onClickPay} title={payMethod} />
                                    <br />
                                    <br />
                                    {/* Descripción de metodo de pago */}
                                    <b>  <label htmlFor='description' className="control-label">Descripción del método de pago*</label></b>
                                    <textarea
                                        className="form-control"
                                        id='payment_description'
                                        type="text"
                                        placeholder='Descripción '
                                        name='payment_description'
                                        value={payment_description}
                                        required
                                        onChange={(e) => {
                                            setDescrptionMeth(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms5(validateDescription(e.target.value))

                                            } else {
                                                setSms5(null)
                                            }
                                            console.log(sms5)
                                        }}
                                    />
                                    <small className="text-primary">{sms5 ? sms5.message : 'Ingrese la descripción'}</small>
                                </div>
                                {/* Imagen */}
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">

                                        <h3>Imagen</h3>
                                        <form >
                                            <center>
                                                <img src={servic?.image} width='250' height='250' class="rounded-circle" />
                                            </center>

                                            <div className="col-xs-12 col-sm-6"></div>
                                            <div className="form-group">
                                                <input
                                                    id='imagen'
                                                    type="file"
                                                    name="avatar"
                                                    placeholder='imagen'
                                                    className='form-control'
                                                    accept=".jpg, .png, .jpeg"
                                                    onChange={(e) => setImage(e.target.files[0])}

                                                    required />
                                                <span><smallspan>Inserte la URL de la imagen</smallspan></span>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />

                        <center>
                            <button value={servic?.id ? 'Actualizar' : 'Guardar'} type="submit" class="btn btn-success"><i className="">
                                <i><GrUpdate /></i>
                            </i> Guardar
                            </button>
                        </center>

                    </fieldset>
                    <br />

                </form>
            </div>


        </>

    )
}
