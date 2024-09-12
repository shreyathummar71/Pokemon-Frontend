import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import "./App.css";
import Homepage from "./components/Homepage";
import AllPokemon from "./components/AllPokemon";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<AllPokemon />} />
        <Route path="/" element={<Homepage />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
