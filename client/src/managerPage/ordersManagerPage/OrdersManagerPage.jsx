import { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Table, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageAlert from '../../components/MessageAlert';
import { Store } from '../../Store';
import { getError } from '../../utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, orders: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const OrdersManagerPage = () => {
    const { state } = useContext(Store);
    const history = useHistory();
    const [userOrderEmail, setUserOrderEmail] = useState('');
    const [orderNumber, setOrderNumber] = useState('');

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get(
                    `/api/manager/orders`,
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
        };
        fetchData();
    }, []);
    const emailHandler = async (ep) => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get(
                    `/api/manager/orders/${userOrderEmail}`,
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
        };
        fetchData();
    };
    // const orderNumberHandler = async (en) => {
    //     const fetchData = async () => {
    //         dispatch({ type: 'FETCH_REQUEST' });
    //         try {
    //             const { data } = await axios.get(
    //                 `/api/manager/orders/ordernumber/${orderNumber}`,
    //             );
    //             dispatch({ type: 'FETCH_SUCCESS', payload: data });
    //         } catch (error) {
    //             dispatch({
    //                 type: 'FETCH_FAIL',
    //                 payload: getError(error),
    //             });
    //         }
    //     };
    //     fetchData();
    // };
    return (
        <div>
            <h1>Order History</h1>
            <div className='m-5'>
                <Form className="d-flex me-auto" style={{ background: "#BFD3C1" }}>
                    <InputGroup>
                        <FormControl style={{ background: "#BFD3C1" }}
                            type="text"
                            placeholder="Search by user email..."
                            aria-label="Search by user email"
                            onChange={(e) => setUserOrderEmail(e.target.value)}
                            aria-describedby="button-search"
                        ></FormControl>
                        <Button onClick={(ep) => emailHandler()} variant="outline-primary" type="submit" id="button-search" style={{ color: "#694F5D" }}>
                            <i className="fas fa-search"></i>
                        </Button>
                    </InputGroup>
                </Form>
            </div>
            {/* <div className='m-5'>
                <Form className="d-flex me-auto" style={{ background: "#BFD3C1" }}>
                    <InputGroup>
                        <FormControl style={{ background: "#BFD3C1" }}
                            type="text"
                            placeholder="Search by order number..."
                            aria-label="Search by order number"
                            onChange={(e) => setOrderNumber(e.target.value)}
                            aria-describedby="button-search"
                        ></FormControl>
                        <Button onClick={(en) => orderNumberHandler()} variant="outline-primary"  style={{ color: "#694F5D" }}>
                            <i className="fas fa-search"></i>
                        </Button>
                    </InputGroup>
                </Form>
            </div> */}
            {loading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : error ? (
                <MessageAlert variant="danger">{error}</MessageAlert>
            ) : (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>USER EMAIL</th>
                            <th>DELIVERED</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.userEmail}</td>
                                <td>
                                    {order.isDelivered
                                        ? 'Yes'
                                        : 'No'}
                                </td>
                                <td>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() => {
                                            history.push(`/order/${order._id}`);
                                        }}
                                    >
                                        Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default OrdersManagerPage;
