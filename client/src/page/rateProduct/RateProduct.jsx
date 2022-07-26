import axios from 'axios';
import { useEffect, useReducer, useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form,  Badge, Button, Card } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import LoadingSpinner from '../../components/LoadingSpinner';
import MessageAlert from '../../components/MessageAlert';
import { getError } from '../../utils';
import { Store } from '../../Store';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loadingCreateReview: true };
        case 'CREATE_SUCCESS':
            return { ...state, loadingCreateReview: false };
        case 'CREATE_FAIL':
            return { ...state, loadingCreateReview: false };
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


function RateProduct() {
    let history = useHistory();
    const params = useParams();
    const { id } = params;
    const [rating, setRating] = useState(0);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const [{ loading, error, product, loadingCreateReview }, dispatch] =
        useReducer(reducer, {
            product: [],
            loading: true,
            error: '',
        });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/${id}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if ( !rating) {
            toast.error('Please enter rating');
            return;
        }
        try {
            const { data } = await axios.post(
                `/api/products/${product._id}/reviews`,
                { rating, email: userInfo.email },
            );

            dispatch({
                type: 'CREATE_SUCCESS',
            });
            toast.success('Rate submitted successfully');
            product.reviews.unshift(data.review);
            product.numReviews = data.numReviews;
            product.rating = data.rating;
            history.push('/');
        } catch (error) {
            toast.error(getError(error));
            dispatch({ type: 'CREATE_FAIL' });
        }
    };

    return loading ? (
        <LoadingSpinner />
    ) : error ? (
        <MessageAlert variant="danger">{error}</MessageAlert>
    ) : (
        <div >
            <div className=" bg-image" style={{ backgroundColor: "#694F5D" }}  >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card m-3" itemID="check">
                                    <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                        <h2 className="text-uppercase text-center mb-5">{product.title}</h2>
                                        <img src={product.image} className="card-img-top" alt={product.title} />
                                        <Form onSubmit={submitHandler}>
                                            <h2 className="mb-3 d-flex justify-content-center">Rate that product</h2>
                                            <Form.Group className="mb-3" controlId="rating">
                                                <Form.Label className="mb-3 d-flex justify-content-center">Rating</Form.Label>
                                                <Form.Select
                                                    aria-label="Rating"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="1">&#9733;</option>
                                                    <option value="2">&#9733; &#9733;</option>
                                                    <option value="3">&#9733; &#9733; &#9733;</option>
                                                    <option value="4">&#9733; &#9733; &#9733; &#9733;</option>
                                                    <option value="5">&#9733; &#9733; &#9733; &#9733; &#9733;</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <div className="mb-3 d-flex justify-content-center">
                                                <Button disabled={loadingCreateReview} type="submit">
                                                    Rate
                                                </Button>
                                                {loadingCreateReview && <LoadingSpinner></LoadingSpinner>}
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
export default RateProduct;

