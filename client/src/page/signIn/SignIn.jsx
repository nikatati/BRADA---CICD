import { Link, useLocation, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils';


const SignIn = () => {
    const history = useHistory();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/users/signin', {
                email,
                password,
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            history.push(redirect || '/');
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
                                        <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>Log In</h2>

                                        <Form onSubmit={submitHandler}>

                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label style={{ color: "#D8E2DC" }}>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    required
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                </Form.Text>
                                            </Form.Group>



                                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                                <Form.Label style={{ color: "#D8E2DC" }}>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    required
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </Form.Group>
                                            <div className="mb-3 d-flex justify-content-center">
                                                <Button style={{ backgroundColor: "#694F5D" }} type="submit">Sign in</Button>
                                            </div>
                                            <p className="text-center text-muted mt-5 mb-0">Don't have an account? <a href="#/signup" className="fw-bold text-body"><u>Register</u></a></p>
                                            <p className="text-center text-muted mt-5 mb-0">Forgot your password? <a href="#/resetpassword" className="fw-bold text-body"><u>Reset Password</u></a></p>
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

export default SignIn;
