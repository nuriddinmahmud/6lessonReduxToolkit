import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductCard from "./components/Cart";
import Header from "./components/Header";

const Wishlist = () => (
  <div className="max-w-[1240px] mx-auto px-4 py-6 text-zinc-700">
    Wishlist (soon)
  </div>
);

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<ProductCard/>} />
    </Routes>
  </BrowserRouter>
);

export default App;
