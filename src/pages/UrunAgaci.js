import React, { useState } from "react";

const UrunAgaci = () => {
  const [urunler, setUrunler] = useState([]);
  const [yeniUrun, setYeniUrun] = useState("");
  const [seciliUrun, setSeciliUrun] = useState(null);
  const [yeniBilesen, setYeniBilesen] = useState({ isim: "", miktar: 0 });
  const [uretimMiktari, setUretimMiktari] = useState(0);

  const urunEkle = () => {
    if (yeniUrun.trim() === "") return alert("Ürün ismi boş olamaz!");
    setUrunler([...urunler, { id: Date.now(), isim: yeniUrun, bilesenler: [] }]);
    setYeniUrun("");
  };

  const bilesenEkle = () => {
    if (!seciliUrun) return alert("Önce bir ürün seçmelisiniz!");
    if (yeniBilesen.isim.trim() === "" || yeniBilesen.miktar <= 0)
      return alert("Bileşen ismi veya miktarı geçersiz!");

    const guncelUrunler = urunler.map((urun) => {
      if (urun.id === seciliUrun.id) {
        return {
          ...urun,
          bilesenler: [...urun.bilesenler, yeniBilesen],
        };
      }
      return urun;
    });

    setUrunler(guncelUrunler);
    setYeniBilesen({ isim: "", miktar: 0 });
  };

  const hesaplaBilesenIhtiyaci = () => {
    if (!seciliUrun) return [];
    return seciliUrun.bilesenler.map((bilesen) => ({
      isim: bilesen.isim,
      toplamMiktar: bilesen.miktar * uretimMiktari,
    }));
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>Ürün Ağacı</h2>

      {/* Ürün Ekleme Bölümü */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Yeni ürün adı"
          value={yeniUrun}
          onChange={(e) => setYeniUrun(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={urunEkle}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Ürün Ekle
        </button>
      </div>

      {/* Ürün Listesi */}
      <h3 style={{ color: "#555" }}>Ürünler</h3>
      <ul
        style={{
          listStyleType: "none",
          padding: "0",
          margin: "0 0 20px 0",
        }}
      >
        {urunler.map((urun) => (
          <li
            key={urun.id}
            onClick={() => setSeciliUrun(urun)}
            style={{
              padding: "10px",
              margin: "5px 0",
              backgroundColor:
                seciliUrun?.id === urun.id ? "#007BFF" : "#f4f4f4",
              color: seciliUrun?.id === urun.id ? "#fff" : "#333",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {urun.isim}
          </li>
        ))}
      </ul>

      {/* Seçili Ürün ve İşlemler */}
      {seciliUrun && (
        <div>
          <h3 style={{ color: "#555" }}>{seciliUrun.isim} Bileşenleri</h3>
          <ul style={{ padding: "0", listStyleType: "none", marginBottom: "20px" }}>
            {seciliUrun.bilesenler.map((bilesen, index) => (
              <li
                key={index}
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  backgroundColor: "#f4f4f4",
                  borderRadius: "5px",
                }}
              >
                {bilesen.isim} - {bilesen.miktar} adet
              </li>
            ))}
          </ul>

          {/* Yeni Bileşen Ekleme */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Bileşen adı"
              value={yeniBilesen.isim}
              onChange={(e) =>
                setYeniBilesen({ ...yeniBilesen, isim: e.target.value })
              }
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="number"
              placeholder="Miktar"
              value={yeniBilesen.miktar}
              onChange={(e) =>
                setYeniBilesen({ ...yeniBilesen, miktar: Number(e.target.value) })
              }
              style={{
                width: "100px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={bilesenEkle}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28A745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Ekle
            </button>
          </div>

          {/* Üretim Miktarı ve Hesaplama */}
          <div>
            <h4>Üretim Miktarı Girin</h4>
            <input
              type="number"
              placeholder="Üretim miktarı"
              value={uretimMiktari}
              onChange={(e) => setUretimMiktari(Number(e.target.value))}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "150px",
              }}
            />
            {uretimMiktari > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h4>Gereken Bileşenler:</h4>
                <ul style={{ padding: "0", listStyleType: "none" }}>
                  {hesaplaBilesenIhtiyaci().map((bilesen, index) => (
                    <li
                      key={index}
                      style={{
                        padding: "10px",
                        margin: "5px 0",
                        backgroundColor: "#f4f4f4",
                        borderRadius: "5px",
                      }}
                    >
                      {bilesen.isim} - {bilesen.toplamMiktar} adet
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UrunAgaci;
