import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import "./App.css";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<MainLayout />}></Route>)
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
