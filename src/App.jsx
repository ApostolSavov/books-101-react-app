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
import MyReviews from "./pages/MyReviews/MyReviews";

function App() {

  return (
    <Router>
      <Header />
      <div className="main-wrapper">
        <Routes>
          <Route exact path="/" element={<Navigate to="/catalog" replace />} />

          <Route exact path="/catalog" element={<Catalog />} />

          <Route exact path="/catalog/:id" element={<BookDetails />} />

          <Route exact path="/catalog/:id/reviews" element={<Reviews />} />

          <Route exact path="/catalog/:id/reviews/:id" element={<ReviewDetails />} />

          <Route exact path="/catalog/:id/add-review" element={<AddReview />} />

          <Route exact path="/catalog/:id/reviews/:id/edit" element={<EditReview />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/register" element={<Register />} />

          <Route exact path="/profile" element={<Profile />} />

          <Route exact path="/profile/readlist" element={<ReadList />} />

          <Route exact path="/profile/favourites" element={<Favourites />} />

          <Route exact path="/profile/completed" element={<Completed />} />

          <Route exact path="/profile/my-reviews" element={<MyReviews />} />
        </Routes>
      </div >

      <Footer />
    </Router >
  );
}

export default App;
