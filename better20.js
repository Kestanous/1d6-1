import math from 'mathjs'
parser = math.parser();
parser.set('d', function (x, dice) {
  let t = 0;
  Roller.d(x, dice).forEach(function(r) {
    t = t + r
  })
  return t;
});


if (Meteor.isClient) {
  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      parser.set('a', $('#a').val())
      parser.set('b', $('#b').val())
      parser.set('c', $('#c').val())
      let out = parser.eval($('.formula').val())
      Session.set('counter', out);
    }
  });
}

Roller = {
  diceFormula(string, context = {}) {
    string = Roller.variablize(string, context)
    console.log(string)
  },
  roll(dice) {
    return Math.floor(Math.random() * dice) + 1
  },
  d(x, dice) {
    var rolls = []
    for (var i = x; i >= 1; i--) {
      rolls.push(Roller.roll(dice))
    }
    return rolls
  },
  variablize(string, context) {
    return string.replace(/{\w+}/g, function(m) {
      return context[m.substring(1, m.length-1)] || 0;
    });
  }
}
