import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";

// Books
import Books from "../pages/books/Books";
import AddBook from "../pages/books/Addbook";
import UpdateBook from "../pages/books/Updatebook";

// Journals
import Journals from "../pages/journals/Journals";
import AddJournal from "../pages/journals/AddJournal";
import UpdateJournal from "../pages/journals/Updatejournal";

// Comics
import Comics from "../pages/comics/Comics";
import AddComic from "../pages/comics/Addcomic";
import UpdateComic from "../pages/comics/Updatecomic";

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
