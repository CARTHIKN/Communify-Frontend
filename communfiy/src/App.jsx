
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserWrapper from "./Components/User/UserWrapper/UserWrapper";
import userStore from "./Redux/userStore";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Router>
      <Provider store={userStore}>
        <Routes>
          <Route path="*" element={<UserWrapper/>}></Route>
        </Routes>
      </Provider>
      </Router>
    </>
  );
}

export default App;
