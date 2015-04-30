'use strict';
var app = angular.module('com.module.events');

app.service('CommentsService', ['$state', 'CoreService', 'Comment', 'gettextCatalog', function($state,
                                                                                         CoreService, Comment, gettextCatalog) {

  this.getComments = function() {
    return Comment.find();
  };

  this.getComment = function(id) {
    return Comment.findById({
      id: id
    });
  };

  this.upsertComment = function(comment, cb) {
    Comment.upsert(comment, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Comment saved'), gettextCatalog.getString(
        'Your comment is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving comment '), gettextCatalog.getString(
        'This comment could no be saved: ') + err);
    });
  };

  this.deleteComment = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Comment.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'comment deleted'), gettextCatalog.getString(
            'Your comment is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting comment'), gettextCatalog.getString(
            'Your comment is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };

}]);
