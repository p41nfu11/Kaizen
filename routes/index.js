
/*
 * GET home page.
 */

exports.index = function(req, res){
  	res.render('index', { title: 'Kaizen', subtitle: '改善' });
};

exports.list = function(req, res){
  	res.render('list', { title: 'Kaizen', subtitle: '改善' });
};

exports.loggedin = function(req,res){
	res.render('loggedin', { title: 'Kaizen', subtitle: '改善', user: req.user});
};