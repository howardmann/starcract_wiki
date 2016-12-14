

exports.index = function(req, res, next) {
  res.render('users/index');
};

exports.show = function(req, res, next) {
  res.render('users/show');
};

exports.new = function(req, res, next) {
  res.render('users/new');
};

exports.create = function(req, res, next) {
  res.send('create');
};

exports.edit = function(req, res, next) {
  res.render('users/edit');
};

exports.update = function(req, res, next) {
  res.send('update');
};

exports.destroy = function(req, res, next) {
  res.send('destroy');
};
