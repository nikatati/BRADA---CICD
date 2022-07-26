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


export default function CartPage() {
  const history = useHistory();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const { userInfo } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    history.push('/signin?redirect=/shipping');
  };
  if (userInfo)
    return (
      <div>
        <h1>Shopping Cart</h1>
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <MessageAlert>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </MessageAlert>
            ) : (
              <ListGroup>
                {cartItems.map((item) => (
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
                        <Button
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                          variant="light"
                          disabled={item.quantity === 1}
                        >
                          <i className="fas fa-minus-circle"></i>
                        </Button>{' '}
                        <span>{item.quantity}</span>{' '}
                        <Button
                          variant="light"
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                          disabled={item.quantity === item.countInStock}
                        >
                          <i className="fas fa-plus-circle"></i>
                        </Button>
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
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                      items) : $
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={checkoutHandler}
                        disabled={cartItems.length === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
    return(<Alert variant={'danger'}>Cart Available Only For Log in Users!</Alert>);
}