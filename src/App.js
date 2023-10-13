import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Signup, ProtectedRoute } from "./pages/UserRegistration";
import { Dashboard } from "./pages/Dashboard";
function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Router>
        <Routes>
          <Route exact element={<Login />} path="/login" />
          <Route exact element={<Signup />} path="/signup" />
          <Route
            exact
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
            path="/"
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
