
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserWrapper from "./Components/User/UserWrapper/UserWrapper";
import AdminWrapper from "./Components/Admin/AdminWrapper";

function App() {
  return (
    <>
    
      <Router>
        <Routes>
          <Route path="*" element={<UserWrapper/>}></Route>
          <Route path="admin/*" element={<AdminWrapper/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
