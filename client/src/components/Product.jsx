// import Card from 'react-bootstrap/Card';
import { Row, Col, Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';



function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const {
    wishlist: { wishlistItems },
  } = state;
  const { userInfo, cart , wishlist } = state;
  const history = useHistory();

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
      toast.error("Must login before add to cart");
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

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Row>
            <Col><Button onClick={() => addToCartHandler(product)}>Add to cart</Button></Col>
          <Col><Button onClick={() => addToWishListHandler(product)}>Add to wishlist</Button></Col>
          
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
