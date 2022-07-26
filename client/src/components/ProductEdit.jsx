// import Card from 'react-bootstrap/Card';
import { Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';



function ProductEdit(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const history = useHistory();

  const editHandler = () => {
      history.push(`/admin/product/edit/${product.slug}`)
  }

  return (
    <Card>
      <Link to={`/admin/product/edit/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.title} />
      </Link>
      <Card.Body>
        <Link to={`/admin/product/edit/${product.slug}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
          <Button onClick={() => editHandler(product)}>Edit</Button>
      </Card.Body>
    </Card>
  );
}
export default ProductEdit;
