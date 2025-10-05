import api from "./api"
const Comic_API = import.meta.env.VITE_Comic_API;


//get all restaurant
const getAllComics = async () =>{
    return await api.get(Comic_API)
    
}
//get restaurant by Id
const getComicByID = async (itemId) => {
  return await api.get(Comic_API +"/"+ itemId);
};
//update restaurant by Id
const updateComic = async (itemId,comic) => {
  return await api.put(Comic_API +"/"+ itemId,comic);
};
//add restaurant
const addComic = async (comics) => {
  return await api.post(Comic_API, comics);
};
//delete restaurant
const deleteComic = async (itemId) => {
  return await api.delete(Comic_API + "/" + itemId);
};

const ComicService ={
    getAllComics,
    getComicByID,
    updateComic,
    addComic,
    deleteComic
}
export default ComicService