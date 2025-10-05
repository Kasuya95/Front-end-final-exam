import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";

// Books
import Books from "../pages/books/Books.jsx";
import AddBook from "../pages/books/AddBook.jsx";
import UpdateBook from "../pages/books/UpdateBook.jsx";

// Journals
import Journals from "../pages/journals/Journal.jsx";
import AddJournal from "../pages/journals/AddJournal.jsx";
import UpdateJournal from "../pages/journals/UpdateJournal.jsx";

// Comics
import Comics from "../pages/comics/Comics.jsx";
import AddComic from "../pages/comics/AddComic.jsx";
import UpdateComic from "../pages/comics/UpdateComic.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // Books
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/addbook",
    element: <AddBook />,
  },
  {
    path: "/updatebook/:itemId",
    element: <UpdateBook />,
  },
  // Journals
  {
    path: "/journals",
    element: <Journals />,
  },
  {
    path: "/addjournal",
    element: <AddJournal />,
  },
  {
    path: "/updatejournal/:itemId",
    element: <UpdateJournal />,
  },
  // Comics
  {
    path: "/comics",
    element: <Comics />,
  },
  {
    path: "/addcomic",
    element: <AddComic />,
  },
  {
    path: "/updatecomic/:itemId",
    element: <UpdateComic />,
  },
]);

export default router;
