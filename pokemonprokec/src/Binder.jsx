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
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      // Guest
      const selected = JSON.parse(localStorage.getItem("selectedPokemon")) || [];
      setUserPokemons(selected);
    } else {
      // user
      fetch(`http://localhost:5255/api/userpokemon/all/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setUserPokemons(data))
        .catch(() => setUserPokemons([]));
    }
  }, []);

  // Remove duplicates
  const uniqueUserPokemons = userPokemons.filter(
    (poke, idx, arr) => arr.findIndex(p => p.id === poke.id) === idx
  );

  const maxPage = Math.ceil(uniqueUserPokemons.length / pageSize) - 1;
  const paginatedPokemon = uniqueUserPokemons.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <div className="background">
      <button
        className="homebutton"
        onClick={() => navigate("/")}
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
    </div>
  );
}

export default Binder;