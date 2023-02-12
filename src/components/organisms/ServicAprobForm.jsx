import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { validatePrice, validateText, validateWarranty } from '../../Validations';

export const ServicAprobForm = ({ servicesaprob }) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [alerta, setAlerta] = useState('');

    const [diagnosis, setDiagnosis] = useState(servicesaprob?.diagnosis);
    const [incident_resolution, setIncident_resolution] = useState(servicesaprob?.incident_resolution);
    const [warranty, setWarranty] = useState(servicesaprob?.warranty);
    const [spare_parts, setSpare_parts] = useState(servicesaprob?.spare_parts);
    const [price_spare_parts, setPrice_spare_parts] = useState(servicesaprob?.price_spare_parts);
    const [final_price, setFinal_price] = useState(servicesaprob?.final_price);

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

        data.append("diagnosis", diagnosis);
        data.append("incident_resolution", incident_resolution);
        data.append("warranty", warranty);
        data.append("spare_parts", spare_parts);
        data.append("price_spare_parts", price_spare_parts);
        data.append("final_price", final_price);

        try {
            console.log(id)
            if (id) {
                const response = await axios.post(
                    `https://tecnony-v1.herokuapp.com/api/v1/manage-hiring/finalize/${id}`,
                    data,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
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

            navigate('/finalize');

        } catch (error) {
            console.log(error.response.data.message, 'error');

            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Debes ingresar los campos correctamente',
                showConfirmButton: false,
                timer: 1500,
                background: 'transparent',
            })
        }
    }

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
                                    <h3>Información del servicio</h3>
                                    {/* Diagnóstico */}
                                    <b> <label htmlFor='diagnosis' className="control-label">Diagnóstico*</label></b>
                                    <input
                                        className="form-control"
                                        id='diagnosis'
                                        type="text"
                                        placeholder='Diagnóstico'
                                        name='diagnosis'
                                        value={diagnosis}
                                        required
                                        onChange={(e) => {
                                            setDiagnosis(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms(validateText(e.target.value))

                                            } else {
                                                setSms(null)
                                            }
                                            console.log(sms)
                                        }}
                                    />
                                    <small className="text-primary">{sms ? sms.message : 'Ingrese el diagnóstico'}</small>
                                    <br />
                                    {/* resolución de incidentes*/}
                                    <b> <label htmlFor='incident_resolution' className="control-label">Incidente de resolución *</label></b>
                                    <input
                                        className="form-control"
                                        id='incident_resolution'
                                        type="text"
                                        placeholder='Incidente de resolución'
                                        name='incident_resolution'
                                        value={incident_resolution}
                                        required
                                        onChange={(e) => {
                                            setIncident_resolution(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms1(validateText(e.target.value))

                                            } else {
                                                setSms1(null)
                                            }
                                            console.log(sms1)
                                        }}
                                    />
                                    <small className="text-primary">{sms1 ? sms1.message : 'Ingrese el incidente '}</small>
                                    <br />
                                    {/* Garantía */}
                                    <b>  <label htmlFor='warranty' className="control-label">Garantía*</label></b>
                                    <input
                                        className="form-control"
                                        id='warranty'
                                        type="text"
                                        placeholder='Garantía '
                                        name='warranty'
                                        value={warranty}
                                        onChange={(e) => {
                                            setWarranty(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms2(validateWarranty(e.target.value))

                                            } else {
                                                setSms2(null)
                                            }
                                            console.log(sms2)
                                        }}
                                        required
                                    />
                                    <small className="text-primary">{sms2 ? sms2.message : 'Ingrese la garantía'}</small>
                                    <br />
                                    {/*  Partes de cambio */}
                                    <b> <label htmlFor='spare_parts' className="control-label">Partes de cambio*</label></b>
                                    <textarea
                                        className="form-control"
                                        id='spare_parts'
                                        type="text"
                                        placeholder='Partes de cambio'
                                        name='spare_parts'
                                        value={spare_parts}
                                        required
                                        onChange={(e) => {
                                            setSpare_parts(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms3(validateText(e.target.value))

                                            } else {
                                                setSms3(null)
                                            }
                                            console.log(sms3)
                                        }}
                                    />
                                    <small className="text-primary">{sms3 ? sms3.message : 'Ingrese las partes de cambio'}</small>
                                    <br />
                                    {/*  Precio Partes de cambio */}
                                    <b> <label htmlFor='price_spare_parts' className="control-label">Precio de las partes de cambio*</label></b>
                                    <input
                                        className="form-control"
                                        id='price_spare_parts'
                                        type="number"
                                        placeholder='Partes de cambio'
                                        name='price_spare_parts'
                                        value={price_spare_parts}
                                        onChange={(e) => {
                                            setPrice_spare_parts(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms4(validatePrice(e.target.value))

                                            } else {
                                                setSms4(null)
                                            }
                                            console.log(sms4)
                                        }}
                                        required

                                    />
                                    <small className="text-primary">{sms4 ? sms4.message : 'Ingrese las partes de cambio'}</small>
                                    <br />
                                    {/*  Precio final */}
                                    <b> <label htmlFor='final_price' className="control-label">Precio final*</label></b>
                                    <input
                                        className="form-control"
                                        id='final_price'
                                        type="number"
                                        placeholder='Precio final'
                                        name='final_price'
                                        value={final_price}
                                        required
                                        onChange={(e) => {
                                            setFinal_price(e.target.value)
                                            if (e.target.value.length > 0) {
                                                setSms5(validatePrice(e.target.value))

                                            } else {
                                                setSms5(null)
                                            }
                                            console.log(sms5)
                                        }}
                                    />
                                    <small className="text-primary">{sms5 ? sms5.message : 'Ingrese el precio final'}</small>
                                </div>

                            </div>

                        </div>
                        <br />
                        <p className="text-center">
                            <button value={servicesaprob?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn btn-info btn-raised btn-sm"><i className="zmdi zmdi-floppy"></i> GUARDAR</button>
                        </p>
                    </fieldset>
                    <br />

                </form>
            </div>


        </>

    )
}
