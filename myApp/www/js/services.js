angular.module('starter.services', [])

  .factory('Chats', ['$http', function ($http) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = {};

    getData().then(function(data) {
      chats.data = data;
    });

    function getData() {
      return $http.get('http://swapi.co/api/people')
        .then(function(response) {
          console.log(response.data.results);
          return response.data.results;
        });
    }


    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  }]);
