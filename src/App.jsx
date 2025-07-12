import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "./Pages/Landing";
import UserProfilePage from "./Pages/profile";
import EditProfilePage from "./Pages/edit";
import About from "./Pages/about";
import FAQ from "./Pages/faq";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/edit" element={<EditProfilePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}