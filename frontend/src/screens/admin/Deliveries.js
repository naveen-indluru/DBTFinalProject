import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDeliveredByMeQuery } from "../../slices/ordersApiSlice";
import { Row, Col, Table, Button, Badge } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
function Deliveries() {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: orders,
    isLoading,
    error,
  } = useDeliveredByMeQuery(userInfo._id);
  return (
    <Row>
      {" "}
      <Col md={{ span: 10, offset: 1 }}>
        <h2 className="text-center my-4">My Deliveries</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER NAME</th>
                <th>DATE</th>

                <th>STATUS</th>

                <th>DELIVERED</th>
                <th>DELIVERED BY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.firstname}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>

                  <td>
                    <Badge
                      bg={`${
                        order.orderStatus === "Yet to Process"
                          ? "primary"
                          : order.orderStatus === "Ready"
                          ? "warning"
                          : "success"
                      }`}
                    >
                      {order.orderStatus}
                    </Badge>
                  </td>

                  <td>
                    {order.orderStatus === "Delivered" ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>{order.deliveredBy.firstname}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm mx-1" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default Deliveries;
