import { useState, useEffect } from "react";
import BooksService from "../../services/books.service";
import Swal from "sweetalert2";
import BookCard from "../../components/BookCard";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BooksService.getAllBooks([]);

        if (response.status === 200) {
          setBooks(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Books",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    fetchData();
  }, []);
  console.log(books.data);

  return (
    <div>
      <a className="btn btn-active btn-info" href="addbook">ADD Book</a>
      {books?.data?.map((book) => (
        <BookCard key={book.itemId} book={book} />
      ))}
    </div>
  );
};

export default Books;