import React, { Component } from "react";

// Components
import SearchPokemon from "./search/SearchPokemon";

// SCSS
import "./../scss/variables.scss";
import "./../scss/bootstrap.scss";

// Models
import PokemonModel from "../models/Pokemon";
const Pokemon = new PokemonModel();

interface Props {}

interface State {
  pokemonData: {
    id: number;
    name: string;
  };
  error: "";
}

class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      pokemonData: {
        id: 1,
        name: ""
      },
      error: ""
    };

    // default ID
    this.setPokemonDataById(1);

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
              pokemonData={this.state.pokemonData}
            />
          </div>
        </div>
      </div>
    );
  }

  // Methods

  setPokemonDataById = (id: number) => {
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
