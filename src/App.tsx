import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AlmacenesPage } from "./pages/AlmacenesPage";
import { RolesPage } from "./pages/RolesPage";

export const App = () => (
  <Router>
    <nav>
      <Link to="/">Almacenes</Link>
      <Link to="/roles">Roles</Link>
    </nav>
    <Routes>
      <Route path="/" element={<AlmacenesPage />} />
      <Route path="/roles" element={<RolesPage />} />
    </Routes>
  </Router>
);
