import { useState, useEffect, useMemo, useContext, useReducer } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Form, Button, Table } from 'react-bootstrap';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import logger from 'use-reducer-logger';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { Check } from 'react-bootstrap-icons';
import { getError } from '../../utils';
import { CFormCheck } from '@coreui/bootstrap-react'


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, deliveries: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const ShippingAddressPage = () => {

    const history = useHistory();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress }, } = state;

    // here some logic
    const [city, setCity] = useState(userInfo.city || "");
    const [street, setStreet] = useState(userInfo.street || "");
    const [streetNumber, setStreetNumber] = useState(userInfo.streetNumber || "");
    const [aptNumber, setAptNumber] = useState(userInfo.aptNumber || "");
    const [zip, setZip] = useState(userInfo.zip || "");
    const [country, setCountry] = useState("");
    const [deliveryName, setDdeliveryName] = useState('');
    const [minDays, setMminDays] = useState('');
    const [maxDays, setMmaxDays] = useState('');
    const [deliveryPrice, setDdeliveryPrice] = useState('');
    const [flag, setFlag] = useState(false);
    const options = useMemo(() => countryList().getData(), []);

    const [{ loading, error, deliveries }, dispatch] = useReducer(logger(reducer), {
        deliveries: [],
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/manager/deliveries');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }

            // setProducts(result.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!userInfo) {
            history.push('/signin?redirect=/shipping');
        }
    }, [userInfo, history]);


    const countryHandler = country => {
        setCountry(country.label);
    };

    const addShippingMethod = (delivery) => {
        setDdeliveryName(delivery.deliveryName);
        setMminDays(delivery.minDays);
        setMmaxDays(delivery.maxDays);
        setDdeliveryPrice(delivery.deliveryPrice);
        setFlag(true);
    };

    const submitHandler = (e) => {
        if (flag === false){
            toast.error("must select delivery method before continue to payment");
            e.preventDefault();
        }
        else if (country === "") {
            toast.error("must select country before continue to payment");
            e.preventDefault();

        }
        else {
            setCountry(country.label);
            shippingAddress.country = country;
            shippingAddress.city = city;
            shippingAddress.street = street;
            shippingAddress.streetNumber = streetNumber;
            shippingAddress.aptNumber = aptNumber;
            shippingAddress.zip = zip;
            shippingAddress.deliveryName = deliveryName;
            shippingAddress.minDays = minDays;
            shippingAddress.maxDays = maxDays;
            shippingAddress.deliveryPrice = deliveryPrice;
            e.preventDefault();
            ctxDispatch({
                type: 'SAVE_SHIPPING_ADDRESS',
                payload: {
                    country,
                    city,
                    street,
                    streetNumber,
                    aptNumber,
                    zip,
                    deliveryName,
                    minDays,
                    maxDays,
                    deliveryPrice

                },
            });
            localStorage.setItem(
                'shippingAddress',
                JSON.stringify({
                    country,
                    city,
                    street,
                    streetNumber,
                    aptNumber,
                    zip,
                    deliveryName,
                    minDays,
                    maxDays,
                    deliveryPrice,

                })
            );
            history.push('/payment');
        }
    };

    return (
        <div >
            <div className="bg-image" style={{ backgroundColor: "#694F5D" }}  >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card m-5" itemID="check">
                                    <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                        <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>Shipping Adress</h2>

                                        <Form onSubmit={submitHandler}>
                                            {/* COUNTRY */}
                                            <Form.Label style={{ color: "#D8E2DC" }}>Country</Form.Label>
                                            <Select className="mb-4" options={options} value={country.label} defaultValue={country} onChange={countryHandler} />

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
                                            <div>
                                                <h1>Deliveries</h1>
                                                <Table className="justify-content-center" striped bordered hover variant="dark">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Delivery Name</th>
                                                            <th>Min Days</th>
                                                            <th>Max Days</th>
                                                            <th>Delivery Price</th>
                                                        </tr>
                                                    </thead>
                                                    {deliveries.map((delivery) => (

                                                        <tbody>
                                                            <tr>
                                                                <td><input type="radio" onClick={() => addShippingMethod(delivery)} name="aa"></input></td>
                                                                <td>{delivery.deliveryName}</td>
                                                                <td>{delivery.minDays}</td>
                                                                <td>{delivery.maxDays}</td>
                                                                <td>${delivery.deliveryPrice}</td>
                                                            </tr>
                                                        </tbody>
                                                    ))}
                                                </Table>

                                            </div>
                                            <div className="mb-3">
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

export default ShippingAddressPage;
