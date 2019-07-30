import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Models
import PokemonData from "../models/PokemonData";

interface Props {
  previousPokemon: () => void;
  nextPokemon: () => void;
  randomPokemon: () => void;
  pokemonData: PokemonData;
}

interface State {}

class ChangePokemonBar extends Component<Props, State> {
  render() {
    return (
      <div className="btn-group w-100" role="group">
        {/* Dont render less than 1 */}
        {this.pokemonNum() - 1 > 0 ? this.renderShowPrevious() : ""}{" "}
        <button
          type="button"
          className="btn btn-primary w-50"
          onClick={this.props.randomPokemon}
        >
          <FontAwesomeIcon icon="question-circle" />
        </button>
        {/* Dont render more than 807  */}
        {this.pokemonNum() + 1 < 808 ? this.renderShowNext() : ""}{" "}
      </div>
    );
  }

  renderShowPrevious() {
    return (
      <button
        type="button"
        className="btn btn-primary w-50"
        onClick={this.props.previousPokemon}
      >
        <FontAwesomeIcon icon="arrow-circle-left" />
        &nbsp;#{this.pokemonNum() - 1}
      </button>
    );
  }

  renderShowNext() {
    return (
      <button
        type="button"
        className="btn btn-primary w-50"
        onClick={this.props.nextPokemon}
      >
        #{this.pokemonNum() + 1}&nbsp;
        <FontAwesomeIcon icon="arrow-circle-right" />
      </button>
    );
  }

  pokemonNum() {
    return this.props.pokemonData.id;
  }
}

export default ChangePokemonBar;
