import { Row, Col } from "react-bootstrap";
import Book from "../components/Book";
import { useGetBooksQuery } from "../slices/booksApiSlice";
const HomeScreen = () => {
  const { data: books, isLoading, isError: error } = useGetBooksQuery();
  return (
    <>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : error ? (
        <div>{error?.data?.message || error?.error}</div>
      ) : (
        <>
          <h1 className="pb-2">Latest Collection</h1>
          <Row>
            {books.map((book) => (
              <Col key={book._id} xs={12} md={6} lg={4} className="mb-4">
                <Book book={book} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
