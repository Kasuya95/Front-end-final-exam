import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";

// Books
import Books from "../pages/Books/Books.jsx";
import AddBook from "../pages/Books/AddBook.jsx";
import UpdateBook from "../pages/Books/UpdateBook.jsx";

// Journals
import Journals from "../pages/Journals/Journal.js";
import AddJournal from "../pages/Journals/AddJournal.jsx";
import UpdateJournal from "../pages/Journals/UpdateJournal.jsx";

// Comics
import Comics from "../pages/Comics/Comics.jsx";
import AddComic from "../pages/Comics/AddComic.jsx";
import UpdateComic from "../pages/Comics/UpdateComic.jsx";

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
