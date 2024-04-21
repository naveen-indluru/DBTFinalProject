import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import {
  useGetStaffByIDQuery,
  useUpdateStaffMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

function EditStaffScreen() {
  const { id: staffId } = useParams();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState("");
  const {
    data: staff,
    isLoading,
    refetch,
    error,
  } = useGetStaffByIDQuery(staffId);
  const [updateStaff, { isLoading: loadingUpdate }] = useUpdateStaffMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateStaff({
        staffId,
        firstname,
        lastname,
        email,
        ssn,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Staff updated");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (staff) {
      setFirstname(staff.firstname);
      setLastname(staff.lastname);
      setEmail(staff.email);
      setSsn(staff.ssn);
    }
  }, [staff]);

  return (
    <>
      <Link to="/staff" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Staff Details</h1>
        {/* {loadingUpdate && <Loader />} */}
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error.data.message}</p>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter First name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="name2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>SSN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter SSN"
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
            {loadingUpdate && <p>Loading...</p>}
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default EditStaffScreen;
