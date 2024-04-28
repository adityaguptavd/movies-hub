import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/Home";
import Layout from "./screens/Layout";
import MovieView from "./screens/MovieView";

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/movies-hub" />} />
        <Route path="/movies-hub" element={<Home />} />
        <Route path="/movies-hub/movie/:id" element={<MovieView />} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App;