import api from "./api"
const Book_API = import.meta.env.VITE_Book_API;


//get all restaurant
const getAllBooks = async () =>{
    return await api.get(Book_API)
    
}
//get restaurant by Id
const getBookByID = async (itemId) => {
  return await api.get(Book_API +"/"+ itemId);
};
//update restaurant by Id
const updateBooks = async (itemId,book) => {
  return await api.put(Book_API +"/"+ itemId,book);
};
//add restaurant
const addBooks = async (books) => {
  return await api.post(Book_API, books);
};
//delete restaurant
const deleteBook = async (itemId) => {
  return await api.delete(Book_API + "/" + itemId);
};

const BooksService ={
    getAllBooks,
    getBookByID,
    updateBooks,
    addBooks,
    deleteBook
}
export default BooksService