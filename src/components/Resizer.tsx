import React from 'react';

interface ResizerProps {
  rows: number;
  cols: number;
  submit: (rows: number, cols: number) => void;
}

interface ResizerState {
  rows: string,
  cols: string,
}

/**
 * A form that allows an admin to change the size of the map.
 */
export class Resizer extends React.Component<ResizerProps, ResizerState> {
  constructor(props: ResizerProps) {
    super(props);
    this.state = {
      rows: this.props.rows.toString(),
      cols: this.props.cols.toString(),
    };
  }

  rowsChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({rows: event.target.value});
  }

  colsChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({cols: event.target.value});
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    var rows = parseInt(this.state.rows, 10);
    if (isNaN(rows)) {
      this.setState({rows: this.props.rows.toString()});
      rows = this.props.rows;
    }

    var cols = parseInt(this.state.cols, 10);
    if (isNaN(cols)) {
      this.setState({cols: this.props.cols.toString()});
      cols = this.props.cols;
    }

    this.props.submit(rows, cols);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label> Rows: <input type='text' value={this.state.rows} onChange={this.rowsChanged.bind(this)} /> </label>
        <label> Cols: <input type='text' value={this.state.cols} onChange={this.colsChanged.bind(this)} /> </label>
        <input type="submit" value="Resize" />
      </form>
    );
  }
}

export default Resizer;
