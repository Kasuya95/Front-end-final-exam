import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import ComicService from "../../services/comics.service";

const UpdateComic = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [comic, setComic] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    status: "",
    coverImage: "",
    description: "",
    location: "",
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
  });

  // Fetch ข้อมูลเดิม
useEffect(() => {
  if (!itemId) return;

  const fetchComic = async () => {
    try {
      const res = await ComicService.getComicByID(itemId);
      console.log("Fetched comic data:", res.data.data); // <-- เอา data เท่านั้น
      setComic(res.data.data); // <-- ใช้ data แทนไม่ใช่ res.data
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || err.message, "error");
    }
  };

  fetchComic();
}, [itemId]);


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setComic((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await ComicService.updateComic(itemId, comic);
      if (res.status === 200) {
        Swal.fire("Success", "Comic updated successfully!", "success").then(() =>
          navigate("/comics")
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
    { label: "Status", name: "status", type: "text" },
    { label: "Cover Image (URL)", name: "coverImage", type: "text" },
    { label: "Description", name: "description", type: "text" },
    { label: "Location", name: "location", type: "text" },
    { label: "Series", name: "series", type: "text" },
    { label: "Volume Number", name: "volumeNumber", type: "number" },
    { label: "Illustrator", name: "illustrator", type: "text" },
    { label: "Color Type", name: "colorType", type: "text" },
    { label: "Target Age", name: "targetAge", type: "text" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-indigo-50 py-12 px-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Edit Comic
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
                value={comic[field.name] || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition duration-150"
              />
            </div>
          ))}
        </form>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/comics")}
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

export default UpdateComic;
