Template.tasklist.rendered = function () {
    Session.set('selectedTasks', {});
};
Template.tasklist.helpers({
    tasks: function () {
        return tasks.find();
    },
    disabledCreateStory: function () {
        return !Session.get('selectedTasks') ? 'disabled' : "";
    }
});
