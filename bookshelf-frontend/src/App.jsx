import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {/* Navbar */}
        <nav className="bg-gray-800 text-white">
          <div className="container mx-auto p-4 flex gap-6">
            <Link to="/" className="hover:underline">Trang chủ</Link>
            <Link to="/stats" className="hover:underline">Biểu đồ</Link>
          </div>
        </nav>

        {/* Page content */}
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
