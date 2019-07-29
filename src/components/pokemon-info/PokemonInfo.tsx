import React, { Component } from "react";
import Utility from "../../helpers/Utility";

// Models
import PokemonData from "../../models/PokemonData";
import PokemonSpeciesData from "../../models/PokemonSpeciesData";

interface Props {
  pokemonData: PokemonData;
  PokemonSpeciesData: PokemonSpeciesData;
}

interface State {}

class PokemonInfo extends Component<Props, State> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          {/* Pokemon Profile (Image and Name) */}
          <div className="row mb-2">
            <div className="col-md-12 text-center">
              <img
                className="pokemon-img"
                src={this.pokemon().sprites.front_default}
                alt=""
              />
              <h3>
                <span className="pokemon-index h5">#{this.pokemon().id}</span>{" "}
                {Utility.ucFirst(this.pokemon().name)}
              </h3>

              {/* Types */}
              {this.renderType(1) ? this.renderType(1) : null}
              {this.renderType(0) ? this.renderType(0) : null}
            </div>
          </div>

          {/* Information */}
          <div className="row">
            <div className="col-md-6 mb-2">
              <h6>Description</h6>
              <div className="pokemon-description p-3">
                {/* Description */}
                <small>"{this.getEnglishDescription()}"</small>

                <hr />

                {/* Height/Weight */}
                <div className="small text-center">
                  Height: {this.pokemon().height}
                  <span className="measurement">hg</span>, Weight:{" "}
                  {this.pokemon().weight}
                  <span className="measurement">dm</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h6>Base Stats</h6>
            </div>
          </div>

          {/* Moves */}
          <div className="row">
            <div className="col-md-6">
              <h6>Moves</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }

  pokemon() {
    return this.props.pokemonData;
  }

  renderType = (slot: number) => {
    if (Utility.isset(this.pokemon().types[slot])) {
      let type = this.pokemon().types[slot].type.name;
      return (
        <span className={"type-icon " + type}>{Utility.ucFirst(type)}</span>
      );
    }
    return null;
  };

  getEnglishDescription() {
    let entries = this.props.PokemonSpeciesData.flavor_text_entries;
    let description = null;

    entries.forEach(descObj => {
      if (descObj.language.name === "en") {
        description = descObj.flavor_text;
      }
    });

    return description;
  }
}

export default PokemonInfo;
