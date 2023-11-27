import "./App.css";
import ComicForm from "./Components/Forms/ComicForm";
import ComicFinalPage from "./Components/FinalPages/ComicFinalPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Home/Navbar";

function App() {
  const appStyle = {
    backgroundImage: 'url("/ComicBackground.jpg")',
    backgroundSize: "cover",
    minHeight: "100vh",
    padding: "20px",
  };

  return (
    <Router>
      <Navbar></Navbar>
      <div style={appStyle}>
        <Routes>
          <Route path="/" element={<ComicForm />} />
          <Route path="/final" element={<ComicFinalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
