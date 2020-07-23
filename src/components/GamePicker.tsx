import React from 'react';
import { Redirect } from 'react-router-dom';
import { GetGamesList } from '../firebase';

export class GamePicker extends React.Component<{gameId: string}, {gamesList: Array<string>, redirect?: string}> {
  constructor(props: {gameId: string}) {
    super(props);
    this.state = {
      gamesList: [],
    };
  }

  async componentDidMount() {
    const gamesList = await GetGamesList();
    this.setState({gamesList});
  }

  onGameChanged(event: React.ChangeEvent<HTMLSelectElement>) {
    const gameName = event.target.value;
    this.setState({redirect: gameName});
  }

  render() {
    if (this.state.redirect && this.state.redirect !== this.props.gameId) {
      return <Redirect to={'/admin/' + this.state.redirect} />;
    }
    const options = this.state.gamesList.map( (game) =>
      <option value={game} key={game}>{game}</option>
    );
    return (
      <form className="game-select-form">
        <label> Game:
          <select onChange={this.onGameChanged.bind(this)} value={this.props.gameId}>
            {options}
          </select>
        </label>
      </form>
    );
  }
}

export default GamePicker;
