import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IsEmri = () => {
  const [isEmriListesi, setIsEmriListesi] = useState([]);
  const [newIsEmri, setNewIsEmri] = useState({
    isEmriNo: '',
    tarih: '',
    siraNo: '',
    makine: '',
    siparisUrun: '',
    isEmriUrun: '',
    isEmriMiktar: '',
    isEmriSema: '',
    firma: '',
    siparis: '',
    mamulUret: '',
    baslangicZamani: '',
    bitisZamani: '',
    notlar: '',
    musteriTalepTarihi: '',
    terminTarihiPlanlama: '',
    terminDurumu: '',
    kapali: false,
  });
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    // İş emirlerini backend'den al
    axios
      .get('/api/is-emri')
      .then((response) => {
        setIsEmriListesi(response.data);
      })
      .catch((error) => {
        console.error('İş emirleri alınırken hata oluştu:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewIsEmri({ ...newIsEmri, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/is-emri', newIsEmri)
      .then((response) => {
        setIsEmriListesi([...isEmriListesi, response.data]);
        setNewIsEmri({
          isEmriNo: '',
          tarih: '',
          siraNo: '',
          makine: '',
          siparisUrun: '',
          isEmriUrun: '',
          isEmriMiktar: '',
          isEmriSema: '',
          firma: '',
          siparis: '',
          mamulUret: '',
          baslangicZamani: '',
          bitisZamani: '',
          notlar: '',
          musteriTalepTarihi: '',
          terminTarihiPlanlama: '',
          terminDurumu: '',
          kapali: false,
        });
        setIsPanelOpen(false); // Paneli kapat
      })
      .catch((error) => {
        console.error('İş emri eklenirken hata oluştu:', error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/is-emri/${id}`)
      .then(() => {
        setIsEmriListesi(isEmriListesi.filter((isEmri) => isEmri.id !== id));
      })
      .catch((error) => {
        console.error('İş emri silinirken hata oluştu:', error);
      });
  };

  return (
    <div className="is-emri">
      <h2>İş Emirleri</h2>
      <p>İş emirlerinin takibini buradan yapabilirsiniz.</p>

      {/* Veri Ekle Butonu */}
      <button onClick={() => setIsPanelOpen(true)}>Veri Ekle</button>

      {/* İş Emirlerini Listeleme */}
      <table className="is-emri-table">
        <thead>
          <tr>
            <th>İş Emri No</th>
            <th>Tarih</th>
            <th>Makine</th>
            <th>Ürün</th>
            <th>Miktar</th>
            <th>Durum</th>
            <th>Aksiyonlar</th>
          </tr>
        </thead>
        <tbody>
          {isEmriListesi.length > 0 ? (
            isEmriListesi.map((isEmri) => (
              <tr key={isEmri.id}>
                <td>{isEmri.isEmriNo}</td>
                <td>{isEmri.tarih}</td>
                <td>{isEmri.makine}</td>
                <td>{isEmri.isEmriUrun}</td>
                <td>{isEmri.isEmriMiktar}</td>
                <td>{isEmri.terminDurumu}</td>
                <td>
                  <button onClick={() => handleDelete(isEmri.id)}>Sil</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Henüz iş emri bulunmamaktadır.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Veri Ekleme Paneli */}
      {isPanelOpen && (
        <div className="is-emri-panel">
          <h3>Yeni İş Emri Ekle</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>İş Emri No:</label>
              <input
                type="text"
                name="isEmriNo"
                value={newIsEmri.isEmriNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Tarih:</label>
              <input
                type="date"
                name="tarih"
                value={newIsEmri.tarih}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Sıra No:</label>
              <input
                type="number"
                name="siraNo"
                value={newIsEmri.siraNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Makine:</label>
              <input
                type="text"
                name="makine"
                value={newIsEmri.makine}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Sipariş Ürün:</label>
              <input
                type="text"
                name="siparisUrun"
                value={newIsEmri.siparisUrun}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>İş Emri Ürün:</label>
              <input
                type="text"
                name="isEmriUrun"
                value={newIsEmri.isEmriUrun}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>İş Emri Miktar:</label>
              <input
                type="number"
                name="isEmriMiktar"
                value={newIsEmri.isEmriMiktar}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>İş Emri Sema:</label>
              <input
                type="text"
                name="isEmriSema"
                value={newIsEmri.isEmriSema}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Firma:</label>
              <input
                type="text"
                name="firma"
                value={newIsEmri.firma}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Sipariş:</label>
              <input
                type="text"
                name="siparis"
                value={newIsEmri.siparis}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Mamul Üret:</label>
              <input
                type="text"
                name="mamulUret"
                value={newIsEmri.mamulUret}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Başlangıç Zamanı:</label>
              <input
                type="date"
                name="baslangicZamani"
                value={newIsEmri.baslangicZamani}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Bitiş Zamanı:</label>
              <input
                type="date"
                name="bitisZamani"
                value={newIsEmri.bitisZamani}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Notlar:</label>
              <textarea
                name="notlar"
                value={newIsEmri.notlar}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Müşteri Talep Tarihi:</label>
              <input
                type="date"
                name="musteriTalepTarihi"
                value={newIsEmri.musteriTalepTarihi}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Termin Tarihi Planlama:</label>
              <input
                type="date"
                name="terminTarihiPlanlama"
                value={newIsEmri.terminTarihiPlanlama}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Termin Durumu:</label>
              <input
                type="text"
                name="terminDurumu"
                value={newIsEmri.terminDurumu}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Kapalı:</label>
              <input
                type="checkbox"
                name="kapali"
                checked={newIsEmri.kapali}
                onChange={(e) =>
                  setNewIsEmri({
                    ...newIsEmri,
                    kapali: e.target.checked,
                  })
                }
              />
            </div>
            <button type="submit">Kaydet</button>
          </form>
          <button onClick={() => setIsPanelOpen(false)}>İptal</button>
        </div>
      )}
    </div>
  );
};

export default IsEmri;
