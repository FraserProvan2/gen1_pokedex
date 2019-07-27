import React from "react";
import Utility from "../../helpers/Utility";

// AutoSuggest Lib
import Autosuggest from "react-autosuggest";
import "./../../scss/autosuggest.scss";

// data to AutoSuggest
import pokemonNames from "./../../pokemonNames.json";

interface Props {
  name: string;
  searchPokemon: (name: string) => any;
}

interface State {
  value: string;
  suggestions: any[];
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

  render() {
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

  onChange = (event: any, { newValue, method }: any) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }: any) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  escapeRegexCharacters(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  getSuggestions(value: string) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");

    return pokemonNames.filter(language => regex.test(language.name));
  }

  getSuggestionValue = (suggestion: any) => {
    this.props.searchPokemon(suggestion.name);

    return "";
  };

  renderSuggestion(suggestion: any) {
    return <span>{suggestion.name}</span>;
  }
}

export default SearchInput;
