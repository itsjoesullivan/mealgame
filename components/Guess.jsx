module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    if (typeof this.props.score === 'number') {
      return (
        <div>
          You should eat: {this.props.name}
        </div>
      );
    } else {
      return (
        <div>
          No guess yet!
        </div>
      );
    }
  }
});
