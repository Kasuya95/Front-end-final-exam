import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import BooksService from '../../services/books.service'
import Swal  from 'sweetalert2'
 const Addbook = () => {
    const navigate = useNavigate();
    const formatDate = (ts) =>
    ts ? new Date(Number(ts)).toISOString().split("T")[0] : "";
  const toTimestamp = (dateStr) => new Date(dateStr).getTime();
    const [books, setBooks] =useState({
        title: "",
            author: "",
            category: "",
            publishYear: "",
            isbn: "",
            status: "",
            coverImage: "",
            description: "",
            location: "",
            addedDate: "",
            itemType: "",
            publisher: "",
            edition: "",
            pageCount: "",
            language: "",
            genre: "",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            deletedAt: null
    })
    const handleChange = (e) => {
        const {name , value}= e.target
        setBooks((prev) => ({...prev,[name]:value}))
    };
      const handleSubmit = async () => {
    try {
      const newbook = await BooksService.addBooks(books);
      console.log(newbook);
      if (newbook.status === 200) {
        Swal.fire({
          title: "Add new book",
          text: "Add new book successfully!",
          icon: "success",
        }).then(() => {
          setBooks({
           title: "",
            author: "",
            category: "",
            publishYear: "",
            isbn: "",
            status: "",
            coverImage: "",
            description: "",
            location: "",
            addedDate: "",
            itemType: "",
            publisher: "",
            edition: "",
            pageCount: "",
            language: "",
            genre: "",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            deletedAt: null
          });
          navigate("/");
        });
      }
      //   ถ้า error จะมาที่รนี้เลย
    } catch (error) {
      Swal.fire({
        title: "Add new book",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };
  return (
    <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              onChange={handleChange}
              value={books.title}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              onChange={handleChange}
              value={books.author}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

            <div>
            Category
            <input
              id="type"
              name="type"
              type="text"
              required
              onChange={handleChange}
              value={books.category}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            
            <input
              id="type"
              name="type"
              type="text"
              required
              onChange={handleChange}
              value={books.type}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="school"
              className="block text-sm font-medium text-gray-700"
            >
              level
            </label>
            <input
              id="level"
              name="level"
              type="text"
              required
              onChange={handleChange}
              value={books.level}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              team_size
            </label>
            <input
              id="team_size"
              name="team_size"
              type="number"
              required
              onChange={handleChange}
              value={books.team_size}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              onChange={(e) =>
                setActivity((prev) => ({
                  ...prev,
                  date: toTimestamp(e.target.value),
                }))
              }
              value={formatDate(books.date)}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              onChange={handleChange}
              value={books.location}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              reg_open
            </label>
            <input
              id="reg_open"
              name="reg_open"
              type="date"
              required
              onChange={(e) =>
                setActivity((prev) => ({
                  ...prev,
                  reg_open: toTimestamp(e.target.value),
                }))
              }
              value={formatDate(books.reg_open)}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              reg_close
            </label>
            <input
              id="reg_close"
              name="reg_close"
              type="date"
              required
              onChange={(e) =>
                setActivity((prev) => ({
                  ...prev,
                  reg_close: toTimestamp(e.target.value),
                }))
              }
              value={formatDate(books.reg_close)}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              contact_name
            </label>
            <input
              id="contact_name"
              name="contact_name"
              type="text"
              required
              onChange={handleChange}
              value={books.contact_name}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              contact_phone
            </label>
            <input
              id="contact_phone"
              name="contact_phone"
              type="text"
              required
              onChange={handleChange}
              value={books.contact_phone}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              contact_email
            </label>
            <input
              id="contact_email"
              name="contact_email"
              type="text"
              required
              onChange={handleChange}
              value={books.contact_email}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              status
            </label>
            <input
              id="status"
              name="status"
              type="text"
              required
              onChange={handleChange}
              value={books.status}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>

  )
}

export default Addbook