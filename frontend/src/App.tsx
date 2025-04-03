import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UrlShortener from "./pages/UrlShortener";
import PrivateRoute from "./privateRoute";
import NotFoundPage from "./error/404";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<NotFoundPage />} />
        <Route path="/*" element={<NotFoundPage />} />

        <Route
          path="/main"
          element={
            <PrivateRoute>
              <UrlShortener />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
