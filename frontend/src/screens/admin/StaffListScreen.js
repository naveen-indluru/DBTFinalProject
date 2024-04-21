import React from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import {
  useGetStaffQuery,
  useDeleteStaffMutation,
  useCreateStaffMutation,
} from "../../slices/usersApiSlice";
import { LinkContainer } from "react-router-bootstrap";
function StaffListScreen() {
  const {
    data: staff,
    refetch,
    isLoading,
    isError: error,
  } = useGetStaffQuery();

  const [deleteStaff, { isLoading: loadingDelete }] = useDeleteStaffMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteStaff(id);
        refetch();
      } catch (err) {
        window.alert(err?.data?.message || err.error);
      }
    }
  };

  const [createStaff, { isLoading: loadingCreate }] = useCreateStaffMutation();

  const createHandler = async () => {
    if (window.confirm("Are you sure you want to create a new staff?")) {
      try {
        await createStaff();
        refetch();
      } catch (err) {
        console.log(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Row>
      {" "}
      <Col md={{ span: 10, offset: 1 }}>
        <h2 className="text-center my-4">All Staff</h2>
        {loadingCreate && <p>Loading...</p>}
        <div className="d-flex justify-content-end ">
          <Button onClick={createHandler}>ADD NEW STAFF</Button>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>STAFF ID</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>ROLE</th>
                <th>EMAIL</th>
                <th>SSN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s._id}>
                  <td>{s._id}</td>
                  <td>{s.firstname}</td>
                  <td>{s.lastname}</td>
                  <td>{s.role}</td>
                  <td>{s.email}</td>
                  <td>{s.ssn}</td>

                  <td>
                    <>
                      <LinkContainer to={`/staff/${s._id}/edit`}>
                        <Button variant="warning" className="mx-2">
                          Edit
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(s._id)}
                      >
                        Delete
                      </Button>
                      {loadingDelete && <p>Loading....</p>}
                    </>
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

export default StaffListScreen;
