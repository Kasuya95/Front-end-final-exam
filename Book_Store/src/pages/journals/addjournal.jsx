import React, { useState } from "react";
import { useNavigate } from "react-router";
import JournalService from "../../services/journals.service";
import Swal from "sweetalert2";

const AddJournal = () => {
  const navigate = useNavigate();

  const [journal, setJournal] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "",
    publisher: "",
    description: "",
    coverImage: "",
    location: "",
  });

  // handle input
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setJournal((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  // submit
  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...journal,
        itemType: "Journal", // บอกว่าเป็น Journal
        status: "AVAILABLE", // ค่า default
        addedDate: new Date().toISOString(), // ต้องมีตาม UML
      };

      // ลบค่า "" หรือ undefined
      const cleanedData = Object.fromEntries(
        Object.entries(dataToSend).filter(([_, v]) => v !== "" && v !== undefined)
      );

      console.log("📦 Sending journal data:", cleanedData);

      const res = await JournalService.addJournal(cleanedData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Journal added successfully!",
          icon: "success",
          confirmButtonColor: "#6366f1",
        }).then(() => navigate("/journals"));
      }
    } catch (err) {
      console.error("🔥 Error response:", err.response?.data || err.message);
      Swal.fire({
        title: "Error",
        text: err?.response?.data?.message || "Failed to add journal",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const fields = [
    { label: "Title", name: "title", type: "text", placeholder: "Nature Scientific Journal" },
    { label: "Author", name: "author", type: "text", placeholder: "Various Authors" },
    { label: "Category", name: "category", type: "text", placeholder: "Science" },
    { label: "Publish Year", name: "publishYear", type: "number", placeholder: "2023" },
    { label: "ISSN", name: "issn", type: "text", placeholder: "1234-5678" },
    { label: "Volume", name: "volume", type: "text", placeholder: "Vol. 15" },
    { label: "Issue", name: "issue", type: "text", placeholder: "Issue 3" },
    { label: "Publication Frequency", name: "publicationFrequency", type: "text", placeholder: "MONTHLY" },
    { label: "Publisher", name: "publisher", type: "text", placeholder: "Academic Press" },
    { label: "Description", name: "description", type: "text", placeholder: "A peer-reviewed scientific journal" },
    { label: "Cover Image (URL)", name: "coverImage", type: "text", placeholder: "Paste cover image URL" },
    { label: "Location", name: "location", type: "text", placeholder: "Library location" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-white px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-2xl border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">Add New Journal</h2>
          <p className="text-gray-500 text-sm mt-1">เพิ่มวารสาร</p>
        </div>

        <form className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={journal[field.name]}
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
            + Add Journal
          </button>
        </form>

        {journal.coverImage && (
          <div className="mt-8 text-center">
            <h3 className="text-sm text-gray-600 mb-2">Cover Preview</h3>
            <div className="w-40 h-56 mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <img
                src={journal.coverImage}
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

export default AddJournal;
