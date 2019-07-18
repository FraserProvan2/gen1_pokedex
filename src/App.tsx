import React from 'react';

// SCSS
import './scss/variables.scss';
import './scss/bootstrap.scss';

function App() {
  return (
    <div className="App">
      <div className="row">

        {/* Search Box */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
            <button type="button" className="btn btn-primary btn-lg btn-block">Block level button</button>
            </div>
          </div>
        </div>

        {/* Pokemon Info */}
        <div className="col-md-6">
          <div className="card card-secondary">
            <div className="card-body">
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
