Template.planninglist.rendered = function() {
};
Template.planninglist.helpers({
    planninglist: function(){
        return planningSessions.find();
    }
});

Template.planning_item.helpers({
    createdByUserName: function () {
        return Users.findOne({_id: this.createdBy}).emails[0].address || "";
    },

    isParticipant: function () {
        return this.createdBy == Meteor.userId() || this.participants.indexOf(Meteor.userId()) !== -1  ;
    },

    isCreator: function () {
        return this.createdBy == Meteor.userId();
    }
});
Template.planning_item.events({
    'click button': function(){
        Session.set('planningSessionId',this._id);
        Session.set('taskId',this.tasks[0]);
        Session.set('tasksIds',this.tasks);

        Router.go('planningpoker', this._id, this.tasks[0]);
    }

});