import React from "react";
import Utility from "../../helpers/Utility";

interface Props {
  setById: (id: number) => any,
  pokemonData: { 
    id: number,
    name: string 
  } 
}

interface State {
  pokemonName: string,
  pokemonNumbers: any[]
}

class SearchPokemon extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    // start for ID: 1
    this.state = { 
      pokemonName: this.props.pokemonData.name,
      pokemonNumbers: this.createSelectablePokemonNumbers()
    };

  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h6>Search Pokémon</h6>

          {/* Input */}
          <div className="form-row mb-2">
            <div className="col-3">
              <select
                className="form-control text-center"
                onChange={this.updatePokemonNumber.bind(this)}
                value={ this.props.pokemonData.id ? this.props.pokemonData.id : 1 }
              >
                {
                  this.state.pokemonNumbers.map(numbers => {
                    return (
                      <option key={numbers.value} value={numbers.value}>
                        {numbers.value}
                      </option>
                    )
                  })
                }
              </select>
            </div>
            <div className="col-9">
              <input
                className="form-control text-center"
                type="text"
                placeholder="Name"
                value={ Utility.ucFirst(this.props.pokemonData.name) ? Utility.ucFirst(this.props.pokemonData.name) : "" }
                // onChange={}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  createSelectablePokemonNumbers() {
    let availableNumbers = [];
      for (let i = 1; i <= 151; i++) { 
        availableNumbers[i] = { 'value' : i }
    }
    return availableNumbers;
  }

  updatePokemonNumber(e: any) {
    this.props.setById(e.target.value);

    this.setState({
      pokemonName: this.props.pokemonData.name
    });
  }

}

export default SearchPokemon;

//TODO
// select pokemon names from dropdown file json, that auto searches that pokemon
