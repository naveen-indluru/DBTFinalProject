import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import { toast } from "react-toastify";

function ShippingScreen() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (address === "" || city === "" || pin === "" || country === "") {
      toast.error("All fields are required");
    } else {
      dispatch(saveShippingAddress({ address, city, pin, country }));
      navigate("/placeorder");
    }
  };
  return (
    <FormContainer>
      <h1 style={{ color: "black" }}>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="pin">
          <Form.Label>PinCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="light"
          style={{ border: "1px solid black", margin: "20px 0px 10px 0px" }}
        >
          {" "}
          Next
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
