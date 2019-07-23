import React, { Component } from "react";

// Components
import SearchPokemon from "./children/SearchPokemon";

// SCSS
import "./../scss/variables.scss";
import "./../scss/bootstrap.scss";

// Models
import PokemonModel from "../models/Pokemon";
const Pokemon = new PokemonModel();

class App extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      pokemonData: {},
      error: ""
    };

    // binding functions
    this.setPokemonDataById = this.setPokemonDataById.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="row justify-content-center">
          {/* Search Box */}
          <div className="col-md-8">
            <SearchPokemon
              setById={this.setPokemonDataById}
            />
          </div>
        </div>
      </div>
    );
  }

  // Methods

  setPokemonDataById = (id: number): any => {
    return Pokemon.getById(id)
      .then((pokemonData: any) => {
        this.setState({ pokemonData });
      })
      .catch((error: any) => {
        this.setState({ error });
      });
  };
}

export default App;
