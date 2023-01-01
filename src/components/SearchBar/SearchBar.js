// IMPORT - CSS & ASSETS
import './SearchBar.css';
import SearchImg from "../../assets/img/SearchImg.svg";
// IMPORT - REACT ELEMENTS
import React, { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    // Referenz für das Eingabefeld
    const inputRef = useRef();
    // Nutze die useNavigate-Hook von react-router, um die aktuelle Seite zu ändern
    const navigate = useNavigate();
    // Erstelle eine Callback-Funktion, die die Seite zu einer Suchergebnisseite mit den Eingabewerten navigiert
    const handleOnClick = useCallback(() => navigate(`/discover/search/${inputRef.current.value}`, { replace: true }), [navigate]);

    return (
        <div className="Searchbar-Container">
            {/* Führe die handleOnClick-Funktion aus, wenn der Enter-Knopf gedrückt wird */}
            <input ref={inputRef} type="text" className="input" placeholder="Search Movie..." onKeyDown={(e) => e.key === "Enter" ? handleOnClick() : ""}></input>
            <button onClick={() => handleOnClick()} type="submit"><img src={SearchImg} alt="SuchLupe" className="fa Searchbar-Img"></img></button>
        </div>
    );
};

export default SearchBar;