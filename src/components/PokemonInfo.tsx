import React, { Component } from "react";
import Utility from "../helpers/Utility";

// Models
import PokemonData from "../models/PokemonData";
import PokemonSpeciesData from "../models/PokemonSpeciesData";

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
          <div className="row mb-3">
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
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
              <h6>Base Stats</h6>
              {this.renderBaseStats()}
            </div>
          </div>

          {/* Moves */}
          {this.renderMoves() ? this.renderMoves() : null}
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

  renderBaseStats() {
    let stats = this.pokemon().stats;
    return (
      <ul className="list-group">
        {stats.map(function(name, index) {
          return (
            <li
              className="list-group-item d-flex justify-content-between align-items-center border-white px-0"
              key={index}
            >
              {Utility.ucFirst(name.stat.name)}
              <span className="badge badge-primary badge-pill w-25">
                {name.base_stat}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  renderMoves() {
    let moves = this.props.pokemonData.moves;
    let all_moves: any = [];

    moves.forEach((current_move, index) => {
      if (moves[index].version_group_details[0].level_learned_at > 1) {
        all_moves[moves[index].version_group_details[0].level_learned_at] = {
          move: moves[index].move.name
        };
      }
    });

    if (all_moves.length > 1) {
      return (
        <div className="row">
          <div className="col-md-12">
            <h6>Moves</h6>
            <table className="table table-borderless w-100 text-center">
              <thead>
                <tr className="table-secondary rounded">
                  <th>Level Learned</th>
                  <th>Move</th>
                </tr>
              </thead>
              <tbody>
                {all_moves.map(function(current_move: any, index: number) {
                  return (
                    <tr key={index}>
                      <th className="level-col">{index}</th>
                      <th>{Utility.ucFirst(current_move.move)}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return false;
    }
  }
}

export default PokemonInfo;
