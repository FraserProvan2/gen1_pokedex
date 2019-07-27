import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  previousPokemon: () => any;
  nextPokemon: () => any;
  randomPokemon: () => any;
  pokemonData: {
    id: number;
    name: string;
  };
}

interface State {}

class NextPrevious extends Component<Props, State> {
  render() {
    return (
      <div className="btn-group w-100" role="group">
        {/* Dont render less than 1 */}
        {this.pokemonNum() - 1 > 0 ? this.showPrevious() : ""}{" "}
        <button
          type="button"
          className="btn btn-primary w-50"
          onClick={this.props.randomPokemon}
        >
          <FontAwesomeIcon icon="question-circle" />
        </button>
        {/* Dont render more than 807  */}
        {this.pokemonNum() + 1 < 808 ? this.showNext() : ""}{" "}
      </div>
    );
  }

  pokemonNum() {
    return this.props.pokemonData.id;
  }

  showPrevious() {
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

  showNext() {
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
}

export default NextPrevious;
