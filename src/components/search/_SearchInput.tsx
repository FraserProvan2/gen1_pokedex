import React from "react";
import Utility from "../../helpers/Utility";

// AutoSuggest Lib
import Autosuggest from "react-autosuggest";
import "./../../scss/autosuggest.scss";

// data to AutoSuggest
import pokemonNames from "../../data/pokemonNames.json";

interface Props {
  name: string;
  searchPokemon: (name: string) => any;
}

interface State {
  value: string;
  suggestions: Object[];
}

class SearchInput extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: Utility.ucFirst(this.props.name)
        ? Utility.ucFirst(this.props.name)
        : "",
      suggestions: []
    };
  }

  render(): JSX.Element {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: Utility.ucFirst(this.props.name)
        ? Utility.ucFirst(this.props.name)
        : "",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }

  onChange = (event: any, { newValue, method }: any): void => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }: any): void => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = (): void => {
    this.setState({
      suggestions: []
    });
  };

  escapeRegexCharacters(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  getSuggestions(value: string): any[] {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");

    return pokemonNames.filter(pokemon => regex.test(pokemon.name));
  }

  getSuggestionValue = (suggestion: any): string => {
    this.props.searchPokemon(suggestion.name);
    console.log(suggestion);
    return "";
  };

  renderSuggestion(suggestion: any): JSX.Element {
    return <span>{Utility.ucFirst(suggestion.name)}</span>;
  }
}

export default SearchInput;
