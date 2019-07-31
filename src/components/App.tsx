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
import PokemonInfo from "./pokemon-details/PokemonDetails";

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
  shiny: boolean;
}

class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      pokemonData: null,
      pokemonSpeciesData: null,
      shiny: false
    };

    // set random pokemon on render
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
   * Rendering methods
   *
   */

  render(): JSX.Element {
    return (
      <div className="App">
        {this.renderSearch()}

        {/* only render the following when pokemonData is present */}
        {this.state.pokemonData ? this.renderChangePokemonBar() : null}
        {this.state.pokemonData ? this.renderPokemonInfo() : null}
      </div>
    );
  }

  renderSearch(): JSX.Element {
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

  renderChangePokemonBar(): JSX.Element | null {
    if (!this.state.pokemonData) {
      return null;
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

  renderPokemonInfo(): JSX.Element | null {
    if (!this.state.pokemonData || !this.state.pokemonSpeciesData) {
      return null;
    }
    return (
      <div className="row justify-content-center mb-2">
        <div className="col-md-9">
          <PokemonInfo
            pokemonData={this.state.pokemonData}
            PokemonSpeciesData={this.state.pokemonSpeciesData}
            shiny={this.state.shiny}
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

  setPokemonData = (value: number): PokemonData => {
    return PokeAPI.getPokemonByName(value).then((pokemonData: PokemonData) => {
      this.rollForShiny();
      this.setState({ pokemonData });

      // Set other related data
      if (this.state.pokemonData) {
        this.setPokemonSecondaryData(this.state.pokemonData);
          if (this.state.shiny) {
            console.log("✨A Shiny " + Utility.ucFirst(this.state.pokemonData.name) + " has appread! ✨");
          }
      }
    });
  };

  setPokemonSecondaryData = (pokemonData: PokemonData): void => {
    // set Species Data
    PokeAPI.resource(pokemonData.species.url).then(
      (pokemonSpeciesData: PokemonSpeciesData) => {
        this.setState({ pokemonSpeciesData });
      }
    );
  };

  /**
   *
   * ChangePokemonBar methods
   *
   */

  previousPokemon = (): void => {
    if (this.state.pokemonData) {
      this.setPokemonData(this.state.pokemonData.id - 1);
    }
  };

  nextPokemon = (): void => {
    if (this.state.pokemonData) {
      this.setPokemonData(this.state.pokemonData.id + 1);
    }
  };

  randomPokemon = (): void => {
    this.setPokemonData(Utility.randomPokemonId());
  };

  /**
   *
   * Shiny Pokemon methods
   *
   */

  rollForShiny() {
    let shiny_roll = Math.floor(Math.random() * 10 + 1);
    let is_shiny = false;

    if (shiny_roll === 1) {
      is_shiny = true;
    }

    this.setState({
      shiny: is_shiny
    });
  }
}

export default App;
