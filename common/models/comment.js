module.exports = function(Comment) {
  Comment.beforeCreate = function(next, comment) {
    comment.date = Date.now();
    next();
  };
};
