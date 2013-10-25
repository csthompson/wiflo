myApp.controller('current_usersCtrl', ['$scope', 'listener', 'current_usersWrapper', function($scope, listener, current_usersWrapper) {

  $scope.submit = function() {
    current_usersWrapper.add($scope.username).then(function(res) {
      $scope.username = '';
    }, function(reason) {
      console.log(reason);
    })
  };

  $scope.remove = function(id) {
    pouchWrapper.remove(id).then(function(res) {
//      console.log(res);
    }, function(reason) {
      console.log(reason);
    })
  };

  $scope.todos = [];

  $scope.$on('newTodo', function(event, todo) {
    $scope.todos.push(todo);
  });

  $scope.$on('delTodo', function(event, id) {
    for (var i = 0; i<$scope.todos.length; i++) {
      if ($scope.todos[i]._id === id) {
        $scope.todos.splice(i,1);
      }
    }
  });

}]);