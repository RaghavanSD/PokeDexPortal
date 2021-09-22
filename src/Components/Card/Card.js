import React from "react";
import typeColors from "../../helpers/typeColors";

const Card=({ pokemon,onClickOfCard })=>{
  return (
    <>
      <div tabIndex={1} className="card" onClick={(e)=>onClickOfCard(pokemon)}>
        <img  src={pokemon.sprites.front_default} alt="" />
        <div className="card-body">
          <h5 className="card-title">{pokemon.name}</h5>
          <ul className="list-group list-group-flush">
          {pokemon.types.map((type) => (
            <li
              className="list-group-item ml-1"
              style={{ backgroundColor: typeColors[type.type.name],color: "white" }}
            >
              {type.type.name}
            </li>
          ))}
        </ul>
        
        <div   className="Card__data Card__data--weight">
        <h6 className="card-subtitle mt-2 text-muted">Weight</h6>
            <p>{pokemon.weight}</p>
          </div>
          <div className="Card__data Card__data--weight">
          <h6 className="card-subtitle mt-2 text-muted">Height</h6>
            <p>{pokemon.height}</p>
          </div>
          <div className="d-flex flex-column">
          <h6 className="card-subtitle mb-2 text-muted">Ability</h6>
            {pokemon.abilities.map((ability,index)=>
            <span className="abilitySpan my-2" key={index}>{ability.ability.name}</span>)}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
