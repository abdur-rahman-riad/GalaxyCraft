import React from 'react';
import { Container } from 'react-bootstrap';
import logo from '../../../images/logo.png';

const Footer = () => {
    return (
        <div className="bg-light pt-5 pb-2 mt-5">
            <Container>
                <div className="row gy-5 align-items-center">
                    <div className="col-md-4 text-center">
                        <img src={logo} width="180px" height="90px" alt="" />
                    </div>

                    <div className="col-md-4 text-center">
                        <h5>Important Link</h5>
                        <li style={{ listStyle: "none" }}>Home</li>
                        <li style={{ listStyle: "none" }}>About Us</li>
                        <li style={{ listStyle: "none" }}>FAQ</li>
                        <li style={{ listStyle: "none" }}>Contact</li>
                    </div>

                    <div className="col-md-4 text-center">
                        <h5>Social Media</h5>
                        <li style={{ listStyle: "none" }}>Facebook</li>
                        <li style={{ listStyle: "none" }}>Instagram</li>
                        <li style={{ listStyle: "none" }}>Twitter</li>
                        <li style={{ listStyle: "none" }}>YouTube</li>
                    </div>
                </div>
                <hr />
                <p className="text-center text-secondary pb-2">CopyRight &copy; 2021 All Right Reserved GalaxyCraft</p>
            </Container>
        </div>
    );
};

export default Footer;