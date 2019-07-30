import React, { Component } from "react";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import SearchPokemon from "./search/SearchPokemon";
import ChangePokemonBar from "./ChangePokemonBar";
import PokemonInfo from "./PokemonDetails";

// Models
import PokemonData from "./../models/PokemonData";
import PokemonSpeciesData from "./../models/PokemonSpeciesData";

// Helpers
import Utility from "../helpers/Utility";

// PokeAPI v2
const PokeApiWrapper = require("pokedex-promise-v2");
const PokeAPI = new PokeApiWrapper();

// Init Fa
library.add(faArrowCircleLeft, faArrowCircleRight, faQuestionCircle);

interface Props {}

interface State {
  pokemonData: PokemonData | null;
  pokemonSpeciesData: PokemonSpeciesData | null;
}

class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      pokemonData: null,
      pokemonSpeciesData: null
    };

    // default ID
    this.setPokemonData(Utility.randomPokemonId());

    if (this.state.pokemonData) {
      // Search functions bound
      this.setPokemonData = this.setPokemonData.bind(this);

      // ChangePokemonBar functions bound
      this.previousPokemon = this.previousPokemon.bind(this);
      this.nextPokemon = this.nextPokemon.bind(this);
      this.randomPokemon = this.randomPokemon.bind(this);
    }
  }

  /**
   *
   * Rendering The Application
   *
   */

  render() {
    return (
      <div className="App">
        {this.renderSearch()}

        {/* only render the following when pokemonData is present */}
        {this.state.pokemonData ? this.renderChangePokemonBar() : null}
        {this.state.pokemonData ? this.renderPokemonInfo() : null}
      </div>
    );
  }

  renderSearch() {
    return (
      <div className="row justify-content-center mb-2">
        <div className="col-md-9">
          <SearchPokemon
            pokemonData={this.state.pokemonData ? this.state.pokemonData : null}
            setPokemon={this.setPokemonData}
          />
        </div>
      </div>
    );
  }

  renderChangePokemonBar() {
    if (!this.state.pokemonData) {
      return;
    }
    return (
      <div className="row justify-content-center mb-2">
        <div className="col-md-9">
          <ChangePokemonBar
            pokemonData={this.state.pokemonData}
            previousPokemon={this.previousPokemon}
            nextPokemon={this.nextPokemon}
            randomPokemon={this.randomPokemon}
          />
        </div>
      </div>
    );
  }

  renderPokemonInfo() {
    if (!this.state.pokemonData || !this.state.pokemonSpeciesData) {
      return;
    }
    return (
      <div className="row justify-content-center mb-2">
        <div className="col-md-9">
          <PokemonInfo
            pokemonData={this.state.pokemonData}
            PokemonSpeciesData={this.state.pokemonSpeciesData}
          />
        </div>
      </div>
    );
  }

  /**
   *
   * PokeAPI methods
   *
   */

  setPokemonData = (value: any) => {
    return PokeAPI.getPokemonByName(value).then((pokemonData: any) => {
      this.setState({ pokemonData });

      // Set other related data
      if (this.state.pokemonData) {
        this.setPokemonSecondaryData(this.state.pokemonData);
      }
    });
  };

  setPokemonSecondaryData = (pokemonData: any) => {
    // set Species Data
    PokeAPI.resource(pokemonData.species.url).then(
      (pokemonSpeciesData: any) => {
        this.setState({ pokemonSpeciesData });
      }
    );
  };

  /**
   *
   * ChangePokemonBar methods
   *
   */

  previousPokemon = () => {
    if (this.state.pokemonData) {
      this.setPokemonData(this.state.pokemonData.id - 1);
    }
  };

  nextPokemon = () => {
    if (this.state.pokemonData) {
      this.setPokemonData(this.state.pokemonData.id + 1);
    }
  };

  randomPokemon = () => {
    this.setPokemonData(Utility.randomPokemonId());
  };
}

export default App;
