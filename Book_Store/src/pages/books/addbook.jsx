import React, { useState } from "react";
import { useNavigate } from "react-router";
import BooksService from "../../services/books.service";
import Swal from "sweetalert2";

const AddBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    publisher: "",
    edition: "",
    pageCount: "",
    language: "",
    genre: "",
    description: "",
    coverImage: "",
    location: "",
    
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setBooks((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await BooksService.addBooks(books);
      if (res.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Book added successfully!",
          icon: "success",
          confirmButtonColor: "#6366f1",
        }).then(() => navigate("/"));
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err?.response?.data?.message || err.message,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const fields = [
    { label: "Title", name: "title", type: "text", placeholder: "Enter book title" },
    { label: "Author", name: "author", type: "text", placeholder: "Enter author's name" },
    { label: "Category", name: "category", type: "text", placeholder: "Fiction, Non-fiction, etc." },
    { label: "Publish Year", name: "publishYear", type: "number", placeholder: "e.g. 2025" },
    { label: "ISBN", name: "isbn", type: "text", placeholder: "Enter ISBN number" },
    { label: "Publisher", name: "publisher", type: "text", placeholder: "Publisher name" },
    { label: "Edition", name: "edition", type: "text", placeholder: "e.g. First Edition" },
    { label: "Page Count", name: "pageCount", type: "number", placeholder: "Number of pages" },
    { label: "Language", name: "language", type: "text", placeholder: "English, Thai, etc." },
    { label: "Genre", name: "genre", type: "text", placeholder: "Fiction, Science, etc." },
    { label: "Description", name: "description", type: "text", placeholder: "Short description of the book" },
    { label: "Cover Image (URL)", name: "coverImage", type: "text", placeholder: "Paste image URL here" },
    { label: "Location", name: "location", type: "text", placeholder: "e.g. A1-B2-C3" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-white px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-2xl border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">Add New Book</h2>
          <p className="text-gray-500 text-sm mt-1">เพิ่มหนังสือ</p>
        </div>

        <form className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={books[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 mt-4 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
          >
            + Add Book
          </button>
        </form>

        {books.coverImage && (
          <div className="mt-8 text-center">
            <h3 className="text-sm text-gray-600 mb-2">Cover Preview</h3>
            <div className="w-40 h-56 mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <img
                src={books.coverImage}
                alt="Cover Preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBooks;
