import React, { Component } from "react";
import Utility from "../../helpers/Utility";

// SCSS
import "./../../scss/pokemonTypes.scss";

interface Props {
  pokemonData: {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      front_shiny: string;
    };
  };
}

interface State {}

class PokemonInfo extends Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 text-center">
              <h5>
                <span className="pokemon-index">#{this.pokemon().id}</span>{" "}
                {Utility.ucFirst(this.pokemon().name)}
              </h5>
              <img
                className="pokemon-img"
                src={this.pokemon().sprites.front_default}
                alt=""
              />
            </div>
          </div>

          {/* Moves */}
          <div className="row">
            <div className="col-md-6" />
            <div className="col-md-6" />
          </div>
        </div>
      </div>
    );
  }

  pokemon() {
    return this.props.pokemonData;
  }
}

export default PokemonInfo;
