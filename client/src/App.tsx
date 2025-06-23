import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlaceHolder from "./Pages/PlaceHolder";
import MuiTypography from "./components/MuiTypography";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaceHolder />} />
      </Routes>
    </Router>
  );
}
