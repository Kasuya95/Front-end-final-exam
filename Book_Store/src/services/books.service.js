import api from "./api"
const Book_API = import.meta.env.VITE_Book_API;


//get all restaurant
const getAllBooks = async () =>{
    return await api.get(Book_API)
    
}
//get restaurant by Id
const getBooksByID = async (id) => {
  return await api.get(Book_API +"/"+ id);
};
//update restaurant by Id
const updateBooks = async (id,books) => {
  return await api.put(Book_API +"/"+ id,books);
};
//add restaurant
const addBooks = async (books) => {
  return await api.post(Book_API, books);
};
//delete restaurant
const deleteBooks = async (id) => {
  return await api.delete(Book_API + "/" + id);
};

const BooksService ={
    getAllBooks,
    getBooksByID,
    updateBooks,
    addBooks,
    deleteBooks
}
export default BooksService