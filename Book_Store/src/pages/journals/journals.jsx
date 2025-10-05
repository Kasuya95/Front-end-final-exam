import React, { useEffect, useState } from "react";
import JournalService from "../../services/journals.service"; 
import Swal from "sweetalert2";
import JournalCard from "../../components/JournalCard";
import { useNavigate } from "react-router";

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  // Fetch all journals
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await JournalService.getAllJournals();
        console.log("API response:", response.data);
        // ตรวจสอบว่า data เป็น array หรือ nested ใน data
        setJournals(Array.isArray(response.data) ? response.data : response.data.data || []);
      } catch (error) {
        Swal.fire({
          title: "Get All Journals",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    fetchJournals();
  }, []);

  // ฟังก์ชันสำหรับอัปเดต state หลังลบ journal
  const handleDeleteJournal = (deletedId) => {
    setJournals((prevJournals) =>
      prevJournals.filter((j) => j.itemId !== deletedId)
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">รายการนิตยาสารทั้งหมด</h1>
        <button
          onClick={() => navigate("/addjournal")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          เพิ่มนิตยาสาร
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {journals.length > 0 ? (
          journals.map((journal) => (
            <JournalCard
              key={journal.itemId}
              journal={journal}
              onDelete={handleDeleteJournal} 
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            ไม่มีนิตยาสารในระบบ
          </p>
        )}
      </div>
    </div>
  );
};

export default Journals;
