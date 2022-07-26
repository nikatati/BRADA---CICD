import { useState, useEffect, useMemo, useContext, useReducer } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Form, Button, Card, ListGroup, Row, Col } from 'react-bootstrap';
import countryList from 'react-select-country-list';
import Select from 'react-select';
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

const PaymentPage = () => {
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    });
    const history = useHistory();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    // here some logic
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
    cart.itemsPrice = round2(
      cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );

    cart.itemsPrice = cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0);

    cart.totalPrice = cart.itemsPrice + cart.shippingAddress.deliveryPrice;

    useEffect(() => {
        if (!userInfo) {
            history.push('/signin?redirect=/shipping');
        }
    }, [userInfo, history]);


    const submitHandler = async () => {
        try {
            dispatch({ type: 'CREATE_REQUEST' });
      
            const { data } = await axios.post(
              '/api/orders',
              {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                totalPrice: cart.totalPrice,
                userEmail: userInfo.email,
              },
              {
                headers: {
                  authorization: `Bearer ${userInfo.token}`,
                },
              }
            );
            ctxDispatch({ type: 'CART_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('cartItems');
            history.push(`/order/${data.order._id}`);
          } catch (err) {
            dispatch({ type: 'CREATE_FAIL' });
            toast.error(getError(err));
          }
    };

    return (
        <div >
            <div className=" bg-image" style={{ backgroundColor: "#694F5D" }}  >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card m-5" itemID="check">
                                    <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                        <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>Payment</h2>

                                        <Form onSubmit={submitHandler}>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Group className="mb-4" controlId="formBasicFirstName">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>First Name</Form.Label>
                                                        <Form.Control
                                                            required type="text"
                                                            placeholder="Last Name"
                                                            pattern="[A-Za-z' ']{1,20}"
                                                            title="Must contain only letters" />
                                                    </Form.Group>
                                                </div>

                                                {/* LAST NAME */}
                                                <div className="col-md-6">
                                                    <Form.Group className="mb-4" controlId="formBasicLastName">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>Last Name</Form.Label>
                                                        <Form.Control
                                                            required type="text"
                                                            placeholder="Last Name"
                                                            pattern="[A-Za-z' ']{1,20}"
                                                            title="Must contain only letters" />
                                                    </Form.Group>
                                                </div>
                                            </div>

                                            <div className="row">
                                                {/* Credit Card Number */}
                                                <div className="col-md-12">
                                                    <Form.Group className="mb-4" controlId="formBasicCity">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>Credit Card Number</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Credit Card Number"
                                                            pattern="[0-9]{16,16}"
                                                            title="Must contain only 16 digits" required />
                                                    </Form.Group>
                                                </div>
                                            </div>

                                            <div className="row">
                                                {/* Month Expiry */}
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-4" controlId="formBasicStreetNumber">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>Month Expiry</Form.Label>
                                                        <Form.Control
                                                            required type="text"
                                                            placeholder="Month Expiry"
                                                            pattern="([1][0-2]|[1-9])"
                                                            title="Invalid month format available option: 1-12" />

                                                    </Form.Group>
                                                </div>

                                                {/* Year Expiry*/}
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-4" controlId="formBasicAptNumber">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>Year Expiry</Form.Label>
                                                        <Form.Control
                                                            required type="text"
                                                            placeholder="Year Expiry"
                                                            pattern="([3][0-9]|[2][2-9])"
                                                            title="Invalid year format example: 22, contain only 2 digits" />
                                                    </Form.Group>
                                                </div>

                                                {/* CVV */}
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-4" controlId="formBasicZip">
                                                        <Form.Label style={{ color: "#D8E2DC" }}>CVV</Form.Label>
                                                        <Form.Control
                                                            required type="text"
                                                            placeholder="CVV"
                                                            pattern="[0-9]{3,3}"
                                                            title="Must contain only 3 digits" />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <h2 className="text-uppercase text-center mb-5">Order Summary</h2>
                                            <Card className="mb-3" >
                                                <Card.Body>
                                                    <Card.Title style={{ color: "#D8E2DC" }}>Shipping</Card.Title>
                                                    <Card.Text >
                                                        <strong>Country:</strong> {cart.shippingAddress.country} <br />
                                                        <strong>City:</strong> {cart.shippingAddress.city} <br />
                                                        <strong>Street:</strong> {cart.shippingAddress.street} <br />
                                                        <strong>Street Number:</strong> {cart.shippingAddress.streetNumber} <br />
                                                        <strong>Apartment Number:</strong> {cart.shippingAddress.aptNumber} <br />
                                                        <strong>ZIP:</strong> {cart.shippingAddress.zip} <br />
                                                        <strong>Delivery Name:</strong> {cart.shippingAddress.deliveryName} <br />
                                                        <strong>Delivery Min Days:</strong> {cart.shippingAddress.minDays} <br />
                                                        <strong>Delivery Max Days:</strong> {cart.shippingAddress.maxDays} <br />
                                                        <strong>Delivery Price:</strong> ${cart.shippingAddress.deliveryPrice} <br />
                                                    </Card.Text>
                                                    <Link to="/shipping" className="fw-bold text-body">Edit</Link>
                                                </Card.Body>
                                            </Card>

                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Card.Title style={{ color: "#D8E2DC" }}>Items</Card.Title>
                                                    <ListGroup variant="flush">
                                                        {cart.cartItems.map((item) => (
                                                            <ListGroup.Item key={item._id}>
                                                                <Row className="align-items-center">
                                                                    <Col md={3}>
                                                                        <img
                                                                            src={item.image}
                                                                            alt={item.title}
                                                                            className="img-fluid rounded img-thumbnail"
                                                                        ></img>{' '}
                                                                        <Link to={`/product/${item.slug}`} className="fw-bold text-body ">{item.title}</Link>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <span>{item.quantity}</span>
                                                                    </Col>
                                                                    <Col md={3}>${item.price}</Col>
                                                                    <Col md={3}><Link to="/cart" className="fw-bold text-body">Edit</Link></Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        ))}
                                                    </ListGroup>
                                                </Card.Body>
                                            </Card>
                                            <h2 className="text-uppercase text-center mb-5">Total Price</h2>
                                            <h5 className="text-uppercase text-center mb-5">${cart.totalPrice}</h5>

                                            <div className="mb-3 d-flex justify-content-center">
                                                <Button style={{ backgroundColor: "#694F5D" }} type="submit" >Pay</Button>
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

export default PaymentPage;
