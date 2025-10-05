import api from "./api"
const Journal_API = import.meta.env.VITE_Journal_API;


//get all restaurant
const getAllJournals = async () =>{
    return await api.get(Journal_API)
    
}
//get restaurant by Id
const getJournalByID = async (itemId) => {
  return await api.get(Journal_API +"/"+ itemId);
};
//update restaurant by Id
const updateJournal = async (itemId,journal) => {
  return await api.put(Journal_API +"/"+ itemId,journal);
};
//add restaurant
const addJournal = async (journals) => {
  return await api.post(Journal_API, journals);
};
//delete restaurant
const deleteJournal = async (itemId) => {
  return await api.delete(Journal_API + "/" + itemId);
};

const JournalService ={
    getAllJournals,
    getJournalByID,
    updateJournal,
    addJournal,
    deleteJournal
}
export default JournalService