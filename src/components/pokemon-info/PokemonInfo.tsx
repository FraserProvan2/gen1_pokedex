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
    height: string;
    weight: string;
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
          <div className="row">
            <div className="col-md-6">
              <p>Height: {this.pokemon().height}, Weight: {this.pokemon().weight}</p>
            </div>
            <div className="col-md-6 pt-5">

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
