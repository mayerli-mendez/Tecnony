import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts';
import axios from 'axios';
import teamHero from '../../img/hero-img.png';

import C3 from '../../img/clients/client-3.png';
import C4 from '../../img/clients/client-4.png';

import P1 from '../../img/portfolio/portfolio-1.jpg';
import P2 from '../../img/portfolio/portfolio-2.png';
import P3 from '../../img/portfolio/portfolio-3.jpg';
import P4 from '../../img/portfolio/portfolio-4.jpg';
import P5 from '../../img/portfolio/portfolio-5.jpg';
import P6 from '../../img/portfolio/portfolio-6.jpg';

import T1 from '../../img/team/team-1.jpg';
import T2 from '../../img/team/team-2.jpg';
import T3 from '../../img/team/team-3.jpg';

import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiCheck, FiRefreshCcw } from 'react-icons/fi';
import { RiComputerLine, RiMacbookLine } from "react-icons/ri"
import { BsCloudArrowDown } from "react-icons/bs"
import { HiOutlineCog6Tooth } from "react-icons/hi2"
import Swal from 'sweetalert2'
import { BsSave2Fill } from "react-icons/bs";
import { TecnonyContext } from "./Context/TecnonyContext";

function sub() {

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Mensaje enviado con éxito',
        showConfirmButton: false,
        timer: 1500,
    })

}



