import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Signup, Dashboard, ProtectedRoute } from "./features/User";
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
//https://usman-fake-api.herokuapp.com/api/users -signup
//https://usman-fake-api.herokuapp.com/api/auth -Login

export default App;
