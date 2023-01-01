// IMPORT - CSS & ASSETS
import './Navigation.css';
import Profile from '../../assets/icons/Profile.svg';
import Bookmark from '../../assets/icons/Bookmark.svg';
import Download from '../../assets/icons/Download.svg';
import Home from '../../assets/icons/Home.svg';
import GrayHome from '../../assets/icons/GrayHome.svg';
import RedBookmark from '../../assets/icons/Bookmark-svg-red.svg';
import ProfileRed from '../../assets/icons/Profile-svg-Red.svg';
// IMPORT - REACT ELEMENTS
import { Link } from 'react-router-dom';

function Navigation({ page }) {
    return (
        <div className='navigation'>
            <Link to="/home">
                {/* Zeige das Home-Symbol oder das graue Home-Symbol, abhängig davon, ob der aktuelle Seitenname "home" ist oder nicht */}
                <img className='navLinkToHome' alt="Home Button" src={page !== "home" ? GrayHome : Home}></img>
            </Link>
            <Link to="/favorites">
                {/* Zeige das Lesezeichen-Symbol oder das rote Lesezeichen-Symbol, abhängig davon, ob der aktuelle Seitenname "favo" ist oder nicht */}
                <img alt="Bookmark Button" className='navBookmark' src={page === "favo" ? RedBookmark : Bookmark}></img>
            </Link>
            <img alt="Download Button" src={Download}></img>
            <Link to="/login">
                {/* Zeige das Profil-Symbol oder das rote Profil-Symbol, abhängig davon, ob der aktuelle Seitenname "login" ist oder nicht */}
                <img alt="Profile Button" className='navLogin' src={page === "login" ? ProfileRed : Profile}></img>
            </Link>
        </div>
    );
}

export default Navigation;