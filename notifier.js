var request = require('request');

exports.sendNotification = function(message) {
  sendNotification(message);
};

function sendNotification(message) {
  var postData =
    'token=ak6sdom331dmrcvnjkbf8gabjoxz9y&user=uud79deuu1d6hktbs9i5775phwup8y&priority=1&message=' +
    message +
    '&title=' +
    message;
  sendNotificationCore(postData);
}

exports.sendNotificationDesktop = function(message) {
  sendNotificationDesktop(message);
};

function sendNotificationDesktop(message) {
  var postData =
    'token=ak6sdom331dmrcvnjkbf8gabjoxz9y&user=uud79deuu1d6hktbs9i5775phwup8y&device=Chrome2&priority=1&message=' +
    message +
    '&title=' +
    message;
  sendNotificationCore(postData);
}

function sendNotificationCore(postData) {
  var options = {
    method: 'post',
    body: postData, // Javascript object
    json: false, // Use,If you are sending JSON data
    url: 'https://api.pushover.net/1/messages.json',
    headers: {
      // Specify headers, If any
    }
  };
  request(options, function(err, res, body) {
    if (err) {
      console.log('<p>' + 'Error :', err + '</p>');
      return;
    }
  });
}
