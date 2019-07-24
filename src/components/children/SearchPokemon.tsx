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
  pokemonName: string
}

class SearchPokemon extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    // start for ID: 1
    this.state = { 
      pokemonName: this.props.pokemonData.name
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
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
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

  updatePokemonNumber(e: any) {
    this.props.setById(e.target.value);

    this.setState({
      pokemonName: this.props.pokemonData.name
    });
  }

}

export default SearchPokemon;

// TODO
// 1. for loop to calc select number 1-151
// 2. Fix Failed prop type: You provided a `value` error
