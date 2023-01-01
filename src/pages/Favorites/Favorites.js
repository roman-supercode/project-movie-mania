import './Favorites.css';
import ArrowLeft from '../../assets/icons/arrowLeft.png';

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../Firebase';
import { UserAuth } from "../../context/AuthContext";
import GenreCard from "../../components/GenreCard/GenreCard";



function Favorites({ Favorites }) {
    const { user } = UserAuth();

    const navigate = useNavigate();
    const [favorites, setFavorites] = useState();
    const [useAbleFavs, setUseAbleFavs] = useState();
    const [number, setNumber] = useState(Favorites.lenght);

    const ref = collection(db, "MovieMania");
    useEffect(() => {
        const getFavorites = async () => {
            const a = await getDocs(ref);
            setFavorites(a.docs.map((doc) => ({ ...doc.data(), docid: doc.id })));
        };
        getFavorites();

    }, [Favorites, number]);

    useEffect(() => {
        if (favorites === undefined) return;
        setUseAbleFavs(favorites.filter(el => el.userID === user?.uid));
    }, [favorites]);

    // Funktion zum Löschen eines favorisierten Films
    const deleteUse = async (id) => {
        const FavoDoc = doc(db, "MovieMania", id);
        await deleteDoc(FavoDoc);
        setNumber(id);
    };

    // Falls useAbleFavs nicht definiert ist, wird die Funktion beendet
    if (useAbleFavs === undefined) return;

    return (
        <div className="Favorites-Wrapper">
            <div className="FavoritesBtnAndHeading">
                <button className='favoritesBackButton' onClick={() => navigate(-1)}>
                    <img alt='img' src={ArrowLeft}></img>
                </button>
                <h1>Deine Favoriten</h1>
            </div>
            {/* Falls keine favorisierten Filme vorhanden sind, wird eine Nachricht angezeigt */}
            {useAbleFavs === [] ? "Leider keine Favoriten vorhanden" : ""}
            {useAbleFavs.map((data, index) => {
                // Fav-Eigenschaft wird hinzugefügt, um anzuzeigen, dass der Film favorisiert wurde
                data.fav = true;
                return (
                    <GenreCard data={data} index={index} page={"favo"} delteItem={deleteUse} fav={true} />
                );
            })}
        </div>
    );
}

export default Favorites;