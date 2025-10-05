import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import BooksService from "../../services/books.service";

const UpdateBook = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
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

useEffect(() => {
  if (!itemId) return;

  const fetchBook = async () => {
    try {
      const res = await BooksService.getBookByID(itemId);
      console.log("Fetched book data:", res.data);
      // ถ้า API ส่ง { data: {...} } ให้ใช้ res.data.data
      setBook(res.data.data || res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      Swal.fire("Error", err?.response?.data?.message || err.message, "error");
    }
  };

  fetchBook();
}, [itemId]);



  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await BooksService.updateBooks(itemId,book);
      if (res.status === 200) {
        Swal.fire("Success", "Book updated successfully!", "success").then(() =>
          navigate("/")
        );
      }
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || err.message, "error");
    }
  };

  const fields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Author", name: "author", type: "text" },
    { label: "Category", name: "category", type: "text" },
    { label: "Publish Year", name: "publishYear", type: "number" },
    { label: "ISBN", name: "isbn", type: "text" },
    { label: "Publisher", name: "publisher", type: "text" },
    { label: "Edition", name: "edition", type: "text" },
    { label: "Page Count", name: "pageCount", type: "number" },
    { label: "Language", name: "language", type: "text" },
    { label: "Genre", name: "genre", type: "text" },
    { label: "Description", name: "description", type: "text" },
    { label: "Cover Image (URL)", name: "coverImage", type: "text" },
    { label: "Location", name: "location", type: "text" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-indigo-50 py-12 px-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Edit Book
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={book[field.name] || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition duration-150"
              />
            </div>
          ))}
        </form>

        {/* Preview รูปปก */}
        {book.coverImage && (
          <div className="mt-6 text-center">
            <h3 className="text-sm text-gray-600 mb-2">Cover Preview</h3>
            <div className="w-40 h-56 mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <img
                src={book.coverImage}
                alt="Cover Preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
