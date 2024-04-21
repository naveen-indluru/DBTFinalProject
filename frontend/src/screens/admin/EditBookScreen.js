import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import {
  useGetBookByIDQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useGetGenresQuery,
} from "../../slices/booksApiSlice";
import { toast } from "react-toastify";

function EditBookScreen() {
  const { id: bookId } = useParams();

  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [numPages, setNumPages] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const { data: book, isLoading, refetch, error } = useGetBookByIDQuery(bookId);
  const { data: genres, isLoading: loadingGenre } = useGetGenresQuery();
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        bookId,
        title,
        isbn,
        numPages,
        stock,
        author,
        price,
        publishedYear,
        description,
        publisher,
        image,
        genre,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Product updated");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setPrice(book.price);
      setImage(book.image);
      setAuthor(book.author);
      setGenre(book.genre);
      setStock(book.stock);
      setDescription(book.description);
      setPublishedYear(book.publishedYear);
      setPublisher(book.publisher);
      setIsbn(book.isbn);
      setNumPages(book.numPages);
    }
  }, [book]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/books" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {/* {loadingUpdate && <Loader />} */}
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error.data.message}</p>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price1">
              <Form.Label>Number Of Pages</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of Pages"
                value={numPages}
                onChange={(e) => setNumPages(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label="Choose File"
                onChange={uploadFileHandler}
                type="file"
              ></Form.Control>
              {loadingUpload && <p>Loading...</p>}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand1">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand2">
              <Form.Label>Published Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Published Year"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand3">
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Control
                        as="select"
                        value={genre}
                        onChange={(e) =>
                          setGenre(e.target.value))
                        }
                      >
                        
                      </Form.Control> */}
            {loadingGenre ? (
              <p>Loading...</p>
            ) : (
              <Form.Group controlId="category">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="select genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  {genres?.map((x) => (
                    <option key={x._id} value={x._id}>
                      {x.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default EditBookScreen;
