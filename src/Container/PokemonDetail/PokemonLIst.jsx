import React, { useState, useEffect, useReducer } from "react";
import Search from "../../Components/Search.jsx";
import Card from "../../Components/Card";
import { getPokemon, getAllPokemon } from "../../services/pokemon";
import { Button,Spinner } from "react-bootstrap";
import {predicate} from "../../helpers/typeColors"
import { useHistory } from "react-router-dom";

///used function based component this is the first component that is listing the cards used bootstrap and pure css

const PokemonList=()=>  {
  const spinnerWrapperStyle = {
    textAlign: 'center',
    marginTop: '50px',
  }

  const spinnerStyle = {
    width: '10rem',
    height: '10rem',
    borderWidth: '1rem',
  };
//route hook 
  const history = useHistory()
 //all the states for the 1st page

  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [selectValue,setSelectValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const initialURL = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}`;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [initialURL, itemsPerPage]);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
const onClickOfCard=(pokemon)=>{
  const name=pokemon.name;
  history.push(`/detail/${name}`)
}
  return (
    <>
      <Search findPokemon={setSearchValue} onChangeSortBy={(e)=>setSelectValue(e.target.value)} />
      <div className="btn">
        <Button onClick={prev}>Prev</Button>
        <Button onClick={next}>Next</Button>
      </div>
      <div>
      
        <ul className="pagination justify-content-center">
        <span className={"spanItemPerpage"}>{"Items Perpage:"}</span>
          {["10", "20", "50"].map((item, index) => (
            <li  className="page-item" key={index}>
              <span onClick={(e)=>setItemsPerPage(Number(e.currentTarget.innerText))} className="page-link">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {loading ? (
        <div style={spinnerWrapperStyle}>
          <Spinner style={spinnerStyle} animation="border" />
        </div>
        ) : (
          <>
            <div className="grid-container">
              {
             pokemonData.sort(predicate[selectValue]).filter(
              (pokemon)=> pokemon.abilities.find(m=>m.ability.name.includes(searchValue))||
              pokemon.name.includes(searchValue))
             .map((pokemon, i) => {
                return <Card key={i} onClickOfCard={onClickOfCard}  pokemon={pokemon} />;
              })}
            </div>
          </>
        )}
        <div className="btn">
          <Button onClick={prev}>Prev</Button>
          <Button onClick={next}>Next</Button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
