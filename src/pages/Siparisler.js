import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Siparisler = () => {
  const [siparisler, setSiparisler] = useState([]);
  const [selectedSiparis, setSelectedSiparis] = useState(null);

  // Backend'den siparişleri çek
  useEffect(() => {
    const fetchSiparisler = async () => {
      try {
        const response = await axios.get('/api/siparisler'); // Backend API endpoint
        setSiparisler(response.data);
      } catch (error) {
        console.error('Siparişler yüklenirken bir hata oluştu:', error);
      }
    };
    fetchSiparisler();
  }, []);

  const handleSiparisClick = (siparis) => {
    setSelectedSiparis(siparis);
  };

  return (
    <div className="siparisler">
      <h2>Siparişler</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Sipariş Listesi */}
        <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
          <h3>Sipariş Listesi</h3>
          {siparisler.length > 0 ? (
            <ul>
              {siparisler.map((siparis) => (
                <li
                  key={siparis.id}
                  onClick={() => handleSiparisClick(siparis)}
                  style={{ cursor: 'pointer', padding: '5px 0' }}
                >
                  <strong>Sipariş ID:</strong> {siparis.id} - <strong>Tarih:</strong>{' '}
                  {new Date(siparis.siparisTarihi).toLocaleDateString()} -{' '}
                  <strong>Toplam:</strong> {siparis.toplamFiyat}₺
                </li>
              ))}
            </ul>
          ) : (
            <p>Sipariş bulunamadı.</p>
          )}
        </div>

        {/* Seçili Sipariş Detayları */}
        <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
          <h3>Sipariş Detayları</h3>
          {selectedSiparis ? (
            <div>
              <p>
                <strong>Sipariş ID:</strong> {selectedSiparis.id}
              </p>
              <p>
                <strong>Tarih:</strong>{' '}
                {new Date(selectedSiparis.siparisTarihi).toLocaleDateString()}
              </p>
              <p>
                <strong>Müşteri:</strong> {selectedSiparis.musteri.ad}{' '}
                {selectedSiparis.musteri.soyad}
              </p>
              <p>
                <strong>Toplam Fiyat:</strong> {selectedSiparis.toplamFiyat}₺
              </p>
              <h4>Ürünler:</h4>
              <ul>
                {selectedSiparis.siparisUrunleri.map((urun) => (
                  <li key={urun.id}>
                    {urun.urun.ad} - {urun.miktar} adet - {urun.fiyat}₺
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Sipariş seçiniz.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Siparisler;
