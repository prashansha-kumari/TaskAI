import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "dashboard" : "login",
  );

  return (
    <>
      {page === "login" && <Login key="login" setPage={setPage} />}
      {page === "signup" && <Signup key="signup" setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} />}
    </>
  );
}

export default App;
