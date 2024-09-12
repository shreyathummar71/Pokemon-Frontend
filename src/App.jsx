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
import LeaderBoard from "./components/LeaderBoard";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<MainLayout />}>
          <Route index element={<AllPokemon />} />
          <Route path="/home/leaderboard" element={<LeaderBoard />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
