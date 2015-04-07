var app = angular.module("app", ['ngResource']);

app.factory('Posts', ['$resource', function($resource) {
return $resource('/posts/:id', null,
    {
        'update': { method:'PUT' }
    });
}]);

app.controller('testeCtlr', function($scope, $resource, Posts) {
    $scope.atividades = $resource('/api/atividades').query();
    /*$http.get("/api/atividades")
        .success(function(response) {
            $scope.atividades = response;
        })
        .error(function(reason) {
            $scope.error = reason;
        });*/
    $scope.submit = function(){
        var atividade = {
            nome: $scope.nome,
            descricao: $scope.descricao
        };
        if ($scope.nome && $scope.descricao) {
            $resource('/posts').save(atividade);
            $scope.atividades.push(atividade);
            //$scope.atividades = $resource('/api/atividades').query();
        }
        $scope.nome = null;
        $scope.descricao = null;
    };
    $scope.editPost = function(post){
        $scope.editedPost=post;
    };
    $scope.updatePost = function(post){
        Posts.update({ id:post._id }, post);
        $scope.editedPost=null;
        //$scope.atividades = $resource('/api/atividades').query();
    }
    $scope.deletePost = function(post){
        $resource('/posts/'+post._id).delete(post);
        $scope.atividades.splice($scope.atividades.indexOf(post),1);
        //$scope.atividades = $resource('/api/atividades').query();
    }
});


