import React, { Component } from 'react';

// Components
import SearchPokemon from './children/SearchPokemon';

// SCSS
import './../scss/variables.scss';
import './../scss/bootstrap.scss';

// Models
import PokemonModal from '../models/Pokemon';
let Pokemon = new PokemonModal;
console.log(Pokemon.getById(1));

// Parent component to the application, this is where
// the State lives

class App extends Component {
  state = {
    pokemonData: Pokemon.getById(1)
  };

  render() {
    return (
      <div className="App">
        <div className="row justify-content-center">

          {/* Search Box */}
          <div className="col-md-8">
            <SearchPokemon />
          </div>

        </div>
      </div>
    );
  }
}

export default App;
