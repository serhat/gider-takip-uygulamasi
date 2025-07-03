import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { islemEkle, islemSil } from './store/transactionSlice';
import './App.css'; // Stil dosyanızı import edin

// Bileşenleri ayrı fonksiyonlar olarak tanımlamak daha temiz bir yapı sağlar
const Header = () => <h2>Gider Takip Uygulaması</h2>;

const Bakiye = () => {
  const { islemler } = useSelector((state) => state.transactions);
  const miktarlar = islemler.map(islem => islem.miktar);
  const toplam = miktarlar.reduce((acc, item) => (acc += item), 0);
  return (
    <>
      <h4>Mevcut Bakiyeniz</h4>
      <h1>{toplam.toFixed(2)} TL</h1>
    </>
  );
};

const GelirGiderDurumu = () => {
  const { islemler } = useSelector((state) => state.transactions);
  const miktarlar = islemler.map(islem => islem.miktar);
  const gelir = miktarlar.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
  const gider = Math.abs(miktarlar.filter(item => item < 0).reduce((acc, item) => (acc += item), 0));
  return (
    <div className="bakiye-container">
      <div>
        <h4>Gelir</h4>
        <p className="para gelir">+{gelir.toFixed(2)} TL</p>
      </div>
      <div>
        <h4>Gider</h4>
        <p className="para gider">-{gider.toFixed(2)} TL</p>
      </div>
    </div>
  );
};

const Islem = ({ islem }) => {
  const dispatch = useDispatch();
  const isaret = islem.miktar < 0 ? '-' : '+';
  const sinif = islem.miktar < 0 ? 'gider' : 'gelir';
  return (
    <li className={sinif}>
      {islem.aciklama} <span>{isaret}{Math.abs(islem.miktar).toFixed(2)} TL</span>
      <button onClick={() => dispatch(islemSil(islem.id))} className="delete-btn">x</button>
    </li>
  );
}

const IslemListesi = () => {
  const { islemler } = useSelector((state) => state.transactions);
  return (
    <>
      <h3>Geçmiş İşlemler</h3>
      <ul className="list">
        {islemler.map(islem => <Islem key={islem.id} islem={islem} />)}
      </ul>
    </>
  )
}

const YeniIslemEkle = () => {
  const [aciklama, setAciklama] = useState('');
  const [miktar, setMiktar] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!aciklama.trim() || !miktar) return;
    const yeniIslem = {
      id: Math.floor(Math.random() * 100000000),
      aciklama,
      miktar: +miktar
    };
    dispatch(islemEkle(yeniIslem));
    setAciklama('');
    setMiktar('');
  }

  return (
    <>
      <h3>Yeni İşlem Ekle</h3>
      <form onSubmit={onSubmit}>
        <div className="form-kontrol">
          <label htmlFor="aciklama">Açıklama</label>
          <input type="text" value={aciklama} onChange={(e) => setAciklama(e.target.value)} placeholder="Açıklama giriniz..." />
        </div>
        <div className="form-kontrol">
          <label htmlFor="miktar">Miktar <br /> (Gider için negatif, Gelir için pozitif)</label>
          <input type="number" value={miktar} onChange={(e) => setMiktar(e.target.value)} placeholder="Miktar giriniz..." />
        </div>
        <button className="btn">İşlemi Ekle</button>
      </form>
    </>
  )
}

function App() {
  return (
    <div className="container">
      <Header />
      <Bakiye />
      <GelirGiderDurumu />
      <IslemListesi />
      <YeniIslemEkle />
    </div>
  );
}

export default App;