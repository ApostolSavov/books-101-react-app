import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Catalog from "./pages/Catalog/Catalog";
import BookDetails from "./pages/BookDetails/BookDetails";
import Reviews from "./pages/Reviews/Reviews";
import ReviewDetails from "./pages/ReviewDetails/ReviewDetails";
import AddReview from "./pages/AddReview/AddReview";
import EditReview from "./pages/EditReview/EditReview";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import ReadList from "./pages/ReadList/ReadList";
import Favourites from "./pages/Favourites/Favourites";
import Completed from "./pages/Completed/Completed";
import AuthGuard from "utils/guards/AuthGuard";

function App() {

  return (
    <Router>
      <Header />

      <div className="main-wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/catalog" replace />} />

          <Route path="/reviews" element={<Reviews />} />

          <Route path="/reviews/:id" element={<ReviewDetails />} />

          <Route path="/reviews/:id/edit" element={(
            <AuthGuard isOwner>
              <EditReview />
            </AuthGuard>
          )} />

          <Route path="/catalog" element={<Catalog />} />

          <Route path="/catalog/:id" element={<BookDetails />} />

          <Route path="/catalog/:id/reviews" element={<Reviews byBook />} />

          <Route path="/catalog/:id/add-review" element={(
            <AuthGuard>
              <AddReview />
            </AuthGuard>
          )} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/profile/readlist" element={<ReadList />} />

          <Route path="/profile/favourites" element={<Favourites />} />

          <Route path="/profile/completed" element={<Completed />} />

          <Route path="/profile/my-reviews" element={<Reviews byUser />} />
        </Routes>
      </div >

      <Footer />
    </Router >
  );
}

export default App;
