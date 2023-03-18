import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Сourse from "./Pages/Сourse";
import NotFound from "./Pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:courseId" element={<Сourse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default App;
