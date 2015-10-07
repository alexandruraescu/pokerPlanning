Template.addtask.rendered = function () {

};

Template.addtask.events({
    'click button.cancel': function () {
        Router.go('tasklist');
    }
});

AutoForm.addHooks('insertTaskList', {
    onSuccess: function (operation, result) {
        Router.go('tasklist');
    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
        return false;
    },
    onError: function (insertDoc, updateDoc, currentDoc) {
        alert('A error has occured please try again later!');
        return false;
    }
});