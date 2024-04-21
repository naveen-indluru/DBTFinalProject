import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Image, ListGroup, Row, Col, Button } from "react-bootstrap";
import { removefromcart } from "../slices/cartSlice";

function CartScreen() {
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeFromCartHandler = async (id) => {
    dispatch(removefromcart(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <Link to="/" className=" my-3">
        <MdArrowBackIos /> Go Back
      </Link>
      <h2 className="my-3">Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <Row>
            <Col>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h4>Cover Image</h4>
                    </Col>
                    <Col>
                      <h4>Title</h4>
                    </Col>
                    <Col>
                      <h4>Price</h4>
                    </Col>
                    <Col>
                      <h4>Qty</h4>
                    </Col>
                    <Col>
                      <h4>Remove</h4>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col>
                        <Image src={item.image} width={100} height={120} />
                      </Col>
                      <Col>
                        <Link to={`/book/${item._id}`}>{item.title}</Link>
                      </Col>
                      <Col>${item.price}</Col>
                      <Col>
                        <span>{item.qty}</span>
                      </Col>
                      <Col>
                        <Button
                          variant="light"
                          onClick={() => {
                            removeFromCartHandler(item._id);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col className="d-flex justify-content-end m-4">
              <Button
                className="btn-block"
                type="button"
                variant="light"
                disabled={cartItems.length === 0}
                onClick={() => checkOutHandler()}
              >
                Proceed To CheckOut
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col md={6} className="mx-auto text-center">
            <h1>
              Cart Is Empty. <Link to="/">Go back</Link>
            </h1>
          </Col>
        </Row>
      )}
    </>
  );
}

export default CartScreen;
