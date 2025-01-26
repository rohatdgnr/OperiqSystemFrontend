import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/urun-agaci">Ürün Ağacı</Link></li>
        <li><Link to="/siparisler">Siparişler</Link></li>
        <li><Link to="/stok">Stok</Link></li>
        <li><Link to="/musteriler">Müşteriler</Link></li>
        <li><Link to="/is-emri">İş Emri</Link></li>
        <li><Link to="/kullanici-kaydi">Kullanıcı Kaydı</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
