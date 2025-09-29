import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import  Books  from "../pages/books/books";
import Journals from "../pages/journals/journals";
import Comics from "../pages/comics/comics";
import updatebook from "../pages/books/updatebook";
import Addbook from "../pages/books/Addbook";
const router = createBrowserRouter([
    {
        path:"/",
        element:<Home />
    },
    {
        path:"/books",
        element:<Books />
    },
    {
        path:"/journals",
        element:<Journals />
    },
    {
        path:"/comics",
        element:<Comics />
    },
    {
        path:"/updatebook",
        element:<updatebook />
    },
    {
        path:"/addbook",
        element:<Addbook />
    }
])

export default router;