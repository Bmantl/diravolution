'use strict';
var app = angular.module('com.module.aptPage');

app.service('CommentsService', ['$state', 'CoreService', 'Comment', 'gettextCatalog', 'Apartment', 'Ticket', function($state,
                                                                                         CoreService, Comment, gettextCatalog, Apartment, Ticket) {
  this.getApt = function(apartid, cb) {
    Apartment.findOne({filter : {where:{id: apartid}, include: [{discussion: 'comments'}]}}, function(apt){
      cb(apt);
    } );
  };

  this.getTkt = function(apartid, cb) {
    Ticket.findOne({filter :{where: { apartmentId : apartid}}}, function(tkt){
      cb(tkt);
    });
  };


  this.getComments = function(apartid) {
    Apartment.findOne({filter : {where:{id: apartid}, include: [{tickets: 'area'},{discussion: 'comments'} ]}}, function(apt){
      return apt.discussion.comments;
    } );

    return Comment.find('{apartmentId: }');
  };

  this.getComment = function(id) {
    return Comment.findById({
      id: id
    });
  };

  this.getCommentAsync = function(id, cb) {
    Comment.findById({
      id: id
    }, function(comment){
      cb(comment);
    });
  };

  this.upsertComment = function(comment, cb) {
    Comment.upsert(comment, function(commentResponse) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Comment saved'), gettextCatalog.getString(
        'Your comment is safe with us!'));
      cb(commentResponse);
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
