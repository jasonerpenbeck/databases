var app = {};
app.defaultRoom = 'default';
app.roomChoice = app.defaultRoom;
app.server = 'http://127.0.0.1:3000/classes/messages';
// app.server = 'https://api.parse.com/1/classes/chatterbox';
app.friends = [];
app.username = 'Anon';

app.init = function () {

  $('#main').on('click','a.username',function(e) {
    e.preventDefault();
    app.addFriend();
  });

  $('input.submit').on('click',function(e) {
    e.preventDefault();
    app.handleSubmit();
  });

  $('#addRoom').on('click',function(e) {
    e.preventDefault();
    var $roomNameValue = $('#addRoomName').val();
    app.addRoom($roomNameValue);
  });

  $('#roomSelect').on('change',function(e) {
    e.preventDefault();
    var roomValue = $('select option:selected').text();
    app.roomChoice = roomValue;
    app.fetch(app.addMessages,roomValue);
  });

  $('#chats').on('click', 'a.username', function(e) {
    e.preventDefault();
    e.stopPropagation();
    app.addFriend($(this).text());
  });
  // Retrieve most recent messages every 30 seconds
  app.fetch(app.addMessages);

  setInterval(function() {
    app.clearMessages();

    // need to pass room value if there is one
    app.fetch(app.addMessages,app.roomChoice);
  }, 3000);
};

app.send = function (message, callback) {
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      callback(message);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function (callback,room) {
  var parameters = '{}';

  if(room !== undefined) {
    parameters = 'where='+JSON.stringify({'roomname': room});
  }

  $.ajax({
    url: this.server,
    // data: {"order": "-createAt"},
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      callback(data);
    },
    error: function(xhr, status, errorThrown) {
      callback(status);
      console.log('Sorry, but we could not fetch any messages.');
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.addMessages = function(results) {
  app.clearMessages();

  results = results.results;

  for(var i =0; i < results.length; i++) {
    // console.log('results [i]',results[i]);
    app.addMessage(results[i]);
  }
};

app.addMessage = function(message) {
  var $chats = $('#chats');
  var $message = $('<div/>');
  var $user = $('<a/>', {
    href: '#',
    html: _.escape(message.username)
  });

  $user.addClass('username');

  if(app.friends.indexOf(message.username) !== -1) {
    $message.addClass('friend');
  }

  $message.append($user)
    .append(' (' + $.timeago(message.createdAt) + ') ' + _.escape(message.text));

  $chats.append($message);
};

app.displayMessage = function(message) {
  var $chats = $('#chats');
  var $message = $('<div/>');
  var $user = $('<a/>', {
    href: '#',
    html: _.escape(message.username)
  });

  $user.addClass('username');

  if(app.friends.indexOf(message.username) !== -1) {
    $message.addClass('friend');
  }

  $message.append($user)
    .append('(just now)' + _.escape(message.text));

  $chats.prepend($message);
}

app.addRoom = function(room) {
  var $option = $('<option>' + room + '</option>');
  $option.attr('value',room);
  $('#roomSelect').append($option);
};

app.addFriend = function(friend) {
  if(app.friends.indexOf(friend) === -1) {
    app.friends.push(friend);
  }
};

app.handleSubmit = function() {
  var message = {};
  // TODO: do these need to be escaped?
  message.username = app.username || 'Anonymous';
  message.text = $('#message').val();
  message.roomname = app.roomChoice;

  app.send(message,app.displayMessage);
  // app.fetch(app.addMessages,app.roomChoice);
};
