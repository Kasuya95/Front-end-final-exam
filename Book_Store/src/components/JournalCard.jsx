import React from "react";
import Swal from "sweetalert2";
import JournalService from"../services/journals.service"
import { useNavigate } from "react-router";

const JournalCard = ({ journal, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (itemId) => {
    try {
      const res = await JournalService.deleteJournal(itemId); // ถ้า journal ใช้ service ใหม่ แก้ method ด้วย
      if (res.status === 200) {
        Swal.fire("Deleted", "Journal deleted successfully!", "success");
        onDelete(itemId); // อัปเดต parent state
      }
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || err.message, "error");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updatejournal/${id}`); // เปลี่ยน route เป็น journal
  };

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white">
      {journal.coverImage && (
        <img
          className="w-full h-64 object-cover"
          src={journal.coverImage}
          alt={`Cover of ${journal.title}`}
        />
      )}
      <div className="px-4 py-2">
        <h2 className="font-bold text-xl mb-2">{journal.title}</h2>
        <p className="text-gray-700 text-base mb-2">{journal.description}</p>
        <div className="text-sm text-gray-600 mb-1"><strong>หมวดหมู่:</strong> {journal.category}</div>
        <div className="text-sm text-gray-600 mb-1"><strong>เผยแพร่:</strong> {journal.publishYear}</div>
        <div className="text-sm text-gray-600 mb-1"><strong>ผู้เขียน:</strong> {journal.author}</div>
        <div className="text-sm text-gray-600 mb-1"><strong>สถานะ:</strong> {journal.status}</div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
            onClick={() => handleUpdate(journal.itemId)}
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
            onClick={() => handleDelete(journal.itemId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
