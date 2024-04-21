import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
function Book({ book }) {
  return (
    <Card>
      <Link to={`/book/${book._id}`}>
        <Card.Img
          variant="top"
          src={`http://localhost:5000${book?.image}`}
          alt={book.title}
        />
      </Link>
      <Card.Body>
        <Link to={`/book/${book._id}`}>
          <Card.Title as="div">
            <strong>{book.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={book.rating} text={`${book.numReviews} Reviews`} />
        </Card.Text>
        <Card.Text>
          By: <strong>{book.author}</strong>
        </Card.Text>
        <Card.Text>
          Price: <strong>${book.price.toFixed(2)}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Book;
