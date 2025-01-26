import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import UrunAgaci from "./pages/UrunAgaci";
import Siparisler from "./pages/Siparisler";
import Stok from "./pages/Stok";
import Musteriler from "./pages/Musteriler";
import IsEmri from "./pages/IsEmri";
import KullaniciKaydi from "./pages/KullaniciKaydi";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Sayfası */}
        <Route path="/login" element={<Login />} />

        {/* Korunan Rotalar */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div>
                <Header />
                <div className="app-container">
                  <Sidebar />
                  <div className="content">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/urun-agaci" element={<UrunAgaci />} />
                      <Route path="/siparisler" element={<Siparisler />} />
                      <Route path="/stok" element={<Stok />} />
                      <Route path="/musteriler" element={<Musteriler />} />
                      <Route path="/is-emri" element={<IsEmri />} />
                      <Route path="/kullanici-kaydi" element={<KullaniciKaydi />} />
                    </Routes>
                  </div>
                </div>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
