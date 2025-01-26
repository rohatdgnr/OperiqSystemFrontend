import React, { useState, useEffect } from "react";
import axios from "axios";

const Musteriler = () => {
  const [musteriler, setMusteriler] = useState([]);
  const [newMusteri, setNewMusteri] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
  });

  useEffect(() => {
    // Müşteri verisini backend'den almak
    axios
      .get("http://localhost:3000/api/musteri")  // API URL'sini buraya yazdık
      .then((response) => {
        setMusteriler(response.data);
      })
      .catch((error) => {
        console.error("Müşteri verisi alınırken bir hata oluştu:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMusteri({ ...newMusteri, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yeni müşteri ekleme isteği
    axios
      .post("http://localhost:3000/api/musteri", newMusteri)  // API URL'sini buraya yazdık
      .then((response) => {
        setMusteriler([...musteriler, response.data]);
        setNewMusteri({ ad: "", soyad: "", email: "", telefon: "" }); // Formu sıfırla
      })
      .catch((error) => {
        console.error("Yeni müşteri eklenirken hata oluştu:", error);
      });
  };

  return (
    <div className="musteriler">
      <h2>Müşteriler</h2>
      <p>Müşteri bilgilerini buradan yönetebilirsiniz.</p>

      {/* Yeni müşteri ekleme formu */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ad:</label>
          <input
            type="text"
            name="ad"
            value={newMusteri.ad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Soyad:</label>
          <input
            type="text"
            name="soyad"
            value={newMusteri.soyad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={newMusteri.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Telefon:</label>
          <input
            type="text"
            name="telefon"
            value={newMusteri.telefon}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Müşteri Ekle</button>
      </form>

      {/* Müşteri listesi */}
      <table className="musteri-table">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Email</th>
            <th>Telefon</th>
          </tr>
        </thead>
        <tbody>
          {musteriler.length > 0 ? (
            musteriler.map((musteri) => (
              <tr key={musteri.id}>
                <td>{musteri.ad}</td>
                <td>{musteri.soyad}</td>
                <td>{musteri.email}</td>
                <td>{musteri.telefon}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Henüz müşteri bulunmamaktadır.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Musteriler;
