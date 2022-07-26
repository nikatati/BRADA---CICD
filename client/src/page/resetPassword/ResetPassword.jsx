import { Link, useLocation, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils';


const ResetPassword = () => {
    const history = useHistory();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [email, setEmail] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo,verificationCode } = state;
    const submitHandler = async (e) => {
        const pin =Math.floor(Math.random() * (10000 - 1000) + 1000);

        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/email/resetpassword`, {
                pin,
                email,
            });
            localStorage.setItem('verificationCode', JSON.stringify(data));
            toast.success(data.message);
            history.push('/resetpasswordpin');
        } catch (err) {
            toast.error(getError(err));
        }
    };

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, redirect, userInfo]);
    return (
        <div >
            <div className=" bg-image" style={{ backgroundColor: "#694F5D" }}  >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" itemID="check">
                                    <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                        <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>Reset Password</h2>

                                        <Form onSubmit={submitHandler}>

                                            <Form.Label style={{ color: "#D8E2DC" }}>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                            />

                                            <div className="mb-3 mt-3 d-flex justify-content-center">
                                                <Button style={{ backgroundColor: "#694F5D" }} type="submit">Send Verification Code</Button>
                                            </div>
                                        </Form>

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

export default ResetPassword;
