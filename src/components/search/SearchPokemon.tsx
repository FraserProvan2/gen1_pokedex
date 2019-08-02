import React from "react";

// Components
import SearchInput from "./_SearchInput";

// Models
import PokemonData from "../../models/PokemonData";

interface Props {
  setPokemon: (value: any) => PokemonData;
  pokemonData: PokemonData | null;
}

interface State {
  pokemonName: string | null;
  pokemonNumbers: any[];
}

class SearchPokemon extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    // start for ID: 1
    this.state = {
      pokemonName: this.props.pokemonData ? this.props.pokemonData.name : null,
      pokemonNumbers: this.createSelectablePokemonNumbers()
    };
  }

  render(): JSX.Element {
    return (
      <div className="card">
        <div className="card-body">
          <h6>Search Pokémon</h6>

          <div className="form-row mb-2">
            {/* Select */}
            <div className="col-4">
              <select
                className="form-control text-center h-100"
                onChange={this.updatePokemonNumber.bind(this)}
                value={this.props.pokemonData ? this.props.pokemonData.id : 1}
              >
                {this.state.pokemonNumbers.map(numbers => {
                  return (
                    <option key={numbers.value} value={numbers.value}>
                      {"#" + numbers.value}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* Input */}
            <div className="col-8">
              <SearchInput
                name={this.props.pokemonData ? this.props.pokemonData.name : ""}
                searchPokemon={this.props.setPokemon}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  createSelectablePokemonNumbers(): any[] {
    let availableNumbers = [];
    for (let i = 1; i <= 807; i++) {
      availableNumbers[i] = { value: i };
    }
    return availableNumbers;
  }

  updatePokemonNumber(e: any): void {
    this.props.setPokemon(e.target.value);

    if (this.props.pokemonData) {
      this.setState({
        pokemonName: this.props.pokemonData.name
      });
    }
  }
}

export default SearchPokemon;
