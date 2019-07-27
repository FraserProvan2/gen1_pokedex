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
    this.setPokemonDataByName = this.setPokemonDataByName.bind(this);
  }

  render() {
    return (
      <div className="App">

         {/* Search Box */}
        <div className="row justify-content-center">   
          <div className="col-md-8">
            <SearchPokemon
              setByName={this.setPokemonDataByName}
              setById={this.setPokemonDataById}
              pokemonData={this.state.pokemonData}
            />
          </div>
        </div>
        
      </div>
    );
  }

  setPokemonDataById = (id: number) => {
    return Pokemon.getById(id)
      .then((pokemonData: any) => {
        this.setState({ pokemonData });
      })
      .catch((error: any) => {
        this.setState({ error });
      });
  };

  setPokemonDataByName = (name: string) => {
    return Pokemon.getByName(name)
      .then((pokemonData: any) => {
        this.setState({ pokemonData });
      })
      .catch((error: any) => {
        this.setState({ error });
      });
  };
}

export default App;
