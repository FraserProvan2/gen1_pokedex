import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Utility from "../../helpers/Utility";

// Models
import PokemonData from "../../models/PokemonData";

interface Props {
  pokemonData: PokemonData;
}

interface State {
  showModal: boolean;
}

class Moves extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  render(): JSX.Element | null {
    let moves = this.props.pokemonData.moves;
    let all_moves: any[] = [];

    moves.forEach((current_move, index) => {
      if (moves[index].version_group_details[0].level_learned_at > 1) {
        all_moves[moves[index].version_group_details[0].level_learned_at] = {
          move: moves[index].move.name
        };
      }
    });

    if (all_moves.length < 1) {
      return null;
    }

    return (
      <div>
        <Button variant="secondary" onClick={this.open} className="w-100">
          View Learned Moves
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
            <table className="table table-borderless w-100">
              <thead>
                <tr className="table-secondary">
                  <th>Level Learned</th>
                  <th>Move</th>
                </tr>
              </thead>
              <tbody>
                {all_moves.map(function(current_move: any, index: number) {
                  return (
                    <tr key={index}>
                      <th>{index}</th>
                      <th>{Utility.ucFirst(current_move.move)}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  getInitialState(): Object {
    return { showModal: false };
  }

  close = (): void => {
    this.setState({ showModal: false });
  };

  open = (): void => {
    this.setState({ showModal: true });
  };
}

export default Moves;
