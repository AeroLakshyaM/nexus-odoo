import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "./Pages/Landing";

export default function App() {
    return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
      <Footer />
    </>
    )
}
