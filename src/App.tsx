import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Edutime from "./pages/Edutime";
import Regist from "./pages/Regist";
import Submission from "./pages/Submission";
import Competition from "./pages/Competition";
import { useState } from "react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div
      style={{
          fontFamily: 'Orbitron',
          fontWeight: 400,
          background:
            'linear-gradient(90deg, rgba(30, 58, 138, 0.20) 0%, rgba(0, 0, 0, 0.50) 100%)',
        }}
    >
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/edutime" element={<Edutime />} />
          <Route path="/register" element={<Regist />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/competition" element={<Competition />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
