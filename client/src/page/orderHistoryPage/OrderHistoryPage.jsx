import { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
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

const OrderHistoryPage = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const history = useHistory();

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get(
                    `/api/orders/userorders`,

                    { headers: { Authorization: `Bearer ${userInfo.token}` } }
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
    }, [userInfo]);
    return (
        <div>
            <h1>Order History</h1>
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
                            <th>TOTAL</th>
                            <th>DELIVERED</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
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

export default OrderHistoryPage;
