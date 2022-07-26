import axios from 'axios';
import { useEffect, useReducer, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Badge, Button, Card } from 'react-bootstrap';
import Rating from '../../components/Rating';
import LoadingSpinner from '../../components/LoadingSpinner';
import MessageAlert from '../../components/MessageAlert';
import { getError } from '../../utils';
import { Store } from '../../Store';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
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


function ProductScreen() {
  let history = useHistory();
  const params = useParams();
  const { slug } = params;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo ,wishlist} = state;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const addToCartHandler = async () => {
    if (userInfo === null) {
      toast.error("Must login before add to cart");
      history.push('/signin');
    }
    else {
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity },
      });
      history.render();
    };
  }
  const addToWishListHandler = async () => {
    if (userInfo === null) {
      toast.error("Must login before add to wishlist");
      history.push('/signin');
    }
    else {
      const existItem = wishlist.wishlistItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
      ctxDispatch({
        type: 'WISH_LIST_ADD_ITEM',
        payload: { ...product, quantity },
      });
      history.render();
    };
  }

  const editHandler = () => {
    if (userInfo.isAdmin) {
      history.push(`/admin/product/edit/${product.slug}`);
    }
    else {
      toast.error("Must be admin");
      history.push('/');
    };
  };

  if (userInfo && userInfo.isAdmin)
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
                      <Card.Title style={{ color: "#D8E2DC" }}>{product.title}</Card.Title>
                      <Rating style={{ color: "#D8E2DC" }} rating={product.rating} numReviews={product.numReviews} />
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Brand: </strong>{product.brand}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Type: </strong>{product.type}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Category: </strong>{product.category}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Color: </strong>{product.color}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Size: </strong>{product.size}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Color: </strong>{product.color}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Description: </strong>{product.description}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Price: </strong>${product.price}</Card.Text>
                      {product.countInStock === 0 ? (
                        <Button variant="light" disabled>
                          Out of stock
                        </Button>
                      ) : (
                        <Row>
                        <Col>
                          <Button style={{ backgroundColor: "#694F5D" }} onClick={() => addToCartHandler()}>Add to cart</Button>
                        </Col>
                        <Col>
                          <Button style={{ backgroundColor: "#694F5D" }} onClick={() => addToWishListHandler()}>Add to WishList</Button>
                        </Col>
                        </Row>
                      )}
                      <Button style={{ backgroundColor: "#694F5D" }} className='m-3' onClick={() => editHandler()} >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >

    )

  else {
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
                      <Card.Title style={{ color: "#D8E2DC" }}>{product.title}</Card.Title>
                      <Rating rating={product.rating} numReviews={product.numReviews} />
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Brand: </strong>{product.brand}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Type: </strong>{product.type}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Category: </strong>{product.category}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Color: </strong>{product.color}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Size: </strong>{product.size}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Color: </strong>{product.color}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Description: </strong>{product.description}</Card.Text>
                      <Card.Text style={{ color: "#D8E2DC" }}><strong>Price: </strong>${product.price}</Card.Text>
                      {product.countInStock === 0 ? (
                        <Button variant="light" disabled>
                          Out of stock
                        </Button>
                      ) : (
                        <Row>
                          <Col>
                            <Button style={{ backgroundColor: "#694F5D" }} onClick={() => addToCartHandler()}>Add to cart</Button>
                          </Col>
                          <Col>
                            <Button style={{ backgroundColor: "#694F5D" }} onClick={() => addToWishListHandler()}>Add to WishList</Button>
                          </Col>
                          </Row>
                      )}

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
}
export default ProductScreen;

