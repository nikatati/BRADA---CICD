import { useContext } from 'react';
import { Store } from '../../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageAlert from '../../components/MessageAlert';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';


export default function WishListPage() {
  const history = useHistory();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    wishlist: { wishlistItems },
  } = state;
  const { userInfo } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'WISH_LIST_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'WISH_LIST_REMOVE_ITEM', payload: item });
  };
  const addToCartItemHandler = (item) => {
    ctxDispatch({ type: 'WISH_LIST_REMOVE_ITEM', payload: item });
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    history.push('/signin?redirect=/shipping');
  };
  if (userInfo)
    return (
      <div>
        <h1>Wish List</h1>
        <Row>
          <Col md={8}>
            {wishlistItems.length === 0 ? (
              <MessageAlert>
                wish list is empty. <Link to="/">Go Shopping</Link>
              </MessageAlert>
            ) : (
              <ListGroup>
                {wishlistItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <Button style={{ backgroundColor: "#694F5D" }} onClick={() => addToCartItemHandler(item)} type="submit">add to cart</Button>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                      <Col md={2}>
                        <Button
                          onClick={() => removeItemHandler(item)}
                          variant="light"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      </div>
    );

}