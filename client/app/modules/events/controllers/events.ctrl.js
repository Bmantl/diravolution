/*jshint sub:true*/
'use strict';


angular.module('com.module.events').controller('CommentsCtrl', function($scope, $state, $stateParams, CommentsService,
                                     gettextCatalog, User) {

  $scope.comment = {};
  $scope.formFields = [{
    key: 'text',
    type: 'text',
    label: gettextCatalog.getString('Comment:'),
    required: true
  }];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

  $scope.delete = function(id) {
    CommentsService.deleteComment(id, function() {
      $scope.comments = CommentsService.getComments();
    });
  };

  $scope.like = function(id, i) {

    CommentsService.getCommentAsync(id.id, function(commentResult){
      if(commentResult.rating === undefined || commentResult.rating === null) {
        commentResult.rating = 0;
      }
      commentResult.rating = commentResult.rating + 1;

      CommentsService.upsertComment(commentResult, function() {$scope.comments[i].rating = commentResult.rating;});
    });
    //console.log(Promise.resolve(newcomment));


  };

  $scope.onSubmit = function() {

    User.getCurrent(function(user){
      $scope.comment.UserName = user.username;
      $scope.comment.discussionId = $scope.apartment.discussion.id;
      CommentsService.upsertComment($scope.comment, function(commentResponse) {
        //var commentNew = $scope.comment;
        $scope.comment.text = "";

        $scope.comments.push(commentResponse);
    });


      //$state.go('^.list');
    });
  };

   CommentsService.getApt($stateParams.apartid, function(apt){
     $scope.apartment = apt;
     $scope.comments = $scope.apartment.discussion.comments;
     console.log($scope.comments);
  });


  //if ($stateParams.id) {
  //  $scope.comment = CommentsService.getComment($stateParams.id);
  //} else {
  //  $scope.comment = {};
  //}

});
