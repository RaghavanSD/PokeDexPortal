import React from "react";
import {PokemonLIst,PokemonData} from "./Container/index"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
///configured basic routing on for starting and other detail/{pokemonName}
const App=()=> {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={PokemonLIst} />
          <Route exact path="/detail/:name" component={PokemonData} />
        </Switch>
      </Router>
    
    </>
  );
}

export default App;
