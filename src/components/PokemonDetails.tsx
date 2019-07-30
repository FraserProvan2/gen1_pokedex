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
              {this.renderPokemonProfile()}
            </div>
          </div>

          {/* Information */}
          <div className="row">
            <div className="col-md-6 mb-3">{this.renderDescription()}</div>
            <div className="col-md-6 mb-3">{this.renderBaseStats()}</div>
          </div>

          {/* Moves */}
          {this.renderMoves() ? this.renderMoves() : null}
        </div>
      </div>
    );
  }

  renderPokemonProfile() {
    return (
      <div>
        <img
          className="pokemon-img"
          src={this.pokemon().sprites.front_default}
          alt="pokemon-sprite"
        />
        <h3>
          <span className="pokemon-index h5">#{this.pokemon().id}</span>{" "}
          {Utility.ucFirst(this.pokemon().name)}
        </h3>

        {/* Types */}
        {this.renderType(1) ? this.renderType(1) : null}
        {this.renderType(0) ? this.renderType(0) : null}
      </div>
    );
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

  renderDescription() {
    let entries = this.props.PokemonSpeciesData.flavor_text_entries;
    let description = null;

    entries.forEach(descObj => {
      if (descObj.language.name === "en") {
        description = descObj.flavor_text;
      }
    });

    return (
      <div>
        <h6>Description</h6>
        <div className="pokemon-description p-3">
          {/* Description */}
          <small>"{description}"</small>

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
    );
  }

  renderBaseStats() {
    let stats = this.pokemon().stats;
    return (
      <div>
        <h6>Base Stats</h6>
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
      </div>
    );
  }

  renderMoves() {
    let moves = this.props.pokemonData.moves;
    let all_moves: any[] = [];

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
            <table className="table table-borderless w-100">
              <thead>
                <tr className="table-secondary">
                  <th>Level Learned</th>
                  <th>Move</th>
                </tr>
              </thead>
              <tbody>
                {all_moves.map(function(current_move: any, index: number) {
                  return (
                    <tr key={index}>
                      <th>{index}</th>
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

  pokemon() {
    return this.props.pokemonData;
  }
}

export default PokemonInfo;
