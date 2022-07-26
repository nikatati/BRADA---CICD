import { useState, useEffect, useContext, useReducer } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };

        default:
            return state;
    }
};

const ProfilePage = () => {
    // here some logic
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const history = useHistory();

    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);
    const [email, setEmail] = useState(userInfo.email);
    const [city, setCity] = useState(userInfo.city);
    const [country, setCountry] = useState(userInfo.country);
    const [street, setStreet] = useState(userInfo.street);
    const [streetNumber, setStreetNumber] = useState(userInfo.streetNumber);
    const [aptNumber, setAptNumber] = useState(userInfo.aptNumber);
    const [zip, setZip] = useState(userInfo.zip);
    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });


    useEffect(() => {

    }, []);

    const deleteHandler = async () => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                await axios.delete(`/api/users/delete/${email}`, {
                    email,
                });
                toast.success('User deleted successfully');
                history.push('/');
                ctxDispatch({ type: 'USER_SIGNOUT' });
                localStorage.removeItem('userInfo');
            } catch (error) {
                toast.error(getError(error));
            }
        }

    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    firstName,
                    lastName,
                    email,
                    country,
                    city,
                    street,
                    streetNumber,
                    aptNumber,
                    zip,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User updated successfully');
        } catch (err) {
            dispatch({
                type: 'FETCH_FAIL',
            });
            toast.error('Email is already in use.');
        }
    };

    return (
        <div >
            <div className=" bg-image" style={{ backgroundColor: "#694F5D" }}  >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" itemID="check">
                                    <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                        <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>User Profile</h2>

                                        <Form onSubmit={submitHandler}>
                                            {/* FIRST NAME */}
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Group className="mb-4" controlId="formBasicFirstName">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>First Name</Form.Label>
                                                        <Form.Control
                                                            required type="text"
                                                            name="first-name"
                                                            pattern="[A-Za-z' ']{1,20}"
                                                            title="Must contain only letters"
                                                            placeholder="First Name"
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)} />
                                                    </Form.Group>
                                                </div>

                                                {/* LAST NAME */}
                                                <div className="col-md-6">
                                                    <Form.Group className="mb-4" controlId="formBasicLastName">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>Last Name</Form.Label>
                                                        <Form.Control
                                                            required type="text"
                                                            name="last-name"
                                                            placeholder="Last Name"
                                                            pattern="[A-Za-z' ']{1,20}"
                                                            title="Must contain only letters"
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)} />
                                                    </Form.Group>
                                                </div>
                                            </div>

                                            {/* EMAIL */}
                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label style={{ color: "#D8E2DC" }}>Email address</Form.Label>
                                                <Form.Control
                                                    required type="email"
                                                    placeholder="Enter email"
                                                    name="user-email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)} />
                                                <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                </Form.Text>
                                            </Form.Group>

                                            <div className="row">
                                                {/* City */}
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-4" controlId="formBasicCity">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>City</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="City"
                                                            pattern="[A-Za-z' ']{1,20}"
                                                            title="Must contain only letters" required
                                                            name="user-city"
                                                            value={city}
                                                            onChange={(e) => setCity(e.target.value)} />
                                                    </Form.Group>
                                                </div>

                                                {/* STREET */}
                                                <div className="col-md-8">
                                                    <Form.Group className="mb-4" controlId="formBasicStreet">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>Street</Form.Label>
                                                        <Form.Control type="text"
                                                            placeholder="Street"
                                                            pattern="[A-Za-z' ']{1,20}"
                                                            title="Must contain only letters" required
                                                            name="user-street"
                                                            value={street}
                                                            onChange={(e) => setStreet(e.target.value)} />
                                                    </Form.Group>
                                                </div>
                                            </div>

                                            <div className="row">
                                                {/* Street num */}
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-4" controlId="formBasicStreetNumber">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>Street Number</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Street Num"
                                                            pattern="[0-9]{1,5}"
                                                            title="Must contain only digits, max length 5"
                                                            required name="user-street-num"
                                                            value={streetNumber}
                                                            onChange={(e) => setStreetNumber(e.target.value)} />
                                                    </Form.Group>
                                                </div>

                                                {/* Apt num */}
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-4" controlId="formBasicAptNumber">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>Apt Number</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Apt Num"
                                                            pattern="[0-9]{1,5}"
                                                            title="Must contain only digits, max length 5"
                                                            required name="user-apt-num"
                                                            value={aptNumber}
                                                            onChange={(e) => setAptNumber(e.target.value)} />
                                                    </Form.Group>
                                                </div>

                                                {/* Zip */}
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-4" controlId="formBasicZip">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>ZIP Code</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="ZIP Code"
                                                            pattern="[0-9]{1,10}"
                                                            title="Must contain only digits, max length 10"
                                                            required name="user-zip"
                                                            value={zip}
                                                            onChange={(e) => setZip(e.target.value)} />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <Button style={{ backgroundColor: "#694F5D" }} type="submit">Update</Button>
                                            </div>
                                        </Form>
                                        <div className="mb-3">
                                            <Button onClick={() => deleteHandler()} style={{ backgroundColor: "#694F5D" }} type="submit">Delete User</Button>
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

export default ProfilePage;
