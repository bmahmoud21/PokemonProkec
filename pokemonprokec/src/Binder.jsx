import React, { useEffect, useState } from "react";
import "./Binder.css";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./Components/PokemonCard";

const boxClasses = [
  "boxes1", "boxes2", "boxes3", "boxes4", "boxes5", "boxes6",
  "boxes7", "boxes8", "boxes9", "boxes10", "boxes11", "boxes12"
];
const pageSize = 12;

function Binder() {
  const [userPokemons, setUserPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalPokemon, setModalPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    console.log("Binder.jsx userId:", userId, "token:", token);

    if (userId && token) {
      // user path
      console.log("Binder.jsx: using user path");
      fetch(`http://localhost:5255/api/userpokemon/all/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setUserPokemons(data))
        .catch(() => setUserPokemons([]));
    } else {
      // guest path
      console.log("Binder.jsx: using guest path");
      const selected = JSON.parse(localStorage.getItem("selectedPokemon")) || [];
      console.log("selectedPokemon from localStorage:", selected);
      if (!selected.length) {
        setUserPokemons([]);
        return;
      }
      const selectedIds = selected.map(p => p.id);
      console.log("selectedIds to send to API:", selectedIds);

      fetch("http://localhost:5255/api/pokemon/byIds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedIds)
      })
        .then(res => res.json())
        .then(filtered => {
          console.log("API returned:", filtered);
          setUserPokemons(filtered);
        })
        .catch((err) => {
          console.error("API error:", err);
          setUserPokemons([]);
        });
    }
  }, []);

  // Remove duplicates
  const uniqueUserPokemons = userPokemons.filter(
    (poke, idx, arr) => arr.findIndex(p => p.id === poke.id) === idx
  );

  const maxPage = Math.ceil(uniqueUserPokemons.length / pageSize) - 1;
  const paginatedPokemon = uniqueUserPokemons.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  // Handler for Finished button
  const handleFinished = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("selectedPokemon");
    localStorage.removeItem("playedPokemon");
    navigate("/");
  };

  return (
    <div className="background">
      <button
        className="homebutton"
        onClick={() => navigate("/FindThatPokemon")}
        title="Go Home"
      >
        <img
          className="homebuttonimg"
          src="./src/imgs/Home.png"
          alt="Home"
        />
      </button>

      <div className="trapezoid-container"></div>
      <div className="trapezoid-container-two"></div>

      {boxClasses.map((cls, idx) => {
        const pokemon = paginatedPokemon[idx];
        return (
          <div className={cls} key={cls}>
            {pokemon && (
              <div className="binder-card-wrapper">
                <PokemonCard pokemon={pokemon} />
                <button
                  className="view-card-btn"
                  onClick={() => setModalPokemon(pokemon)}
                >
                  <div className="view-card-icon"> View </div>
                </button>
              </div>
            )}
          </div>
        );
      })}

      <button
        className="arrowbutton left"
        onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
        disabled={currentPage === 0}
      >
        <img src="./src/imgs/Arrow.png" className="previous" alt="Previous" />
      </button>
      <button
        className="arrowbutton right"
        onClick={() => setCurrentPage(p => Math.min(maxPage, p + 1))}
        disabled={currentPage === maxPage || userPokemons.length === 0}
      >
        <img src="./src/imgs/Arrow.png" className="next" alt="Next" />
      </button>

      <button
        className="finished-button"
        onClick={handleFinished}
      >
        <img src="src/imgs/endgame.png" alt="End Game" />
      </button>

      {modalPokemon && (
        <div className="modal-overlay" onClick={() => setModalPokemon(null)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="close-modal-btn"
              onClick={() => setModalPokemon(null)}
            >
              <div className="close-icon"> Close </div>
            </button>
            <div className="pokemon-card-wrapper-large">
              <PokemonCard pokemon={modalPokemon} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Binder;