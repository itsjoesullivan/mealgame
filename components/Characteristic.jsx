module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <label>{this.props.name}</label>
        <br />
        <input type="range" min="0" max="10" step="1" onChange={this.onChange} />
      </div>
    );
  },
  onChange: function(e) {
    preferences[this.props.name] = parseInt(e.target.value);
    emitter.trigger('change');
  }
});
