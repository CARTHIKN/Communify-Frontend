
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserWrapper from "./Components/User/UserWrapper/UserWrapper";
import userStore from "./Redux/userStore";
import { Provider } from "react-redux";
import AdminWrapper from "./Components/Admin/AdminWrapper";

function App() {
  return (
    <>
    
      <Router>
      <Provider store={userStore}>
        <Routes>
          <Route path="*" element={<UserWrapper/>}></Route>
          <Route path="admin/*" element={<AdminWrapper/>}></Route>

        </Routes>
      </Provider>
      </Router>
    </>
  );
}

export default App;
