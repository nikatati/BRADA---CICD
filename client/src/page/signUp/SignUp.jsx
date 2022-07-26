import { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils';

const SignUp = () => {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        country: "",
        city: "",
        street: "",
        street_number: "",
        apt_number: "",
        zip: "",
    })
    // here some logic
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [aptNumber, setAptNumber] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const options = useMemo(() => countryList().getData(), []);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, redirect, userInfo]);


    const countryHandler = country => {
        setCountry(country.label);
        user.country = (country.label);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signup', {
                firstName,
                lastName,
                email,
                password,
                country,
                city,
                street,
                streetNumber,
                aptNumber,
                zip,
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            history.push(redirect || '/');
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <div  >
            <div className="bg-image " style={{ backgroundColor: "#694F5D" }}  >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3 ">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" itemID="check">
                                    <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                        <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>Sign Up</h2>

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

                                            {/* PASSWORD */}
                                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                                <Form.Label style={{ color: "#D8E2DC" }}>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
                                                    name="user-password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                            </Form.Group>

                                            {/* COUNTRY */}
                                            <Form.Label>Country</Form.Label>
                                            <Select className="mb-4" options={options} value={country.label} onChange={countryHandler} />

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
                                                            pattern="[0-9]{5}"
                                                            title="Must contain only 5 digits"
                                                            required name="user-zip"
                                                            value={zip}
                                                            onChange={(e) => setZip(e.target.value)} />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="mb-3 d-flex justify-content-center">
                                                <Button type="submit" style={{ background: "#694F5D" }}>Sign Up</Button>
                                            </div>
                                            <p className="text-center text-muted mt-5 mb-0">Already have an account? <a href="#/signin" className="fw-bold text-body"><u>Sign In</u></a></p>

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

export default SignUp;
