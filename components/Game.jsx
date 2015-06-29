var Characteristic = require('./Characteristic.jsx');
var Guess = require('./Guess.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    var rows = [];
    this.props.characteristics.forEach(function(characteristic) {
      rows.push(<Characteristic name={characteristic} />);
    });
    return (
      <div>
        <h1>Mealgame</h1>
        {rows}
        <Guess name={this.state.name} score={this.state.score} />
      </div>
    );
  }
});
