Template.addplanning.rendered = function () {
    if (!Session.get('selectedTasks')) {
        Router.go('tasklist');
    }

};
Template.addplanning.helpers({
    tasks: function () {
        return tasks.find();
    },
    users: function () {
        return Users.find();
    }
});


Template.addplanning.events({
    'click button.cancel': function () {
        Router.go('tasklist');
    }
});


planningSessions.before.insert(function (userId, doc) {
    doc.tasks = [];
    doc.participants = [];
    jQuery('input.participants[type=checkbox]:checked').each(function () {
        doc.participants.push(this.value);
    });
    jQuery('input.tasks[type=hidden]').each(function () {
        doc.tasks.push(this.value);
    });

    doc.createdAt = moment().toDate();
    doc.createdBy = userId;
});

AutoForm.addHooks('insertPlanningSession', {
    onSuccess: function (operation, result) {
        Router.go('planninglist');
    },
    beforeSubmit: function () {

    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
        console.log(arguments);
        return false;
    },
    onError: function (insertDoc, updateDoc, currentDoc) {
        console.log(arguments);
        alert('A error has occured please try again later!');
        return false;
    }
});