// define our app and dependencies (remember to include firebase!)
var app = angular.module("sampleApp", ["firebase"]);

// this factory returns a synchronized array of chat messages
app.factory("chatMessages", ["$firebaseArray", "$firebaseAuth",
    function($firebaseArray) {
        // create a reference to the database location where we will store our data
        // var randomRoomId = Math.round(Math.random() * 100000000);
        var ref = new Firebase("https://blistering-heat-9918.firebaseio.com/chatRoom");

        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
    }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages", "loginCtrl",
    // we pass our new chatMessages factory into the controller
    function($scope, chatMessages, loginCtrl) {
        $scope.user = loginCtrl.user;

        // we add chatMessages array to the scope to be used in our ng-repeat
        $scope.messages = chatMessages;

        // a method to create new messages; called by ng-submit
        $scope.addMessage = function() {
            // calling $add on a synchronized array is like Array.push(),
            // except that it saves the changes to our database!

            // Check if username is blank, and force adding the user.

            $scope.messages.$add({
                from: $scope.user,
                content: $scope.message
            });

            // reset the message input
            $scope.message = "";
        };

        // if the messages are empty, add something for fun!
        $scope.messages.$loaded(function() {
            if ($scope.messages.length === 0) {
                $scope.messages.$add({
                    from: "Firebase Docs",
                    content: "Hello world!"
                });
            }
        });
    }
]);

app.factory('loginService', ["$firebaseAuth",
    function($firebaseAuth) {
        var ref = new Firebase("https://blistering-heat-9918.firebaseio.com");
        return $firebaseAuth(ref);
    }
]);

app.controller('loginCtrl', ["$scope", "loginService",
    function($scope, loginService) {
        $scope.user = "brovery@yahoo.com";
        $scope.pass = "hello";

        $scope.Login = function() {
            var login = loginService.$authWithPassword({
                email: $scope.user,
                password: $scope.pass
            });


        };
    }
]);