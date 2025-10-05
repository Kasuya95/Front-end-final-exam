import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import JournalService from "../../services/journals.service";

const UpdateJournal = () => {
  const { itemId } = useParams();
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
    isbn: "",
    publisher: "",
    description: "",
    coverImage: "",
    status: "AVAILABLE",
    location: "",
    addedDate: "", 
  });

  // Fetch journal by ID
  useEffect(() => {
    if (!itemId) return;

    const fetchJournal = async () => {
      try {
        const res = await JournalService.getJournalByID(itemId);
        console.log("Fetched journal:", res.data);
        setJournal(res.data.data);
      } catch (err) {
        Swal.fire(
          "Error",
          err?.response?.data?.message || err.message,
          "error"
        );
      }
    };

    fetchJournal();
  }, [itemId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setJournal((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...journal,
        itemType: "Journal", //  บอกว่าเป็น Journal
      };

      // ลบค่าที่ว่างออก
      Object.keys(dataToSend).forEach(
        (key) =>
          (dataToSend[key] === "" || dataToSend[key] === undefined) &&
          delete dataToSend[key]
      );

      console.log("📦 Updating journal:", dataToSend);

      const res = await JournalService.updateJournal(itemId, dataToSend);

      if (res.status === 200) {
        Swal.fire("Success", "Journal updated successfully!", "success").then(
          () => navigate("/journals")
        );
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || err.message,
        "error"
      );
    }
  };

  const fields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Author", name: "author", type: "text" },
    { label: "Category", name: "category", type: "text" },
    { label: "Publish Year", name: "publishYear", type: "number" },
    { label: "ISSN", name: "issn", type: "text" },
    { label: "Volume", name: "volume", type: "text" },
    { label: "Issue", name: "issue", type: "text" },
    { label: "Publication Frequency", name: "publicationFrequency", type: "text" },
    { label: "ISBN", name: "isbn", type: "text" }, // ✅ เพิ่ม
    { label: "Publisher", name: "publisher", type: "text" },
    { label: "Description", name: "description", type: "text" },
    { label: "Cover Image (URL)", name: "coverImage", type: "text" },
    { label: "Location", name: "location", type: "text" },
    {
      label: "Status",
      name: "status",
      type: "select", // ใช้ select
      options: ["AVAILABLE", "UNAVAILABLE"],
    },
    
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-indigo-50 py-12 px-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Edit Journal
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={journal[field.name] || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={journal[field.name] || ""}
                  onChange={handleChange}
                  disabled={field.name === "addedDate"} // ไม่ให้แก้ addedDate
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
                />
              )}
            </div>
          ))}
        </form>

        {journal.coverImage && (
          <div className="mt-6 text-center">
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

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/journals")}
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

export default UpdateJournal;
