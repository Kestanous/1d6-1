import math from 'mathjs'

if (Meteor.isClient) {
  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    formula: function () {
      return Session.get('formula');
    }
  });

  Template.hello.events({
    'click button': function () {
      let string = $('.formula').val()
      , obj = {
        a: $('#a').val(),
        b: $('#b').val(),
        c: $('#c').val()
      }
      string = Roller.diceFormula(string, obj)
      Session.set('formula', string);
      Session.set('counter', math.eval(string));
    }
  });
}

Roller = {
  diceFormula(string, context = {}) {
    string = Roller.variablize(string, context)
    console.log(string)
    string = Roller.diceNotation(string)
    console.log(string)
    return string
  },
  roll(dice) {
    return Math.floor(Math.random() * dice) + 1
  },
  d(x, dice) {
    var rolls = []
    for (var i = x; i >= 1; i--) {
      rolls.push(Roller.roll(dice))
    }
    return `(${rolls.join(' + ')})`
  },
  variablize(string, context) {
    return string.replace(/{.+?}/g, function(m) {
      return m.substring(1, m.length-1).split('.').reduce((o,i)=> { return o[i] || {} }, context) || 0;
    });
  },
  diceNotation(string) {
    return string.replace(/(\d+|\(.+\))d(\d+|\(.+\))/g, function(m) {
      let split = m.split('d')
      return Roller.d(math.eval(split[0]), math.eval(split[1]))
    });
  }
}
