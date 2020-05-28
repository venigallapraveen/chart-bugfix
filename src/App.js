import React, { Component } from "react";
import Chart from "./components";

export class App extends Component {
  state = { isTooltipActive: true };
  toggleTooltip = () => {
    this.setState({
      isTooltipActive: !this.state.isTooltipActive,
    });
  };
  renderToggleButton = ({ onClick, buttonText }) => {
    return (
      <button className="button" onClick={onClick}>
        Tooltips: {buttonText}
      </button>
    );
  };
  render() {
    return (
      <section className="section">
        <section className="columns is-multiline has-text-centered">
          <div className="column is-12">
            <br />
            <br />

            <h1 className="subtitle has-text-white has-text-weight-semibold	">
              Chart
            </h1>
          </div>

          <div className="column is-12">
            {this.renderToggleButton({
              onClick: this.toggleTooltip,

              buttonText: this.state.isTooltipActive ? "On" : "Off",
            })}
            <Chart name="chart1" isTooltipActive={this.state.isTooltipActive} />
          </div>
        </section>
      </section>
    );
  }
}

export default App;
