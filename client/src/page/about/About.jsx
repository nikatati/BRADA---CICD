import { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AboutPage = () => {

    return (
        <div >
            <div className=" bg-image" style={{ backgroundColor: "#694F5D" }}  >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container rounded h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card mb-3" itemID="check">
                                    <div className="card-body p-5 rounded" style={{ backgroundColor: "#BFD3C1" }} >
                                        <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>About</h2>

                                        <div> led the way in the secondary luxury handbag industry with innovative ideas and supreme customer service, becoming the “go-to” destination for clients seeking authentic and quality pre-loved handbags. Our unique services include an exclusive VIP Club, a Bag Bespoke service for any handbag, and a Bag Concierge service to help clients locate almost any handbag in the world.
                                        </div>
                                        <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>Returm item policy</h2>
                                        <h5 style={{ color: "#D8E2DC" }}>
                                            No Returns
                                        </h5>
                                        <div>
                                            We do not accept returns, all purchases are final. We describe our bags very accurately and request that you ask all questions before you make a purchase. We will gladly answer any questions you have as well as provide additional pictures upon request.
                                        </div>
                                        <h5 style={{ color: "#D8E2DC" }}>
                                            No Refunds
                                        </h5>
                                        <div>
                                            We do not give any refunds as we do not accept returns and all purchases are final sale without exception. The only reason a refund would be issued is if a bag is not authentic, which has never once happened on Baghunter and never will. Our team of authentication experts inspect and authenticate every bag before it is shipped to our clients.
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default AboutPage;
