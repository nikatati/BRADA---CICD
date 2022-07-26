import { useEffect, useContext, useReducer, useRef, useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { Link, useParams, useHistory } from 'react-router-dom';
import { Form, Button, Card, ListGroup, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageAlert from '../../components/MessageAlert';
import { getError } from '../../utils';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

const OrderPage = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [rating, setRating] = useState(0);
    const revRef = useRef();
    const params = useParams();
    const { id: orderId } = params;
    const history = useHistory();
    // here some logic
    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });


    useEffect(() => {
        //window.alert(new Date().toISOString().slice(0, 10));
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };

        if (!userInfo) {
            return history.push('/login');
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
    }, [order, userInfo, orderId, history]);



    const submitHandler = async () => {
        try {
            dispatch({ type: 'CREATE_REQUEST' });

            const { data } = await axios.put(
                '/api/manager/orders/delivery',
                {
                    orderId: orderId,
                },
            );
            dispatch({ type: 'CREATE_SUCCESS' });
            window.location.reload();
        } catch (err) {
            dispatch({ type: 'CREATE_FAIL' });
            toast.error(getError(err));
        }
    };

    const deleteHandler = async () => {
        if (window.confirm('Are you sure to cancel the order?')) {
            try {
                await axios.delete(`/api/orders/deleteorder/${orderId}`, {
                });
                toast.success('Order canceled successfully');
                history.push('/');
            } catch (error) {
                toast.error(getError(error));
            }
        }

    };



    if (userInfo && userInfo.isAdmin)
        return (
            loading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : error ? (
                <MessageAlert variant="danger">{error}</MessageAlert>
            ) : (
                <div >
                    <div className=" bg-image" style={{ backgroundColor: "#694F5D" }}  >
                        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                            <div className="container h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                        <div className="card m-5 justify-content-center" itemID="check">
                                            <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                                <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>Order {orderId} Summary</h2>
                                                <Row>
                                                    <Col>
                                                        <h3> Order Total</h3>
                                                    </Col>
                                                    <Col>
                                                        <h3>${order.totalPrice}</h3>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Card className="mb-3">
                                                        <Card.Body>
                                                            <Card.Title>Shipping</Card.Title>
                                                            <Card.Text>
                                                                <strong>Country:</strong> {order.shippingAddress.country} <br />
                                                                <strong>City:</strong> {order.shippingAddress.city} <br />
                                                                <strong>Street:</strong> {order.shippingAddress.street} <br />
                                                                <strong>Street Number:</strong> {order.shippingAddress.streetNumber} <br />
                                                                <strong>Apartment Number:</strong> {order.shippingAddress.aptNumber} <br />
                                                                <strong>ZIP:</strong> {order.shippingAddress.zip} <br />
                                                                <strong>Delivery Name:</strong> {order.shippingAddress.deliveryName} <br />
                                                                <strong>Delivery Min Days:</strong> {order.shippingAddress.minDays} <br />
                                                                <strong>Delivery Max Days:</strong> {order.shippingAddress.maxDays} <br />
                                                                <strong>Delivery Price:</strong> ${order.shippingAddress.deliveryPrice} <br />
                                                                <strong>Date Of Order:</strong> {order.createdAt.substring(0, 10)} <br />
                                                            </Card.Text>
                                                            {order.isDelivered ? (
                                                                <MessageAlert variant="success">
                                                                    Order Delivered
                                                                </MessageAlert>
                                                            ) : (
                                                                <MessageAlert variant="danger">Order Not Delivered Yet</MessageAlert>
                                                            )}
                                                        </Card.Body>
                                                    </Card>

                                                    <Card className="mb-3">
                                                        <Card.Body>
                                                            <Card.Title>Items</Card.Title>
                                                            <ListGroup variant="flush">
                                                                {order.orderItems.map((item) => (
                                                                    <ListGroup.Item key={item._id}>
                                                                        <Row className="align-items-center">
                                                                            <Col md={6}>
                                                                                <img
                                                                                    src={item.image}
                                                                                    alt={item.title}
                                                                                    className="img-fluid rounded img-thumbnail"
                                                                                ></img>{' '}
                                                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                                            </Col>
                                                                            <Col md={3}>
                                                                                <span>{item.quantity}</span>
                                                                            </Col>
                                                                            <Col md={3}>${item.price}</Col>
                                                                        </Row>
                                                                    </ListGroup.Item>
                                                                ))}
                                                            </ListGroup>
                                                        </Card.Body>
                                                    </Card>

                                                    <Form onSubmit={submitHandler}>
                                                        <div className="mb-3 d-flex justify-content-center">
                                                            <Button style={{ backgroundColor: "#694F5D" }} type="submit" >Deliver Complete</Button>
                                                        </div>
                                                    </Form>

                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            )
        );

    else
        return (
            loading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : error ? (
                <MessageAlert variant="danger">{error}</MessageAlert>
            ) : (
                <div >
                    <div className=" bg-image" style={{ backgroundColor: "#694F5D" }}  >
                        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                            <div className="container h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                        <div className="card m-5 justify-content-center" itemID="check">
                                            <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                                <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>Order {orderId} Summary</h2>
                                                <Row>
                                                    <Col>
                                                        <h3> Order Total</h3>
                                                    </Col>
                                                    <Col>
                                                        <h3>${order.totalPrice}</h3>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Card className="mb-3">
                                                        <Card.Body>
                                                            <Card.Title>Shipping</Card.Title>
                                                            <Card.Text>
                                                                <strong>Country:</strong> {order.shippingAddress.country} <br />
                                                                <strong>City:</strong> {order.shippingAddress.city} <br />
                                                                <strong>Street:</strong> {order.shippingAddress.street} <br />
                                                                <strong>Street Number:</strong> {order.shippingAddress.streetNumber} <br />
                                                                <strong>Apartment Number:</strong> {order.shippingAddress.aptNumber} <br />
                                                                <strong>ZIP:</strong> {order.shippingAddress.zip} <br />
                                                                <strong>Delivery Name:</strong> {order.shippingAddress.deliveryName} <br />
                                                                <strong>Delivery Min Days:</strong> {order.shippingAddress.minDays} <br />
                                                                <strong>Delivery Max Days:</strong> {order.shippingAddress.maxDays} <br />
                                                                <strong>Delivery Price:</strong> ${order.shippingAddress.deliveryPrice} <br />
                                                                <strong>Date Of Order:</strong> {order.createdAt.substring(0, 10)} <br />
                                                            </Card.Text>
                                                            {order.isDelivered ? (
                                                                <MessageAlert variant="success">
                                                                    Order Delivered
                                                                </MessageAlert>
                                                            ) : (
                                                                <MessageAlert variant="danger">Order Not Delivered Yet</MessageAlert>
                                                            )}
                                                        </Card.Body>
                                                    </Card>

                                                    <Card className="mb-3">
                                                        <Card.Body>
                                                            <Card.Title>Items</Card.Title>
                                                            <ListGroup variant="flush">
                                                                {order.orderItems.map((item) => (
                                                                    <ListGroup.Item key={item._id}>
                                                                        <Row className="align-items-center">
                                                                            <Col md={6}>
                                                                                <img
                                                                                    src={item.image}
                                                                                    alt={item.title}
                                                                                    className="img-fluid rounded img-thumbnail"
                                                                                ></img>{' '}
                                                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                                            </Col>
                                                                            <Col md={3}>
                                                                                <span>{item.quantity}</span>
                                                                            </Col>
                                                                            <Col md={3}>${item.price}</Col>
                                                                            <Col>
                                                                                <div className="my-3">
                                                                                    <Link to={`/rateproduct/${item._id}`}><h2>Rate Product</h2></Link>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </ListGroup.Item>
                                                                ))}
                                                            </ListGroup>
                                                        </Card.Body>
                                                    </Card>
                                                    <Button variant="danger" onClick={() => deleteHandler()}>Cancel Order</Button>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            )
        );
}

export default OrderPage;
