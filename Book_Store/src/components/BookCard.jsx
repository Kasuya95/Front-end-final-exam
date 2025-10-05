import React from "react";
import Swal from "sweetalert2";
import BooksService from "../services/books.service";
import { useNavigate } from "react-router";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (itemId) => {
    try {
      const res = await BooksService.deleteBook(itemId);
      if (res.status === 200) {
        Swal.fire("Deleted", "Book deleted successfully!", "success");
        onDelete(itemId); // อัปเดต parent state
      }
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || err.message, "error");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updatebook/${id}`);
  };

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white">
      {book.coverImage && (
        <img
          className="w-full h-64 object-cover"
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
        />
      )}
      <div className="px-4 py-2">
        <h2 className="font-bold text-xl mb-2">{book.title}</h2>
        <p className="text-gray-700 text-base mb-2">{book.description}</p>
        <div className="text-sm text-gray-600 mb-1"><strong>หมวดหมู่:</strong> {book.category}</div>
        <div className="text-sm text-gray-600 mb-1"><strong>เผยแพร่:</strong> {book.publishYear}</div>
        <div className="text-sm text-gray-600 mb-1"><strong>ผู้เขียน:</strong> {book.author}</div>
        <div className="text-sm text-gray-600 mb-1"><strong>สถานะ:</strong> {book.status}</div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
            onClick={() => handleUpdate(book.itemId)}
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
            onClick={() => handleDelete(book.itemId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
