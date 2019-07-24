import React from "react";
import Utility from "../../helpers/Utility";

interface Props {
  name: string;
}

interface State {}

class SearchInput extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <input
        className="form-control text-center"
        type="text"
        value={Utility.ucFirst(this.props.name)}
      />
    );
  }
}

export default SearchInput;
