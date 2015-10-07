Template.task_item.rendered = function () {

};


Template.task_item.events({
    'click button.delete': function () {
        tasks.remove(this._id);
    },
    'click input.check': function (event) {
        var selectedTasks = Session.get('selectedTasks') || {};
        if (event.target.checked) {
            selectedTasks[this._id] = 1;
        } else {
            selectedTasks[this._id] = 0;
        }
        Session.set('selectedTasks', selectedTasks);
    }
});