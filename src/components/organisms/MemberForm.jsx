import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Checkbox } from 'antd';
import { Drop } from '../../pages/app/Drop';
import { validatAdress, validateAtt_Local, validateLocalName, validatePhoneNumber, validateProf_Espec,validateAcount } from '../../Validations';
import Swal from 'sweetalert2'

export const MemberForm = ({ member }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [alerta, setAlerta] = useState('');

    const [profession, setProfession] = useState(member?.profession);
    const [specialization, setSpecialization] = useState(member?.specialization);
    const [work_phone, setWork_phone] = useState(member?.work_phone);
    const [attention_schedule, setAttention_schedule] = useState(member?.attention_schedule);
    const [local_name, setLocal_name] = useState(member?.local_name);
    const [local_address, setLocal_address] = useState(member?.local_address);
    const [confirmation, setConfirmation] = useState(false);
    const [account_number, setAccount_number] = useState(member?.account_number);
    const [account_type, setAccount_type] = useState(member?.account_type);
    const [banking_entity, setBanking_entity] = useState(member?.banking_entity);
    const [documento, setDocumento] = useState(null);

    const [type, setType] = useState('Selecione el tipo de cuenta');
    const [banco, setBanco] = useState('Selecione el banco');

    const token = localStorage.getItem('token');
    

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setConfirmation(e.target.checked)
    };

    const [sms, setSms] = useState(null)
    const [sms1, setSms1] = useState(null)
    const [sms2, setSms2] = useState(null)
    const [sms3, setSms3] = useState(null)
    const [sms4, setSms4] = useState(null)
    const [sms5, setSms5] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("profession", profession);
        data.append("specialization", specialization);
        data.append("work_phone", work_phone);
        data.append("attention_schedule", attention_schedule);
        data.append("local_name", local_name);
        data.append("local_address", local_address);
        data.append("confirmation", confirmation
            ? 1 : 0
        );

        data.append("account_number", account_number);
        data.append("account_type", account_type);
        data.append("banking_entity", banking_entity);
        data.append("documento", documento);


        try {
            console.log(member)

            if (member?.id) {

                const response = await axios.post(
                    `https://tecnony-v1.herokuapp.com/api/v1/affiliation/update`,
                    data, { headers: { "Content-Type": "multipart/form-data", 'authorization': token } }
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
                    `https://tecnony-v1.herokuapp.com/api/v1/affiliation/create`,
                    data, { headers: { "Content-Type": "multipart/form-data", 'authorization': token } }
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
            navigate('/member');


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
        }
    }


    const onClick = ({ key }) => {

        let itemType = items.filter(item => item.key == key)
        setType(itemType[0].label)
        setAccount_type(itemType[0].label)
    };
    const items = [
        {
            label: 'Ahorros',
            key: '1',
        },
        {
            label: 'Corriente',
            key: '2',
        },
    ];

    const onClickB = ({ key }) => {

        let itemBanco = itemss.filter(item => item.key == key)
        setBanco(itemBanco[0].label)
        setBanking_entity(itemBanco[0].label)
    };

    const itemss = [
        {
            label: 'Banco de Guayaquil',
            key: '1',
        },
        {
            label: 'Banco Pichincha',
            key: '2',
        },
        {
            label: 'Banco del Pacífico',
            key: '3',
        },
        {
            label: 'Banco Amazonas',
            key: '4',
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
                                    <div className="form-group label-floating">
                                        <b><label htmlFor='first_name' className="control-label">Profesión*</label></b>
                                        <input
                                            className="form-control"
                                            id='profession'
                                            type="text"
                                            placeholder='Profesión'
                                            name='profession'
                                            value={profession}
                                            required 
                                            onChange={(e) => {
                                                setProfession(e.target.value)
                                                if (e.target.value.length > 0) {
                                                    setSms(validateProf_Espec(e.target.value))

                                                } else {
                                                    setSms(null)
                                                }
                                                console.log(sms)
                                            }}
                                            
                                            />
                                            <small className="text-primary">{sms ? sms.message : 'Ingrese la profesión'}</small>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <b><label htmlFor='specialization' className="control-label">Especialización*</label></b>
                                        <input
                                            id='specialization'
                                            type="text"
                                            className="form-control"
                                            placeholder='Especialización'
                                            name='specialization'
                                            value={specialization}
                                            required
                                            onChange={(e) => {
                                                setSpecialization(e.target.value)
                                                if (e.target.value.length > 0) {
                                                    setSms1(validateProf_Espec(e.target.value))

                                                } else {
                                                    setSms1(null)
                                                }
                                                console.log(sms1)
                                            }}
                                        />
                                        <small className="text-primary">{sms1 ? sms1.message : 'Ingrese la especialización'}</small>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <b><label htmlFor='work_phone' className="control-label">Teléfono celular*</label></b>
                                        <input
                                            className="form-control"
                                            id='work_phone'
                                            type="work_phone"
                                            name='work_phone'
                                            placeholder='Teléfono celular'
                                            value={work_phone}
                                            onChange={(e) => {
                                                setWork_phone(e.target.value)
                                                if (e.target.value.length > 0) {
                                                    setSms2(validatePhoneNumber(e.target.value))

                                                } else {
                                                    setSms2(null)
                                                }
                                                console.log(sms2)
                                            }}
                                          
                                            required
                                        />
                                        <small className="text-primary">{sms2 ? sms2.message : 'Ingrese télefono celular'}</small>
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <b> <label htmlFor='local_name' className="control-label">Nombre del local*</label></b>
                                        <input
                                            className="form-control"
                                            placeholder='Nombre del local'
                                            type="text"
                                            name='local_name'
                                            value={local_name}
                                            required
                                            onChange={(e) => {
                                                setLocal_name(e.target.value)
                                                if (e.target.value.length > 0) {
                                                    setSms3(validateLocalName(e.target.value))

                                                } else {
                                                    setSms3(null)
                                                }
                                                console.log(sms3)
                                            }}
                                        ></input>
                                        <small className="text-primary">{sms3 ? sms3.message : 'Ingrese el nombre del local'}</small>
                                    </div>
                                </div>

                                <div className="col-xs-12">
                                    <div className="form-group label-floating">
                                        <b><label htmlFor='attention_schedule' className="control-label">Horario de atención*</label></b>
                                        <textarea
                                            className="form-control"
                                            id='attention_schedule'
                                            type="text"
                                            name='attention_schedule'
                                            placeholder='Horario de atención'
                                            value={attention_schedule}
                                            required
                                            onChange={(e) => {
                                                setAttention_schedule(e.target.value)
                                                if (e.target.value.length > 0) {
                                                    setSms4(validateAtt_Local(e.target.value))

                                                } else {
                                                    setSms4(null)
                                                }
                                                console.log(sms4)
                                            }}
                                        />
                                         <small className="text-primary">{sms4 ? sms4.message : 'Ingrese el horario de atención'}</small>
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <div className="form-group label-floating">
                                        <b>  <label htmlFor='local_address' className="control-label">Dirección*</label></b>
                                        <textarea
                                            className="form-control"
                                            placeholder='Dirección'
                                            type="text"
                                            name='local_address'
                                            value={local_address}
                                            required
                                            onChange={(e) => {
                                                setLocal_address(e.target.value)
                                                if (e.target.value.length > 0) {
                                                    setSms4(validatAdress(e.target.value))

                                                } else {
                                                    setSms4(null)
                                                }
                                                console.log(sms4)
                                            }}
                                        ></textarea>
                                        <small className="text-primary">{sms4 ? sms4.message : 'Ingrese la dirección'}</small>
                                    </div>
                                    <br />
                                </div>

                                <div className="col-xs-12 col-sm-4">
                                    <div className="form-group label-floating">
                                        <b> <label htmlFor='attention_mode' className="control-label">Entidad bancaria*</label></b>
                                        <br />
                                        < Drop items={itemss} onClick={onClickB} title={banco} />
                                    </div>
                                    <br />
                                </div>

                                <div className="col-xs-12 col-sm-4">
                                    <div className="form-group label-floating">
                                        <b> <label htmlFor='attention_mode' className="control-label">Tipo de cuenta*</label></b>
                                        <br />
                                        < Drop items={items} onClick={onClick} title={type} />
                                    </div>
                                    <br />
                                </div>

                                <div className="col-xs-12 col-sm-4">
                                    <div className="form-group label-floating">
                                        <b>  <label htmlFor='account_number' className="control-label">Número de cuenta*</label></b>
                                        <input
                                            className="form-control"
                                            placeholder='Número de cuenta'
                                            type="account_number"
                                            name='account_number'
                                            value={account_number}
                                            
                                            required
                                            onChange={(e) => {
                                                setAccount_number(e.target.value)
                                                if (e.target.value.length > 0) {
                                                    setSms5(validateAcount(e.target.value))

                                                } else {
                                                    setSms5(null)
                                                }
                                                console.log(sms5)
                                            }}
                                        ></input>
                                        <small className="text-primary">{sms5 ? sms5.message : 'Ingrese el número de cuenta'}</small>
                                    </div>
                                    <br />
                                </div>
                                <hr />

                                <div className="col-xs-12 ">
                                    <div className="form-group label-floating">
                                        <b>  <label htmlFor='documento' className="control-label">Documento*</label></b>
                                        <br />
                                        <small>Sube aqui un documento con todos papeles en orden para obtener tu afiliación</small>
                                        <br />
                                        <input
                                            id='documento'
                                            type="file"
                                            name="documento"
                                            placeholder
                                            className='form-control'
                                            accept=".pdf,.doc"
                                            onChange={(e) => setDocumento(e.target.files[0])}
                                        />
                                    </div>
                                    <br />
                                    <Checkbox onChange={onChange}>Acepta los términos y condiciones</Checkbox>

                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <br />

                    <p className="text-center">
                        <button value={member?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn btn-info btn-raised btn-sm"><i className="zmdi zmdi-floppy"></i> ENVIAR
                            {/* Mensaje de alerta */}
                            <div class="alert-success"  >
                                {alerta}
                            </div>
                        </button>
                    </p>
                </form>
            </div>
        </>
    )
}