export const LandingPage = () => {
    const navigate = useNavigate();
    const { reloadWindow } = useContext(TecnonyContext)
    return (
        <>
            {/*  <!-- ======= Header ======= --> */}
            <header id="header" class="fixed-top header-scrolled ">
                <div class="container d-flex align-items-center">

                    <h1 class="logo me-auto"><a href="index.html">Tecnony</a></h1>
                    {/*  <!-- Uncomment below if you prefer to use an image logo --> */}

                    <nav id="navbar" class="navbar">
                        <ul>
                            <li><a class="nav-link scrollto active" href="#hero">Inicio</a></li>
                            <li><a class="nav-link scrollto" href="#about">Nosotros</a></li>
                            <li><a class="nav-link scrollto" href="#services">Servicios</a></li>
                            <li><a class="nav-link   scrollto" href="#portfolio">Portafolio</a></li>
                            <li><a class="nav-link scrollto" href="#team">Equipo</a></li>
                            <li><a class="nav-link scrollto" href="#contact">Contacto</a></li>
                            <li><a class="getstarted scrollto" onClick={() => { navigate('/landing/login') }}>Empecemos</a></li>
                        </ul>
                        <i class="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                </div>
            </header>

            {/* <!-- ======= Hero Section ======= --> */}
            <div id="hero" class="d-flex align-items-center">

                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
                            <h1>La mejor solución para tus dispositivos</h1>
                            <h2>Somos un equipo de técnicos que brindamos asistencia técnica especializadas en informática</h2>
                            <div class="d-flex justify-content-center justify-content-lg-start">
                                <a class="btn-get-started scrollto" onClick={() => {
                                     navigate("/landing/login")
                                //    reloadWindow(false)
                                }}>Empecemos</a>
                            </div>
                        </div>
                        <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
                            <img src={teamHero} class="img-fluid animated" alt="" />
                        </div>
                    </div>
                </div>

            </div>

            <main id="main">

                {/* <!-- ======= Clients Section ======= --> */}
                <section id="clients" class="clients section-bg">
                    <div class="container">

                        <div class="row" data-aos="zoom-in">

                            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">

                            </div>

                            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">

                            </div>

                            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                                <img src={C3} class="img-fluid" alt="" />
                            </div>

                            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                                <img src={C4} class="img-fluid" alt="" />
                            </div>

                            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">

                            </div>

                            <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">

                            </div>

                        </div>

                    </div>
                </section>{/* <!-- End Cliens Section --> */}

                {/* <!-- ======= About Us Section ======= --> */}
                <section id="about" class="about">
                    <div class="container" data-aos="fade-up">

                        <div class="section-title">
                            <h2>NOSOTROS</h2>
                        </div>

                        <div class="row content">
                            <div class="col-lg-6">
                                <p>
                                    Tecnony es una app que mediante el uso de tecnología te une con miles de técnicos, hace la contratación de servicio más eficiente para que tengas una buena experiencia.
                                </p>

                            </div>
                            <div class="col-lg-6 pt-4 pt-lg-0">
                                <h3>
                                    Beneficios
                                </h3>
                                <ul>
                                    <li><i class="ri-check-double-line"></i><FiCheck />Te conectamos con miles de técnicos para brindar un buen servicio</li>
                                    <li><i class="ri-check-double-line"></i><FiCheck />Hacemos más eficiente y rentable la asistencia técnica</li>
                                    <li><i class="ri-check-double-line"></i><FiCheck />Tienes la información completa de tus servicios contratados</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>{/* <!-- End About Us Section --> */}

                {/* <!-- ======= Services Section ======= --> */}
                <section id="services" class="services section-bg">
                    <div class="container" data-aos="fade-up">

                        <div class="section-title">
                            <h2>Servicios</h2>
                            <p>Escoge entre cientos de servicios para tus dispositivos tecnológicos todos al
                                alcance de tu mano.</p>

                        </div>

                        <div class="row">
                            <div class="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                                <div class="icon-box">
                                    <div class="icon"><i> <RiComputerLine />  </i></div>
                                    <h4><a href="">Mantenimiento de computadoras </a></h4>
                                    <p>Nos encargamos de la inspección de anomalías, limpieza y sustitución de piezas,
                                        materiales con el fin de evitar
                                        fallos en el equipo de cómputo y garantizar que se
                                        encuentran funcionando.</p>
                                </div>
                            </div>

                            <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
                                <div class="icon-box">
                                    <div class="icon"><i> <BsCloudArrowDown /></i></div>
                                    <h4><a href="">Instalación de programas </a></h4>
                                    <p>Se realiza la instalación de Windows,Linux etc y actualizacion de las instalaciones existentes.
                                    </p>
                                </div>
                            </div>

                            <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
                                <div class="icon-box">
                                    <div class="icon"><i> <RiMacbookLine /> </i></div>
                                    <h4><a href="">Mantenimiento de laptops </a></h4>
                                    <p>Nos encargamos de la inspección de anomalías, limpieza y sustitución de piezas,
                                        materiales con el fin de evitar
                                        fallos en el equipo de cómputo y garantizar que se
                                        encuentran funcionando.</p>
                                </div>
                            </div>

                            <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="400">
                                <div class="icon-box">
                                    <div class="icon"><i><HiOutlineCog6Tooth /></i></div>
                                    <h4><a href="">Manteniemto preventivo </a></h4>
                                    <p>Cuidamos de tu equipo de manera periódica para tener un alto rendimiento.</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                {/*   <!-- ======= Portfolio Section ======= --> */}
                <section id="portfolio" class="portfolio">
                    <div class="container" data-aos="fade-up">

                        <div class="section-title">
                            <h2>Portfolio</h2>
                            <p>
                                No enfocamos en ofrecer un servicio técnico de calidad y en implementar redes que conecten
                                tu trabajo de forma óptima, funcional y eficaz.
                            </p>
                        </div>

                        <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">

                            <div class="col-lg-4 col-md-6 portfolio-item filter-app">
                                <div class="portfolio-img"><img src={P1} class="img-fluid" alt="" /></div>
                                <div class="portfolio-info">
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-web">
                                <div class="portfolio-img"><img src={P2} class="img-fluid" alt="" /></div>
                                <div class="portfolio-info">

                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-app">
                                <div class="portfolio-img"><img src={P3} class="img-fluid" alt="" /></div>
                                <div class="portfolio-info">

                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-card">
                                <div class="portfolio-img"><img src={P4} class="img-fluid" alt="" /></div>
                                <div class="portfolio-info">

                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-web">
                                <div class="portfolio-img"><img src={P5} class="img-fluid" alt="" /></div>
                                <div class="portfolio-info">

                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-app">
                                <div class="portfolio-img"><img src={P6} class="img-fluid" alt="" /></div>
                                <div class="portfolio-info">

                                </div>
                            </div>
                        </div>
                    </div>
                </section>{/* <!-- End Portfolio Section --> */}

                {/* <!-- ======= Team Section ======= --> */}
                <section id="team" class="team section-bg">
                    <div class="container" data-aos="fade-up">

                        <div class="section-title">
                            <h2>Equipo</h2>
                            <p>Cada persona de nuestro equipo representa nuestro compromiso e innovación. </p>
                        </div>

                        <div class="row">

                            <div class="col-lg-6">
                                <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="100">
                                    <div class="pic"><img src={T1} class="img-fluid" alt="" /></div>
                                    <div class="member-info">
                                        <h4>Manuel Auqui </h4>
                                        <span>Tecnólogo en desarrollo de software</span>
                                        <p>Desarrollo del Backend </p>
                                        <div class="social">
                                            <a href="https://github.com/ManuEly19"><FiGithub /></a>
                                            <a href="https://www.linkedin.com/in/manuely19/"><FiLinkedin /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 mt-4 mt-lg-0">
                                <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="200">
                                    <div class="pic"><img src={T2} class="img-fluid" alt="" /></div>
                                    <div class="member-info">
                                        <h4>Mayerli Mendez</h4>
                                        <span>Tecnóloga en desarrollo de software</span>
                                        <p>Desarrollo del Frontend</p>
                                        <div class="social">
                                            <a href="https://github.com/mayerli-mendez"><FiGithub /></a>
                                            <a href="https://www.linkedin.com/in/mayerli-mendez/"><FiLinkedin /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 mt-4">
                                <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="300">
                                    <div class="pic"><img src={T3} class="img-fluid" alt="" /></div>
                                    <div class="member-info">
                                        <h4>Jhoana Aucancela</h4>
                                        <span>Tecnóloga en desarrollo de software</span>
                                        <p>Desarrollo de aplicacion movil</p>
                                        <div class="social">
                                            <a href=""><FiGithub /></a>
                                            <a href=""><FiLinkedin /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>{/* <!-- End Team Section --> */}

                {/*  <!-- ======= Contact Section ======= --> */}
                <section id="contact" class="contact">
                    <div class="container" data-aos="fade-up">

                        <div class="section-title">
                            <h2>Contáctanos</h2>
                            <p>Solicita tu asesoría personalizada y soluciona tus problemas
                                tecnológicos al instante. Con Innovación Digital la calidad y actualidad están a un clic de distancia. </p>
                        </div>

                        <div class="row">

                            <div class="col-lg-5 d-flex align-items-stretch">
                                <div class="info">
                                    <div class="address">
                                        <i><FiMapPin /></i>
                                        <h4>Dirección:</h4>
                                        <p>Quito-Ecuador</p>
                                    </div>

                                    <div class="email">
                                        <i > <FiMail /> </i>
                                        <h4>Correo Electrónico:</h4>
                                        <p>tecnony17@gmail.com</p>
                                    </div>

                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255347.0183985496!2d-78.57062504323954!3d-0.1865937922820245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sQuito!5e0!3m2!1ses-419!2sec!4v1668396491451!5m2!1ses-419!2sec" frameBorder="10" /*  style="border:0; width: 100%; height: 290px;" */ allowFullScreen></iframe>
                                </div>

                            </div>

                            <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                                <form action="https://formsubmit.co/tecnony17@gmail.com" method="POST" >
                                    <div class="row">
                                        <div class="form-group col-md-6">
                                            <label for="name">Nombre Completo</label>
                                            <input
                                                type="text"
                                                name="Nombre"
                                                class="form-control"
                                                id="name"
                                                required />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="name">Correo Electrónico</label>
                                            <input
                                                type="email"
                                                class="form-control"
                                                name="Correo Electrónico"
                                                id="email"
                                                required />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">Tema</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="Tema"
                                            id="subject"
                                            required />
                                    </div>
                                    <div class="form-group">
                                        <label for="name">Mensaje</label>
                                        <textarea
                                            class="form-control"
                                            name="Mensaje"
                                            rows="10"
                                            required>

                                        </textarea>
                                    </div>
                                    <br />

                                    <center>
                                        <button type="submit" class="btn" ><i className="">
                                            <i><BsSave2Fill /></i>
                                        </i> Enviar
                                        </button>
                                    </center>


                                    <input type="hidden" name="_next" value="http://localhost:3000/login/a" />
                                    <input type="hidden" name="_captcha" value="false" />
                                </form>
                            </div>

                        </div>

                    </div>
                </section>{/* <!-- End Contact Section --> */}

            </main>{/* <!-- End #main --> */}

            {/* <!-- ======= Footer ======= --> */}
            <div id="footer">
                <div class="container footer-bottom clearfix">
                    <div class="copyright">
                        &copy; Copyright <strong><span>Tecnony</span></strong>.Todos los derechos reservados
                    </div>
                    <div class="credits">
                        Desarrollado por <a href="https://www.linkedin.com/in/mayerli-mendez">Mayerli Mendez</a>
                    </div>
                </div>
            </div>{/* <!-- End Footer --> */}


            <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

        </>);
}