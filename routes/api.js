
/*
 * get API
 */

var task = require('../models/task');


exports.task = function(req, res){
  	process.nextTick(function(){
		var query = task.find({'fbId': req.user.fbId});
		query.exec(function(err, tasks){
			res.send(tasks);
		});
	});
};

exports.delTask = function (request, response) {
	task.find({ _id:request.body._id },function(err,docs){
	    if(err)
	    {
	    	response.send(404);
	    }
	    else{
	    	console.log('found one. Deleting...');
	    	docs.forEach(function(doc){
	    		doc.remove();
	    	});
	    	response.send(200);
	    }
	});
	
};

exports.addTask = function (request, response) {
    var data = request.body;
    var newTask = new task();
    newTask.title = data.title || 'Default title';
    newTask.text = data.description || 'Default description';
    newTask.createdDate = data.createdDate || new Date();
    newTask.dueDate = data.dueDate || new Date();
    newTask.completed = data.completed || false;
    newTask.fbId = request.user.fbId || 0;

    newTask.save(function(err){
		if(err){
			throw err;
		}
		console.log("New task " + newTask.title + " was created");
		response.send(200, newTask);
	});	
};

exports.updateTask = function(request, response){
	var data = request.body;
	task.findOne({ _id:data._id },function(err,doc){
	    if(err)
	    {
	    	response.send(404);
	    }
	    else{
	    	console.log('found one. Updating...');
	    	
	    	doc.completed = data.completed;
	    	doc.save(function(err){
				if(err){
					throw err;
				}

				console.log("Updated task " + doc.title );
				response.send(200, doc);
			});	
	    }
	});
}

