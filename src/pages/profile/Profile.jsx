import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label} from '../../components'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../contexts';
import { GrUpdate } from "react-icons/gr";
import { BsSave2Fill } from "react-icons/bs";
import Swal from 'sweetalert2'
import { validateFirst, validateNames, validatePhoneNumber, validatePhoneNumberConvencional, validateDNI, validateDate, validatAdress, validateEmail, validatePassword } from '../../Validations';
import { TecnonyContext } from '../app/Context/TecnonyContext';


export const Profile = () => {

	const navigate = useNavigate();
	const [profile, setProfile] = useState({});
	const { cargarInfor, userinfo } = useContext(TecnonyContext);

	const [image, setImage] = useState(null);
	const token = localStorage.getItem('token');
	const { user } = useContext(AuthContext);
	const [error, setError] = useState(false);
	const [alerta, setAlerta] = useState('');

	const [password, setPassword] = useState({});
	const [password_confirmation, setConfirPassword] = useState({});

	const [sms, setSms] = useState(null)
	const [sms1, setSms1] = useState(null)
	const [sms2, setSms2] = useState(null)
	const [sms3, setSms3] = useState(null)
	const [sms4, setSms4] = useState(null)
	const [sms5, setSms5] = useState(null)
	const [sms6, setSms6] = useState(null)
	const [sms7, setSms7] = useState(null)
	const [sms8, setSms8] = useState(null)

	const getProfile = async () => {
		try {
			const response = await axios.get(
				'https://tecnony-v1.herokuapp.com/api/v1/profile',

				{ headers: { 'accept': 'application/json', 'authorization': token } }
			);

			setProfile(response.data.data.user)
			

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getProfile();
	}, [])


	const updateProfile = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`https://tecnony-v1.herokuapp.com/api/v1/profile`,
				{ ...profile }, { headers: { 'accept': 'application/json', 'authorization': token } }
			);
			
			cargarInfor({ ...profile, full_name: profile.first_name + "  " + profile.last_name, role: userinfo.role })

			setAlerta(response.data.message)

			Swal.fire({
				position: 'center',
				icon: 'success',
				title: response.data.message,
				showConfirmButton: false,
				timer: 1500,
				background: 'transparent',
			})

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

	/* Actualizar imagen */
	const updateImagen = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("image", image);
		try {
			console.log(image);
			const response = await axios.post(
				`https://tecnony-v1.herokuapp.com/api/v1/profile/avatar`,
				data,
				{ headers: { 'authorization': token } }
			);
			const responseimage = await axios.get(
				'https://tecnony-v1.herokuapp.com/api/v1/profile',

				{ headers: { 'accept': 'application/json', 'authorization': token } }
			);
			cargarInfor({ ...userinfo,avatar:responseimage.data.data.user.avatar })
			setProfile(responseimage.data.data.user)
			
		
			setAlerta(response.data.message)

			Swal.fire({
				position: 'center',
				icon: 'success',
				title: "Avatar actualizado",
				showConfirmButton: false,
				timer: 1500,
				background: 'transparent',

			})

		} catch (error) {

			console.log(error.response.data.message, 'error');

			Swal.fire({
				position: 'center',
				icon: 'warning',
				title: 'No has selecionado una imágen',
				showConfirmButton: false,
				timer: 1500,
				background: 'transparent',
			})
		}
	}

	/* Actualizar contraseña */

	const updatePassword = async (e) => {
		e.preventDefault();
		try {

			const response = await axios.post(
				`https://tecnony-v1.herokuapp.com/api/v1/update-password`,
				{ password, password_confirmation }, { headers: { 'accept': 'application/json', 'authorization': token } }

			);

			setAlerta(response.data.message)

			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: response.data.message,
				showConfirmButton: false,
				timer: 1500,
				background: 'transparent',
			})

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

	/* handleChange de profile*/

	const handleChange = (e) => {
		setProfile({
			...profile,
			[e.target.name]: e.target.value
		});
	}

	return (
		<>
			<div className="container-fluid ">
				<div className="page-header">

				</div>
				<div className="panel panel-success ">

					<div className="panel-body">
						<form onSubmit={updateProfile}
						>							<fieldset>
								<p className="lead">
									Este módulo te permite actualizar los datos de tu perfil.
								</p>
								<hr />
								<div className="container-fluid">
									<div className="row">
										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">

												<h3>Datos Personales</h3>
												<br />
												<b><Label description="Nombre de Usuario" htmlFor='username' /></b>
												<input
													className='form-control'
													id='username'
													name='username'
													type='username'
													value={profile.username}
													required
													onChange={(e) => {

														setProfile({ ...profile, ...{ username: e.target.value } })
														if (e.target.value.length > 0) {
															setSms(validateFirst(e.target.value))
														} else {
															setSms(null)
														}
														console.log(sms)
													}}

												/>

												<small className="text-primary">{sms ? sms.message : 'Ingrese el nombre de usuario'}</small>

												<br />

												{/* CEDULA */}
												<b><Label description="DNI/Cédula" htmlFor='cedula' /></b>
												<input
													className='form-control'
													id='cedula'
													name='cedula'
													type='number'
													value={profile.cedula}
													required
													disabled
													onChange={handleChange}
												/>

												{/* NOMBRE */}
												<b>	<Label description="Nombre" htmlFor='first_name ' /></b>
												<input
													className='form-control'
													id='first_name'
													name='first_name'
													type='first_name'
													value={profile.first_name}
													required
													onChange={(e) => {
														setProfile({ ...profile, ...{ first_name: e.target.value } })
														if (e.target.value.length > 0) {
															setSms1(validateNames(e.target.value))

														} else {
															setSms1(null)
														}
														console.log(sms1)
													}}
												/>
												<small className="text-primary">{sms1 ? sms1.message : 'Ingrese el nombre'}</small>
												<br />
												{/* APELLIDO */}
												<b><Label description="Apellido" htmlFor='last_name' /></b>
												<input
													className='form-control'
													id='last_name'
													name='last_name'
													type='last_name'
													value={profile.last_name}
													required
													onChange={(e) => {
														setProfile({ ...profile, ...{ last_name: e.target.value } })
														if (e.target.value.length > 0) {
															setSms2(validateNames(e.target.value))
														} else {
															setSms2(null)
														}
														console.log(sms2)
													}}
												/>
												<small className="text-primary">{sms2 ? sms2.message : 'Ingrese el apellido'}</small>
												<br />
												{/* NUMERO DE CELULAR */}
												<b> <Label description="Número celular" htmlFor='personal_phone' /> </b>
												<input
													className='form-control'
													id='personal_phone'
													name='personal_phone'
													type='personal_phone'
													value={profile.personal_phone}
													required
													onChange={(e) => {
														setProfile({ ...profile, ...{ personal_phone: e.target.value } })
														if (e.target.value.length > 0) {
															setSms3(validatePhoneNumber(e.target.value))
														} else {
															setSms3(null)
														}
														console.log(sms3)
													}}
												/>
												<small className="text-primary">{sms3 ? sms3.message : 'Ingrese nùmero de celular'}</small>
												<br />
												{/* TELEFONO CONVENCIONAL */}
												<b><Label description="Teléfono convencional" htmlFor='home_phone' /></b>
												<input
													className='form-control'
													id='home_phone'
													name='home_phone'
													type='home_phone'
													value={profile.home_phone}
													pattern="[0-9+]{1,15}"
													required
													onChange={(e) => {
														setProfile({ ...profile, ...{ home_phone: e.target.value } })
														if (e.target.value.length > 0) {
															setSms4(validatePhoneNumberConvencional(e.target.value))
														} else {
															setSms4(null)
														}
														console.log(sms4)
													}}
												/>
												<small className="text-primary">{sms4 ? sms4.message : 'Ingrese el telèfono convencional'}</small>
												<br />
												{/* FECHA DE CUMPLEAÑOS */}
												<b><Label description="Fecha de nacimiento " htmlFor='birthdate' /></b>
												<input

													id='birthdate'
													name='birthdate'
													type="date"
													value={profile.birthdate}
													required pattern="\d{4}-\d{2}-\d{2}"
													disabled
													onChange={handleChange}

												/>
												<br />
												{/* CORREO ELECTRONICO */}
												<br />
												<b>	<Label description="Correo Electrónico" htmlFor='email' /></b>
												<input
													className='form-control'
													id='email'
													name='email'
													type='email'
													value={profile.email}
													maxLength="35"
													required
													autoFocus
													onChange={(e) => {
														setProfile({ ...profile, ...{ email: e.target.value } })
														if (e.target.value.length > 0) {
															setSms5(validateEmail(e.target.value))
														} else {
															setSms5(null)
														}
														console.log(sms5)
													}}
												/>

												<small className="text-primary">{sms5 ? sms5.message : 'Ingrese el correo electrònico'}</small>
												<br />
												{/* DIRECCION */}
												<b><Label description="Direcciòn" htmlFor='address' /></b>

												<input
													className="form-control"
													name='address'
													type='address'
													value={profile.address}
													maxLength="100"
													autoFocus
													required
													onChange={(e) => {
														setProfile({ ...profile, ...{ address: e.target.value } })
														if (e.target.value.length > 0) {
															setSms6(validatAdress(e.target.value))
														} else {
															setSms6(null)
														}
														console.log(sms6)
													}}
												/>
												<small className="text-primary">{sms6 ? sms6.message : 'Ingrese la direcciòn'}</small>
												<br />

												<center>
													<button type="submit" class="btn btn-success" onClick={updateProfile}><i className="">
														<i><GrUpdate /></i>
													</i> Actualizar
													</button>
												</center>
												<br />


											</div>
										</div>

										{/* ACTUALIZAR IMAGEN */}

										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">

												<h3>Avatar</h3>
												<form >
													<center>
														<img src={profile.avatar} width='250' height='250' class="rounded-circle" />
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

													<center>
														<button type="submit" class="btn btn-success" onClick={updateImagen}><i className="">
															<i><BsSave2Fill /></i>
														</i> Guardar
														</button>
													</center>
												</form>

											</div>
										</div>
										{/* FIN DE ACTUALIZAR IMAGEN */}
										<hr />
										<div className="col-xs-12 col-sm-6">
											<h3>Actualizar contraseña</h3>
											<div className="form-group label-floating">

												<b>	<Label description="Nueva contraseña" htmlFor='password' /></b>
												<input
													className='form-control'
													id='password'
													name='password'
													type='password'
													maxLength="35"
													required
													autoFocus
													onChange={(e) => {
														setProfile({ ...profile, ...{ password: e.target.value } })
														if (e.target.value.length > 0) {
															setSms7(validatePassword(e.target.value))
														} else {
															setSms7(null)
														}
														console.log(sms7)
													}}
												/>
												<small className="text-primary">{sms7 ? sms7.message : 'Ingrese la contraseña'}</small>
											</div>
										</div>

										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">
												<div className="col-xs-12 col-sm-6"></div>
												<div className="form-group">
													<br />
													<br />

													<b>	<Label description="Confirmar contraseña" htmlFor='password_confirmation' /></b>

													<input
														className='form-control'
														id='password'
														name='password_confirmation'
														type='password'
														maxLength="35"
														required
														autoFocus
														onChange={(e) => {
															setProfile({ ...profile, ...{ password: e.target.value } })
															if (e.target.value.length > 0) {
																setSms8(validatePassword(e.target.value))
															} else {
																setSms8(null)
															}
															console.log(sms8)
														}}
													/>
													<small className="text-primary">{sms8 ? sms8.message : 'Ingrese la contraseña'}</small>
												</div>
												<br />

											</div>
										</div>
										<br />
										<center>
											<button type="submit" class="btn btn-success" onClick={updatePassword}><i className="">
												<i><GrUpdate /></i>
											</i> Actualizar
											</button>
										</center>

									</div>
									<br />


								</div>

							</fieldset>


						</form>

					</div>
				</div>
			</div >
		</>
	);
}
