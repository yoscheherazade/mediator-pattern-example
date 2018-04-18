// Mediator Pattern - Another behavioral pattern like observer. The idea is to have a mediator which is basically an interface for communicating with "colleagues" (mediated object)

// An example would be something like a chatroom

// To write in ES6 declare a class and add each protype method as a class method

const User = function(name) {
  this.name = name;
  this.chatroom = null;
};

User.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
};

const Chatroom = function(name) {
  let users = {}; // list of users

  return {
    register: function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function(message, from, to) {
      if (to) {
        // Single user message
        to.receive(message, from);
      } else {
        // Broadcast mass message
        for (key in users) {
          if (users[key] !== from) {
            users[key].receive(message, from);
          }
        }
      }
    }
  };
};

const shangela = new User('Shangela');
const chichi = new User('Chi Chi');
const trixie = new User('Trixie');
const ben = new User('BenDeLaCreme');

const chatroom = new Chatroom();

// Register users
chatroom.register(shangela);
chatroom.register(chichi);
chatroom.register(trixie);
chatroom.register(ben);

shangela.send('We all know who the better queen really is', trixie);
ben.send('Welp, facts are facts!');
