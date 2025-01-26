import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const data = [
    { name: "Ocak", gelir: 4000, gider: 2400 },
    { name: "Şubat", gelir: 3000, gider: 1398 },
    { name: "Mart", gelir: 2000, gider: 9800 },
    { name: "Nisan", gelir: 2780, gider: 3908 },
    { name: "Mayıs", gelir: 1890, gider: 4800 },
    { name: "Haziran", gelir: 2390, gider: 3800 },
    { name: "Temmuz", gelir: 3490, gider: 4300 },
  ];

  const toplamGelir = data.reduce((acc, curr) => acc + curr.gelir, 0);
  const toplamGider = data.reduce((acc, curr) => acc + curr.gider, 0);
  const netGelir = toplamGelir - toplamGider;

  const pieData = [
    { name: "Gelir", value: toplamGelir },
    { name: "Gider", value: toplamGider },
  ];

  const COLORS = ["#8884d8", "#82ca9d"];

  const siparisler = [
    { id: 1, musteri: "Ali Veli", tutar: "5000₺", tarih: "2025-01-20" },
    { id: 2, musteri: "Ayşe Fatma", tutar: "3000₺", tarih: "2025-01-19" },
    { id: 3, musteri: "Ahmet Yılmaz", tutar: "4500₺", tarih: "2025-01-18" },
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* Özet Kartlar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ flex: 1, margin: "10px", background: "#f5f5f5", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
          <h3>Toplam Gelir</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#8884d8" }}>{toplamGelir}₺</p>
        </div>
        <div style={{ flex: 1, margin: "10px", background: "#f5f5f5", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
          <h3>Toplam Gider</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#82ca9d" }}>{toplamGider}₺</p>
        </div>
        <div style={{ flex: 1, margin: "10px", background: "#f5f5f5", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
          <h3>Net Gelir</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: netGelir > 0 ? "#4caf50" : "#f44336" }}>{netGelir}₺</p>
        </div>
      </div>

      {/* Grafikler */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
        {/* Çizgi Grafiği */}
        <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
          <h3>Gelir ve Gider Trendleri</h3>
          <LineChart width={400} height={300} data={data}>
            <Line type="monotone" dataKey="gelir" stroke="#8884d8" />
            <Line type="monotone" dataKey="gider" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        {/* Bar Grafiği */}
        <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
          <h3>Aylık Karşılaştırma</h3>
          <BarChart width={400} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="gelir" fill="#8884d8" />
            <Bar dataKey="gider" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Pie Grafiği */}
        <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
          <h3>Gelir ve Gider Dağılımı</h3>
          <PieChart width={400} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Son Siparişler Tablosu */}
      <div style={{ marginTop: "20px", border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
        <h3>Son Siparişler</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Sipariş ID</th>
              <th style={{ padding: "10px" }}>Müşteri</th>
              <th style={{ padding: "10px" }}>Tutar</th>
              <th style={{ padding: "10px" }}>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {siparisler.map((siparis) => (
              <tr key={siparis.id}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{siparis.id}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{siparis.musteri}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{siparis.tutar}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{siparis.tarih}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
