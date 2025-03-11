import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import FlightPage from "./pages/FlightPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "flight", element: <FlightPage /> },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;