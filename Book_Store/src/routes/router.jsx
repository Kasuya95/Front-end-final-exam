import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";

// Books
import Books from "../pages/books/books";
import AddBook from "../pages/books/AddBook";
import UpdateBook from "../pages/books/UpdateBook";

// Journals
import Journals from "../pages/journals/journals";
import AddJournal from "../pages/journals/Addjournal";
import UpdateJournal from "../pages/journals/updatejournal";

// Comics
import Comics from "../pages/comics/comics";
import AddComic from "../pages/comics/addcomic";
import UpdateComic from "../pages/comics/updatecomic";

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
