import React from "react";
import Swal from "sweetalert2";
import ComicService from "../services/comics.service"; // service ของ comic
import { useNavigate } from "react-router";

const ComicCard = ({ comic, onDelete }) => {
  const navigate = useNavigate();

  if (!comic) return null;

  const handleDelete = async (itemId) => {
    try {
      const res = await ComicService.deleteComic(itemId);
      if (res.status === 200) {
        Swal.fire("Deleted", "Comic deleted successfully!", "success");
        if (onDelete) onDelete(itemId); // อัปเดต parent state
      }
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || err.message, "error");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updatecomic/${id}`);
  };

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white">
      {comic.coverImage && (
        <img
          className="w-full h-64 object-cover"
          src={comic.coverImage}
          alt={`Cover of ${comic.title}`}
        />
      )}
      <div className="px-4 py-2">
        <h2 className="font-bold text-xl mb-2">{comic.title}</h2>
        <p className="text-gray-700 text-base mb-2">{comic.description}</p>
        <div className="text-sm text-gray-600 mb-1"><strong>หมวดหมู่:</strong> {comic.category}</div>
        <div className="text-sm text-gray-600 mb-1"><strong>เผยแพร่:</strong> {comic.publishYear}</div>
        <div className="text-sm text-gray-600 mb-1"><strong>ผู้เขียน:</strong> {comic.author}</div>
        <div className="text-sm text-gray-600 mb-1"><strong>สถานะ:</strong> {comic.status}</div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
            onClick={() => handleUpdate(comic.itemId)}
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
            onClick={() => handleDelete(comic.itemId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
