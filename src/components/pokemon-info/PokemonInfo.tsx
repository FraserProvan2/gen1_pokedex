import React, { Component } from "react";
import Utility from "../../helpers/Utility";

// Models
import PokemonData from "../../models/PokemonData";

interface Props {
  pokemonData: PokemonData;
}

interface State {}

class PokemonInfo extends Component<Props, State> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            {/* Pokemon Profile (Image and Name) */}
            <div className="col-md-12 text-center">
              <img
                className="pokemon-img"
                src={this.pokemon().sprites.front_default}
                alt=""
              />
              <h5>
                <span className="pokemon-index h5">#{this.pokemon().id}</span>{" "}
                {Utility.ucFirst(this.pokemon().name)}
              </h5>
            </div>
          </div>

          {/* TBA */}
          <div className="row">
            <div className="col-md-12">
              <p>
                Height: {this.pokemon().height}, Weight: {this.pokemon().weight}
              </p>
            </div>
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
