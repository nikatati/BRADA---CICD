import { Link, useLocation, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useContext, useEffect, useState, useReducer } from 'react';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_SUCCESS':
            return { ...state, loading: false };
        case 'CREATE_FAIL':
            return { ...state, loading: false };
        default:
            return state;
    }
};

const VerifyPinCodePassword = () => {
    const history = useHistory();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [verCode, setVerCode] = useState('');
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { verificationCode } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        if (verCode == verificationCode.pin)
            history.push('/changepassword');
        else toast.error("Invalid verification code try again");
    };

    useEffect(() => {
    }, []);
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

                                            <Form.Label style={{ color: "#D8E2DC" }}>Pin</Form.Label>
                                            <Form.Control
                                                type="text"
                                                required
                                                placeholder='Enter verification code'
                                                onChange={(e) => setVerCode(e.target.value)}
                                            />

                                            <div className="mb-3 mt-3 d-flex justify-content-center">
                                                <Button style={{ backgroundColor: "#694F5D" }} type="submit">Continue</Button>
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

export default VerifyPinCodePassword;
