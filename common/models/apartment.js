module.exports = function(Apartment) {
  Apartment.afterCreate = function(next) {
    var D = Apartment.app.models.Discussion;
    var d = {"apartmentId":  this.id};
    D.create(d, function(err, newD){
      if (err){
        return;
      }
    })
    next();
  }

};
