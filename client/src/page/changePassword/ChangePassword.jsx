import { Link, useLocation, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils';


const ChangePassword = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, verificationCode } = state;
    const history = useHistory();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(verificationCode.email);


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                '/api/users/password',
                {
                    password,
                    email,
                },
            );
            toast.success(data.message);
            history.push('/signin');
        } catch (err) {
            toast.error('Password not update.');
        }
    };

    useEffect(() => {

    }, []);
    return (
        <div >
            <div className="bg-image" style={{ backgroundColor: "#694F5D" }}  >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card mb-3" itemID="check">
                                    <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                        <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>Change Password</h2>

                                        <Form onSubmit={submitHandler}>
                                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                                <Form.Label style={{ color: "#D8E2DC" }}>New Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
                                                    name="user-password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                            </Form.Group>
                                            <div className="mb-3 mt-3 d-flex justify-content-center">
                                                <Button style={{ backgroundColor: "#694F5D" }} type="submit">Change password</Button>
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

export default ChangePassword;
