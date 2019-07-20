import React, { Component } from 'react';

// Components
import SearchPokemon from './children/SearchPokemon';

// SCSS
import './../scss/variables.scss';
import './../scss/bootstrap.scss';

// Models
import PokemonModal from '../models/Pokemon';
const Pokemon = new PokemonModal;

class App extends Component {

  constructor(props: any) {
    super(props);

    this.state = {
      pokemonData: {},
      error: "",
      function: this.setPokemonDataById
    };

    this.setPokemonDataById = this.setPokemonDataById.bind(this);
  } 

  render() {
    return (
      <div className="App">
        <div className="row justify-content-center">

          {/* Search Box */}
          <div className="col-md-8">
            <SearchPokemon 
              {...this.state}
            />
          </div>

        </div>
      </div>
    );
  }
  
  // Methods

  setPokemonDataById(id: number) {
    return Pokemon.getById(id)
      .then((pokemonData: any) => {
        this.setState({ pokemonData });
      })
      .catch((error: any) => {
        this.setState({ error });
      });
  }


}

export default App;
