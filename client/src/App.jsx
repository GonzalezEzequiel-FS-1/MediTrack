import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./Test/Test";
import TestTwo from "./Test/TestTwo";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />}></Route>
        <Route path="/testtwo" element={<TestTwo />}></Route>
      </Routes>
    </Router>
  );
}
