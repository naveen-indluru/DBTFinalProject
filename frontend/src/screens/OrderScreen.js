import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientidQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";
function OrderScreen() {
  const { id: orderId } = useParams();
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientidQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("payment successful");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }
  function onError(err) {
    toast.error(err?.data?.message || err.message);
  }
  function onApprovetest() {}
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>
      {error?.message?.data} || {error?.error}
    </p>
  ) : (
    <>
      <h1>Order ID: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Order By:</h3>
              <p>
                Name:{" "}
                <strong>
                  {order.user.firstname} {order.user.lastname}
                </strong>
              </p>
              <p>
                Address:{" "}
                <strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.pin}, {order.shippingAddress.country}
                </strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Info:</h3>
              <p>
                Method: <strong>{order.paymentMethod}</strong>
              </p>
              <p>
                Status:{" "}
                {order.isPaid ? (
                  <Badge bg="success">Paid</Badge>
                ) : (
                  <Badge bg="danger">Not Paid</Badge>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Order Items:</h3>
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>{item.title}</Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Delivery Status</h3>
              <p>
                Status: <strong>{order.orderStatus}</strong>
              </p>
              <p>
                Delivered on:{" "}
                <strong>{order.deliveredAt.substring(0, 10)}</strong>
              </p>
              <p>
                Delivered By:{" "}
                <strong>
                  {order.deliveredBy.firstname} {order.deliveredBy.lastname}
                </strong>
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && order.user._id === userInfo._id && (
                <ListGroup.Item>
                  {loadingPay && <p>Loading...</p>}
                  {isPending ? (
                    <p>Loading...</p>
                  ) : (
                    <div>
                      <Button onClick={onApprovetest}>TEST</Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
