import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./componets/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
