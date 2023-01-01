import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home/Home';
import Navigation from './components/Navigation/Navigation';
import SearchGenre from './pages/SearchGenre/SearchGenre';
import Detail from './pages/Detail/Detail';
import StartPage from './pages/StartPage/StartPage';
import Favorites from './pages/Favorites/Favorites';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import LoginPage from './pages/LoginPage/LoginPage';
import Datenschutz from './pages/Datenschutz/Datenschutz';
import { db } from './Firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { UserAuth } from './context/AuthContext';


function App() {
  const { user } = UserAuth();
  const [favorites, addFavorites] = useState([]);
  const [dataBaseFavs, setdataBaseFavs] = useState();
  const [useAbleFavs, setUseAbleFavs] = useState();
  // Array für die ID's der Favoriten
  let idString = [];
  const ref = collection(db, "MovieMania");

  // Fügt die ID's der Favoriten dem Array hinzu
  favorites.forEach((el) => {
    idString.push(el.id);
  });

  // Fügt den ausgewählten Film zu den Favoriten hinzu
  async function addToFavorites(selected) {
    if (!idString.includes(selected.id)) {
      addFavorites([...favorites, selected]);
      selected.userID = user?.uid;
      await addDoc(ref, selected);
    };
  }

  useEffect(() => {
    const getFavorites = async () => {
      // Ruft alle Dokumente aus der Sammlung "ref" ab
      const a = await getDocs(ref);
      // Setzt den Wert von "dataBaseFavs" auf ein Array mit allen Dokumenten, die das data-Objekt und die docid enthalten
      setdataBaseFavs(a.docs.map((doc) => ({ ...doc.data(), docid: doc.id })));
    };
    getFavorites();
  }, [favorites,]);

  useEffect(() => {
    if (dataBaseFavs === undefined) return;
    // Setze useAbleFavs auf eine Liste von Filmen, die dem aktuellen Benutzer gehören
    setUseAbleFavs(dataBaseFavs.filter(el => el.userID === user?.uid));
  }, [dataBaseFavs]);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<><SplashScreen /></>} />
          <Route path="/start" element={<><StartPage /></>} />
          <Route path="/home" element={<><Home /><Navigation page={"home"} /></>} />
          <Route path="/discover/:variant/:searchValue" element={<><SearchGenre addToFavorites={addToFavorites} dataBaseFavs={useAbleFavs} /><Navigation /></>} />
          <Route path="/details/:movieID/:movieName" element={<><Detail addToFavorites={addToFavorites} dataBaseFavs={useAbleFavs} /><Navigation /></>} />
          <Route path="/favorites" element={<><Favorites Favorites={favorites} /><Navigation page={"favo"} /></>} />
          <Route path="/login" element={<><LoginPage /><Navigation page="login" /></>} />
          <Route path="/datenschutz" element={<><Datenschutz /><Navigation page="login" /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
