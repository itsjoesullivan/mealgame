var List = React.createClass({
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

var Characteristic = React.createClass({
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
    window.choices[this.props.name] = parseInt(e.target.value);
    $(window).trigger('app-change');
  }
});

function makeGuess(choices) {
  var matches = [];
  var matches = options.map(function(option) {
    return {
      name: option.name,
      score: score(choices, option.characteristics)
    }
  });
  var bestMatch = _.sortBy(matches, function(match) {
    return match.score;
  })[0];
  return bestMatch;
}

function score(a, b) {
  var total = 0;
  var matchCount = 0;
  _.each(a, function(val, key) {
    if (b[key]) {
      total += Math.abs(val - b[key]);
      matchCount++;
    }
  });
  return total;
}

var Guess = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    if (typeof this.props.score is 'number') {
      return (
        <div>
          You should eat: {this.props.name} ({this.props.score})
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

var options = [
  {
    name: "Chipotle",
    characteristics: {
      spicy: 6,
      meaty: 6,
      wet: 5
    }
  },
  {
    name: "Chop't",
    characteristics: {
      meaty: 3,
      spicy: 4,
      wet: 7
    }
  },
  {
    name: "Shake Shack",
    characteristics: {
      meaty: 9,
      spicy: 1,
      wet: 6
    }
  }
  /*
  {
    name: "Iris Cafe",
    characteristics: {
      freshness: 6,
      creativity: 4
    }
  }
  */
];

window.choices = {};

function getCharacteristicsList() {
  var characteristics = [];
  options.forEach(function(option) {
    _.each(option.characteristics, function(val, key) {
      if (characteristics.indexOf(key) === -1) {
        characteristics.push(key);
      }
    });
  });
  return characteristics;
}

var game = React.render(<List characteristics={getCharacteristicsList()} choices={choices} />, document.getElementById('container'));

$(window).on('app-change', function() {
  game.setState(makeGuess(window.choices));
});
