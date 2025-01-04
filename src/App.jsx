import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import { useLoginData } from "./context/LoginContext";

function App() {
  const { loginData } = useLoginData();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/home"
          element={
            JSON.parse(loginData) ? <Homepage /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/auth/login"
          element={!JSON.parse(loginData) ? <Login /> : <Navigate to="/home" />}
        />

        <Route
          path="*"
          element={
            <Navigate to={JSON.parse(loginData) ? "/home" : "/auth/login"} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
