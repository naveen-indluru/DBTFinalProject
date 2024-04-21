import { useState } from "react";
import {
  useGetBookByIDQuery,
  useCreateReviewMutation,
} from "../slices/booksApiSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { Row, Col, Image, Button, ListGroup, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { addTocart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function SingleBookScreen() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id: bookId } = useParams();
  const [qty, setQty] = useState(1);
  const { data: book, refetch, isLoading, error } = useGetBookByIDQuery(bookId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const AddToCarthandler = () => {
    dispatch(addTocart({ ...book, qty }));
    navigate("/cart");
  };

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        bookId,
        rating,
        comment,
        name: userInfo.firstname,
        userId: userInfo._id,
      }).unwrap();
      refetch();
      setComment("");
      setRating(0);
      toast.success("Review created successfully");
    } catch (err) {
      setComment("");
      setRating(0);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/" className=" my-3">
        <MdArrowBackIos /> Go Back
      </Link>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : error ? (
        <h2>{error?.data?.message || error?.error}</h2>
      ) : (
        <>
          <Row
            className=" mt-4 text-dark book-details-container "
            // style={{ width: "1000px" }}
          >
            <Col md={5}>
              <Image
                src={`http://localhost:5000${book?.image}`}
                alt={book.title}
                fluid
                className="rounded mb-4"
              />
              <Rating value={book.rating} text={`${book.numReviews} Reviews`} />
              <hr />
              <p>
                <strong>Description:</strong> {book.description}
              </p>
            </Col>
            <Col md={1} className="d-none d-sm-block">
              {" "}
            </Col>
            <Col md={5} className="mt-4">
              <h2 className="book-title">
                {" "}
                <strong></strong>Title:{book.title}
              </h2>

              <hr />
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Genre:</strong> {book.genre?.name}
              </p>
              <p>
                <strong>Published Year:</strong> {book.publishedYear}
              </p>
              <p>
                <strong>Number of Pages:</strong> {book.numPages}
              </p>
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
              <p>
                <strong>Price:</strong> ${book.price}
              </p>
              <div style={{ display: "inline" }}>
                <p>
                  <strong>Qty: </strong>
                </p>
                <div style={{ width: "150px", marginBottom: "5px" }}>
                  <Row>
                    <Col>
                      <button
                        onClick={() =>
                          qty > 1 ? setQty((qty) => qty - 1) : setQty(1)
                        }
                      >
                        -
                      </button>
                    </Col>
                    <Col>{qty}</Col>
                    <Col>
                      <button
                        onClick={() =>
                          qty < book.stock
                            ? setQty((qty) => qty + 1)
                            : setQty(book.stock)
                        }
                      >
                        +
                      </button>
                    </Col>
                  </Row>
                </div>
              </div>
              <Button
                className="btn-block"
                type="button"
                disabled={book.stock === 0}
                variant="light"
                onClick={AddToCarthandler}
              >
                Add To Cart
              </Button>
            </Col>
          </Row>
          <Row className="review">
            <Col md={{ span: 6, offset: 3 }}>
              <h2>Reviews</h2>
              {book.reviews.length === 0 && <p>No Reviews</p>}
              <ListGroup variant="flush">
                {book.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingReview && <p>Loading...</p>}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="my-2" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="my-2" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <p>
                      Please <Link to="/login">sign in</Link> to write a review
                    </p>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default SingleBookScreen;
