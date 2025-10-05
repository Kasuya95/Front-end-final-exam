import React, { useEffect, useState } from "react";
import BooksService from "../../services/books.service";
import Swal from "sweetalert2";
import BookCard from "../../components/BookCard";
import { useNavigate } from "react-router";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await BooksService.getAllBooks();
        console.log("API response:", response.data);
        setBooks(Array.isArray(response.data) ? response.data : response.data.data || []);
      } catch (error) {
        Swal.fire({
          title: "Get All Books",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    fetchBooks();
  }, []);

  // ฟังก์ชันสำหรับอัปเดต state หลังลบหนังสือ
  const handleDeleteBook = (deletedId) => {
    setBooks((prevBooks) => prevBooks.filter((b) => b.itemId !== deletedId));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">รายการหนังสือทั้งหมด</h1>
        <button
          onClick={() => navigate("/addbook")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Book
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.itemId}
              book={book}
              onDelete={handleDeleteBook} // ส่ง prop onDelete
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            ไม่มีหนังสือในระบบ
          </p>
        )}
      </div>
    </div>
  );
};

export default Books;
