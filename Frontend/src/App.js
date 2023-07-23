import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Intro />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Intro" element={<Intro />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="*" element={<h1>error no page found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
