import React from 'react';

interface Props {
  forChildOnClick: () => void;
}

interface State {}

class SearchPokemon extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    console.log(props.function);
  } 

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h6>Search Pokémon</h6>
          
          {/* Input */}
          <div className="form-row mb-2">
            <div className="col-3">
              <select className="form-control text-center">
                <option className="form-control">1</option>
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

          {/* Submit */}
          <div className="row">
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={this.props.forChildOnClick}
              >
                Go
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default SearchPokemon;