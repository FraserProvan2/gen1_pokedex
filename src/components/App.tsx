import React, { Component } from 'react';

// Components
import SearchPokemon from './children/SearchPokemon';

// SCSS
import './../scss/variables.scss';
import './../scss/bootstrap.scss';

// Parent component to the application, this is where
// the State lives

class App extends Component {
  state = {};

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
