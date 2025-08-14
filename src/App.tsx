import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Edutime from "./pages/Edutime";
import Regist from "./pages/Regist";
import Submission from "./pages/Submission";

function App() {
  return (
    <div>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/edutime" element={<Edutime />} />
          <Route path="/register" element={<Regist />} />
          <Route path="/submission" element={<Submission />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
