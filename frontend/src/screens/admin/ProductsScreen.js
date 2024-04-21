import React from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
  useCreateBookMutation,
} from "../../slices/booksApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
function ProductsScreen() {
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;
  const {
    data: books,
    refetch,
    isLoading,
    isError: error,
  } = useGetBooksQuery();

  const [deleteBook, { isLoading: loadingDelete }] = useDeleteBookMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteBook(id);
        refetch();
      } catch (err) {
        window.alert(err?.data?.message || err.error);
      }
    }
  };

  const [createBook, { isLoading: loadingCreate }] = useCreateBookMutation();

  const createBookHandler = async () => {
    if (window.confirm("Are you sure you want to create a new book?")) {
      try {
        await createBook(userInfo._id);
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
        <h2 className="text-center my-4">All Books</h2>
        {loadingCreate && <p>Loading...</p>}
        <div className="d-flex justify-content-end ">
          <Button onClick={createBookHandler}>ADD NEW BOOK</Button>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>BOOK ID</th>
                <th>TITLE</th>
                <th>ADDED ON</th>
                <th>AMOUNT</th>
                <th>AUTHOR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book._id}</td>
                  <td>{book.title}</td>
                  <td>{book.createdAt.substring(0, 10)}</td>
                  <td>${book.price}</td>
                  <td>{book.author}</td>

                  <td>
                    <>
                      <LinkContainer to={`/book/${book._id}`}>
                        <Button className="btn-sm mx-1" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                      <LinkContainer to={`/books/${book._id}/edit`}>
                        <Button variant="warning" className="mx-2">
                          Edit
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(book._id)}
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

export default ProductsScreen;
