var Characteristic = require('./Characteristic.jsx');
var Guess = require('./Guess.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return <div>
      <h1>Mealgame</h1>
      {this.props.characteristics.map(function(characteristic) {
        return <Characteristic name={characteristic} />
      })}
      <Guess name={this.state.name} score={this.state.score} />
    </div>
  }
});
