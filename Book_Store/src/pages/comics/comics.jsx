import React, { useEffect, useState } from "react";
import ComicService from "../../services/comics.service";
import Swal from "sweetalert2";
import ComicCard from "../../components/ComicCard";
import { useNavigate } from "react-router";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const res = await ComicService.getAllComics();
        setComics(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (err) {
        Swal.fire("Error", err?.response?.data?.message || err.message, "error");
      }
    };
    fetchComics();
  }, []);

  const handleDeleteComic = (deletedId) => {
    setComics((prev) => prev.filter((c) => c.itemId !== deletedId));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">รายการ Comic ทั้งหมด</h1>
        <button
          onClick={() => navigate("/addcomic")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          + เพิ่ม Comic
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {comics.length > 0 ? (
          comics.map((comic) => (
            <ComicCard key={comic.itemId} comic={comic} onDelete={handleDeleteComic} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            ไม่มี Comic ในระบบ
          </p>
        )}
      </div>
    </div>
  );
};

export default Comics;
