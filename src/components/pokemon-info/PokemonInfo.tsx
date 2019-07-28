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
          {/* Pokemon Profile (Image and Name) */}
          <div className="row">
            <div className="col-md-12 text-center">
              <h5>
                <span className="pokemon-index h5">#{this.pokemon().id}</span>{" "}
                {Utility.ucFirst(this.pokemon().name)}
              </h5>
              <img
                className="pokemon-img"
                src={this.pokemon().sprites.front_default}
                alt=""
              />

              <br />
              {/* Stats */}
              {this.getType(1) ? this.renderType(1) : null}
              {this.getType(0) ? this.renderType(0) : null}
            </div>
          </div>

          {/* Information */}
          <div className="row">
            <div className="col-md-12">
              {/* Height/Weight */}
              <small>
                Height: {this.pokemon().height}
                <span className="measurement">hg</span>, Weight:{" "}
                {this.pokemon().weight}
                <span className="measurement">dm</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  pokemon() {
    return this.props.pokemonData;
  }

  getType = (slot: number): string => {
    if (slot === 0 && typeof this.pokemon().types[0] !== "undefined") {
      console.log(this.pokemon().types[0].type.name);
      return this.pokemon().types[0].type.name;
    } else if (slot === 1 && typeof this.pokemon().types[1] !== "undefined") {
      console.log(this.pokemon().types[1].type.name);
      return this.pokemon().types[1].type.name;
    }

    return "";
  };

  renderType(slot: number) {
    return (
      <span className={"type-icon " + this.getType(slot)}>
        {Utility.ucFirst(this.getType(slot))}
      </span>
    );
  }
}

export default PokemonInfo;
