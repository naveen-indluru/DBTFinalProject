import { Table, Button, Row, Col, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes } from "react-icons/fa";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../slices/ordersApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function OrdersScreen() {
  const { data: orders, refetch, isLoading, error } = useGetAllOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateOrder, { isLoading: loadingUpdate }] =
    useUpdateOrderStatusMutation();
  const handleUpdate = async (id) => {
    await updateOrder({ id: id, userId: userInfo._id });
    refetch();
    toast.success("Order status is Updated!");
  };

  return (
    <Row>
      {" "}
      <Col md={{ span: 10, offset: 1 }}>
        <h2 className="text-center my-4">All Orders</h2>
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
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.firstname}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
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
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.orderStatus === "Delivered" ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <>
                        <Button className="btn-sm mx-1" variant="light">
                          Details
                        </Button>
                        {order.orderStatus !== "Delivered" && (
                          <Button
                            className="btn-sm mx-1"
                            variant={`${
                              order.orderStatus === "Yet to Process"
                                ? "primary"
                                : order.orderStatus === "Ready"
                                ? "warning"
                                : "success"
                            }`}
                            onClick={() => handleUpdate(order._id)}
                          >
                            {order.orderStatus === "Yet to Process"
                              ? "Ready for shipping"
                              : order.orderStatus === "Ready"
                              ? "Mark as out for delivery"
                              : "Mark as Delivered"}
                          </Button>
                        )}
                        {loadingUpdate && <p>Loading...</p>}
                      </>
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

export default OrdersScreen;
