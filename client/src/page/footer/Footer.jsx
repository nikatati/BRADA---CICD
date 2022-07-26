import React from "react"
import { Nav } from "react-bootstrap"

function Footer() {
    return (
        <div className="main-footer" style={{ backgroundColor: "#694F5D" }}>
            <div className="container rounded" style={{ backgroundColor: "#BFD3C1" }}>
                <div className="row">
                    <div className="col">
                        <div className="col-md-2 col-sm-6 mx-3 font-weight-bold">
                            <h4 style={{ color: "#694F5D" }} >
                                Contact us
                            </h4>
                            <ul className="list-unstyled" >
                                <Nav.Item >
                                    <Nav.Link style={{ color: "#694F5D" }} href="#/contactus">theperfectgroup8@gmail.com</Nav.Link>
                                </Nav.Item>
                                <li >
                                    <Nav.Item >
                                        <Nav.Link style={{ color: "#694F5D" }} href="https://www.facebook.com/profile.php?id=100081003196369">Facebook</Nav.Link>
                                    </Nav.Item>
                                </li>
                                <li className="font-weight-bold" >
                                    <Nav.Item>
                                        <Nav.Link style={{ color: "#694F5D" }} href="https://www.instagram.com/brrrrada_web/?utm_medium=copy_link">Instagram</Nav.Link>
                                    </Nav.Item>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="col">
                        <div className="col-md-6 col-sm-3 mx-3">

                            <h4 style={{ color: "#694F5D" }}>
                                Avital Mahgerefte
                            </h4>
                            <li className="list-unstyled" >
                                <img
                                    src='https://icon-library.com/images/woman-icon-vector/woman-icon-vector-9.jpg'
                                    className='img-fluid rounded-circle'
                                    alt=''
                                />

                            </li>
                        </div>
                    </div>
                    <div className="col">
                        <div className="col-md-6 col-sm-3 mx-3">
                            <h4 style={{ color: "#694F5D" }}>
                                Ron Mansharof
                            </h4>
                            <li className="list-unstyled" >
                                <img
                                    src='https://cdn1.iconfinder.com/data/icons/hipster-4/512/hipster-fashion-style-beard-man-glasses-512.png'
                                    className='img-fluid rounded-circle'
                                    alt=''
                                />

                            </li>
                        </div>
                    </div>
                    <div className="col">
                        <div className="col-md-6 col-sm-3 mx-3">
                            <h4 style={{ color: "#694F5D" }}>
                                Lion Dahan
                            </h4>
                            <li className="list-unstyled" >
                                <img
                                    src='https://www.nicepng.com/png/detail/494-4947134_women-transparent-icon.png'
                                    className='img-fluid rounded-circle'
                                    alt=''
                                />

                            </li>
                        </div>
                    </div>
                    <div className="col">
                        <div className="col-md-6 col-sm-3 mx-3">
                            <h4 style={{ color: "#694F5D" }}>
                                Nika Tatikishvili
                            </h4>
                            <li className="list-unstyled" >
                                <img
                                    src='https://cdn-icons-png.flaticon.com/512/39/39876.png'
                                    className='img-fluid rounded-circle'
                                    alt=''
                                />

                            </li>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bottom" style={{ color: "#694F5D" }}>
                    <p className="mb-3 d-flex justify-content-center">
                        &copy;{new Date().getFullYear()} Brada
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer;