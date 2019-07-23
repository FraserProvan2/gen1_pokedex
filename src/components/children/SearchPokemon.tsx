import React from "react";

interface Props {
  setById: (id: number) => any,
}

interface State {
  pokemonNumber: 1,
}

class SearchPokemon extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      pokemonNumber: 1
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
                value={this.state.pokemonNumber}
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
              />
            </div>
          </div>
          
        </div>
      </div>
    );
  }

  updatePokemonNumber(e: any) {
    this.setState({
      pokemonNumber: e.target.value
    });

    this.props.setById(this.state.pokemonNumber);
  }
}

export default SearchPokemon;

// TODO
// 1. WHEN MOUNTED, automatically call setById to 1
// 2. for loop to calc select number 1-151
// 3. if pokemonData prop (to be passed) is set, use this value for pokemon number/name
