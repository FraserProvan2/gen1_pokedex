import React from 'react';
import SearchPokemon from './SearchPokemon';

// SCSS
import './../scss/variables.scss';
import './../scss/bootstrap.scss';

function App() {
  return (
    <div className="App">
      <div className="row">

        {/* Search Box */}
        <div className="col-md-7">
          <SearchPokemon />
        </div>

        {/* Pokemon Info */}
        <div className="col-md-5">
          <div className="card card-secondary">
            <div className="card-body">
              <h5>Pokémon Info</h5>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
