import React, { Component } from "react";

// Components
import SearchPokemon from "./search/SearchPokemon";
import NextPrevious from "./next-previous/NextPrevious";

// SCSS
import "./../scss/variables.scss";
import "./../scss/bootstrap.scss";
import "./../scss/main.scss";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

// Models
import PokemonModel from "../models/Pokemon";

// Init
const Pokemon = new PokemonModel();
library.add(faArrowCircleLeft, faArrowCircleRight, faQuestionCircle);

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

    // Search functions bound
    this.setPokemonDataById = this.setPokemonDataById.bind(this);
    this.setPokemonDataByName = this.setPokemonDataByName.bind(this);

    // Next Previous functions bound
    this.previousPokemon = this.previousPokemon.bind(this);
    this.nextPokemon = this.nextPokemon.bind(this);
    this.randomPokemon = this.randomPokemon.bind(this);
  }

  render() {
    return (
      <div className="App">
        {/* Search Box */}
        <div className="row justify-content-center mb-2">
          <div className="col-md-9">
            <SearchPokemon
              pokemonData={this.state.pokemonData}
              setByName={this.setPokemonDataByName}
              setById={this.setPokemonDataById}
            />
          </div>
        </div>

        {/* Next - Previous */}
        <div className="row justify-content-center mb-2">
          <div className="col-md-9">
            <NextPrevious
              pokemonData={this.state.pokemonData}
              previousPokemon={this.previousPokemon}
              nextPokemon={this.nextPokemon}
              randomPokemon={this.randomPokemon}
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

  previousPokemon = () => {
    this.setPokemonDataById(this.state.pokemonData.id - 1);
  };

  nextPokemon = () => {
    this.setPokemonDataById(this.state.pokemonData.id + 1);
  };

  randomPokemon = () => {
    this.setPokemonDataById(Math.floor(Math.random() * 807 + 1));
  };
}

export default App;
