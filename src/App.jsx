import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Catalog from "pages/Catalog/Catalog";
import BookDetails from "./pages/BookDetails/BookDetails";
import Reviews from "./pages/Reviews/Reviews";
import ReviewDetails from "./pages/ReviewDetails/ReviewDetails";
import AddReview from "./pages/AddReview/AddReview";
import EditReview from "./pages/EditReview/EditReview";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AuthGuard from "utils/guards/AuthGuard";
import About from "pages/About/About";

function App() {

  return (
    <Router>
      <Header />

      <div className="main-wrapper">
        <Routes>
          <Route path="/" element={<Catalog />} />

          <Route path="/catalog" element={<Catalog />} />

          <Route path="/reviews" element={<Reviews />} />

          <Route path="/reviews/:id" element={<ReviewDetails />} />

          <Route path="/reviews/:id/edit" element={(
            <AuthGuard isOwner>
              <EditReview />
            </AuthGuard>
          )} />

          <Route path="/catalog/:id" element={<BookDetails />} />

          <Route path="/catalog/:id/reviews" element={<Reviews byBook />} />

          <Route path="/catalog/:id/add-review" element={(
            <AuthGuard>
              <AddReview />
            </AuthGuard>
          )} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/profile/:id" element={<Reviews byUser />} />

          <Route path="/about" element={<About />} />
        </Routes>
      </div >

      <Footer />
    </Router >
  );
}

export default App;
