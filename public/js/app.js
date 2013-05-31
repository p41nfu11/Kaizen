// Here's my data model
function AppViewModel() {
    self = this;

    self.tasks = ko.observableArray();

    self.dailyTasks = ko.observableArray();
    self.longerTasks = ko.observableArray();

    self.completedTasks = ko.observableArray();
    self.edit = ko.observable(false);
    self.titleDaily = ko.observable("");
    self.titleLong = ko.observable("");

    $.get('api/task/', function(data) {
  		data.forEach(function(object){
            self.addTaskToList(object)
  		});
	});

    self.addTaskToList = function(task)
    {
        if (task.completed)
        {
            self.completedTasks.push(task);
        }
        else if (self.isShortTask(task.createdDate, task.dueDate))
        {
            self.dailyTasks.push(task);
        }
        else
        {
            self.longerTasks.push(task);   
        }
    }

    self.removeTaskFromList = function(task, fromCompletedList)
    {
        if (fromCompletedList)
        {
            var index = self.completedTasks.indexOf(task);
            self.completedTasks.splice(index, 1);
        }
        else if(self.isShortTask(task.createdDate, task.dueDate))
        {
            var index = self.dailyTasks.indexOf(task);
            self.dailyTasks.splice(index, 1);
        }
        else
        {
            var index = self.longerTasks.indexOf(task);
            self.longerTasks.splice(index, 1);
        }
    }

    self.checkboxClicked = function(data){
    	console.log(data);
    	$.post('api/updateTask', data, function(updatedTask) {
            self.removeTaskFromList(data, !data.completed);
            self.addTaskToList(data);
		});	
		return true;
    };

    self.addTaskWasClicked = function(isLongTask){
        var today = new Date();
        var tomorrow = new Date(Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)));
        var nextWeek = new Date(Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)));
    	
    	var newTask = {title: isLongTask ? self.titleLong() : self.titleDaily(), createdDate: new Date(), completed: false, dueDate: isLongTask? nextWeek : tomorrow};
    	$.post('api/task', newTask, function(data) {
    		self.addTaskToList(data);
            if(isLongTask)
                self.titleLong('');
            else
                self.titleDaily('');
		});	
		
    };

    self.delTask = function(data){
		$.post('api/delTask', data, function(response) {
			console.log(data);
			self.removeTaskFromList(data, data.completed);
		});		
    };

    self.isShortTask = function(created, due)
    {
    	var TWO_DAYS = 60 * 60 * 1000 * 24;
    	if((new Date(due) - new Date(created)) < TWO_DAYS)
    		return true;
    	else
    		return false;
    }

    self.isDue = function(task)
    {
        if (new Date() > new Date(task.dueDate))
            return true;
        else
            return false;
    }
}

ko.applyBindings(new AppViewModel());
