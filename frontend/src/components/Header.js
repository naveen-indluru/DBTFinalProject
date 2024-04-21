import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      console.log("klklklk");
      navigate("/staff");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header>
      <Navbar expand="md" collapseOnSelect className="text-primary">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <strong>Book Store</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <strong>Cart</strong>
                  <Badge pill bg="dark" style={{ marginLeft: "4px" }}>
                    {cartItems.length}
                  </Badge>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.firstname} id="username">
                    {userInfo.role === "delivery" ? (
                      <>
                        <LinkContainer to="/staffprofile">
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/mydeliveries">
                          <NavDropdown.Item>Delivered By Me</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    ) : (
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                    )}
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  {userInfo.role === "admin" && (
                    <NavDropdown title="dashboard" id="dashboard">
                      <LinkContainer to="/orders">
                        <NavDropdown.Item>Manage Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/books">
                        <NavDropdown.Item>Manage Books</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/customers">
                        <NavDropdown.Item>Manage Customers</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/staff">
                        <NavDropdown.Item>Manage Staff</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                  {userInfo.role === "delivery" && (
                    <NavDropdown title="dashboard" id="dashboard2">
                      <LinkContainer to="/readyorders">
                        <NavDropdown.Item>View Ready Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />
    </header>
  );
}

export default Header;
