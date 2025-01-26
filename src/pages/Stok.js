import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stok = () => {
  const [stoklar, setStoklar] = useState([]);
  const [editingStok, setEditingStok] = useState(null);
  const [updatedMiktar, setUpdatedMiktar] = useState('');

  // Stokları backend'den çek
  useEffect(() => {
    const fetchStoklar = async () => {
      try {
        const response = await axios.get('/api/stok'); // Backend API endpoint
        setStoklar(response.data);
      } catch (error) {
        console.error('Stok bilgileri yüklenirken bir hata oluştu:', error);
      }
    };
    fetchStoklar();
  }, []);

  // Stok düzenleme başlatma
  const handleEdit = (stok) => {
    setEditingStok(stok);
    setUpdatedMiktar(stok.mevcutMiktar);
  };

  // Stok düzenleme işlemi
  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/stok/${editingStok.id}`, {
        mevcutMiktar: updatedMiktar,
      });
      setStoklar((prevStoklar) =>
        prevStoklar.map((stok) =>
          stok.id === editingStok.id ? { ...stok, mevcutMiktar: updatedMiktar } : stok
        )
      );
      setEditingStok(null);
      setUpdatedMiktar('');
    } catch (error) {
      console.error('Stok güncellenirken bir hata oluştu:', error);
    }
  };

  return (
    <div className="stok">
      <h2>Stok Yönetimi</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Malzeme Adı</th>
            <th>Mevcut Miktar</th>
            <th>Kritik Seviye</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {stoklar.map((stok) => (
            <tr
              key={stok.id}
              style={{
                backgroundColor: stok.mevcutMiktar < stok.kritikSeviye ? '#f8d7da' : 'white',
              }}
            >
              <td>{stok.malzemeAdi}</td>
              <td>
                {editingStok && editingStok.id === stok.id ? (
                  <input
                    type="number"
                    value={updatedMiktar}
                    onChange={(e) => setUpdatedMiktar(e.target.value)}
                  />
                ) : (
                  stok.mevcutMiktar
                )}
              </td>
              <td>{stok.kritikSeviye}</td>
              <td>
                {stok.mevcutMiktar < stok.kritikSeviye ? (
                  <span style={{ color: 'red', fontWeight: 'bold' }}>Kritik</span>
                ) : (
                  'Normal'
                )}
              </td>
              <td>
                {editingStok && editingStok.id === stok.id ? (
                  <button onClick={handleSave}>Kaydet</button>
                ) : (
                  <button onClick={() => handleEdit(stok)}>Düzenle</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stok;
