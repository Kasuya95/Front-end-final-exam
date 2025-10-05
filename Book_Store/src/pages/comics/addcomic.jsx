import React, { useState } from "react";
import { useNavigate } from "react-router";
import ComicService from "../../services/comics.service";
import Swal from "sweetalert2";

const AddComic = () => {
  const navigate = useNavigate();

  const [comic, setComic] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
    description: "",
    coverImage: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setComic((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await ComicService.addComic(comic);
      if (res.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Comic added successfully!",
          icon: "success",
          confirmButtonColor: "#6366f1",
        }).then(() => navigate("/comics"));
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
    { label: "Title", name: "title", type: "text", placeholder: "Enter comic title" },
    { label: "Author", name: "author", type: "text", placeholder: "Enter author's name" },
    { label: "Category", name: "category", type: "text", placeholder: "Superhero, Fantasy, etc." },
    { label: "Publish Year", name: "publishYear", type: "number", placeholder: "e.g. 1962" },
    { label: "ISBN", name: "isbn", type: "text", placeholder: "Enter ISBN number" },
    { label: "Series", name: "series", type: "text", placeholder: "Spider-Man, Batman, etc." },
    { label: "Volume Number", name: "volumeNumber", type: "number", placeholder: "e.g. 1" },
    { label: "Illustrator", name: "illustrator", type: "text", placeholder: "Enter illustrator name" },
    { label: "Color Type", name: "colorType", type: "text", placeholder: "FULL_COLOR or BLACK_AND_WHITE" },
    { label: "Target Age", name: "targetAge", type: "text", placeholder: "TEEN, ADULT, etc." },
    { label: "Description", name: "description", type: "text", placeholder: "Short description of the comic" },
    { label: "Cover Image (URL)", name: "coverImage", type: "text", placeholder: "Paste image URL here" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-white px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-2xl border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">Add New Comic</h2>
          <p className="text-gray-500 text-sm mt-1">เพิ่มคอมมิค</p>
        </div>

        <form className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={comic[field.name]}
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
            + Add Comic
          </button>
        </form>

        {comic.coverImage && (
          <div className="mt-8 text-center">
            <h3 className="text-sm text-gray-600 mb-2">Cover Preview</h3>
            <div className="w-40 h-56 mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <img
                src={comic.coverImage}
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

export default AddComic;
