import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CatalogPage from "./pages/Catalog/CatalogPage";
import "./App.scss";

function App() {

  return (
    <Router>
      <Header />
      <div className="main-wrapper">
        <Routes>
          <Route exact path="/" element={<Navigate to="/catalog" replace />} />
          <Route exact path="/catalog" element={<CatalogPage />} />
          <Route exact path="/test" element={<div>test page</div>} />
        </Routes>
      </div >
      <Footer />
    </Router >
  );
}

export default App;
