Template.dashboard.rendered = function () {

};

Template.planningpoker.helpers({
    chatMessages: function () {
        return chatSessions.find({}, {sort: {createdAt: -1}});
    },
    voteMessages: function () {
        return voteSessions.find({}, {sort: {createdAt: -1}});
    },
    users: function () {
        return Users.find({});
    },

    isCreator: function () {
        return true;
        //planningSessions.findOne({}).createdBy == Meteor.userId();
    },

    storyNumbers: function () {
        var currentTask = (Session.get('currentTaskPosition') || 0) + 1;
        return currentTask + '/' + (tasks.find().fetch().length || 0);
    },
    storyName: function () {
        var taskId = Session.get('taskId') || "0";
        return tasks.findOne({_id: taskId}).taskName || '';
    },

    storyDescription: function () {
        var taskId = Session.get('taskId') || "0";
        return tasks.findOne({_id: taskId}).taskDescription || '';
    },

    moreThanZero: function (messages) {

        if (messages.length > 0) {
            return true;
        } else {
            return false;
        }
    }

});


Template.planningpoker.events({
    'submit #chatSubmit': function (e) {
        e.preventDefault();
        var a = {
            name: Meteor.user().emails[0].address,
            message: $('#enterMessage').val(),
            planningSessionId: Session.get('planningSessionId') || "0",
            taskId: Session.get('taskId') || "0",
            createdAt: new Date()

        };
        $('#enterMessage').val("");
        chatSessions.insert(a);
        return false;
    },
    'click .card2': function (e) {
        e.preventDefault();

        var _oFindVote = {
            planningSessionId: Session.get('planningSessionId') || "0",
            taskId: Session.get('taskId') || "0",
            createdBy: Meteor.userId(),
            voteRound: Session.get('voteRound') || 0
        }
        if (!voteSessions.find(_oFindVote).count()) {
            var a = {
                name: Meteor.user().emails[0].address,
                vote: $(e.target).data('value'),
                voteRound: Session.get('voteRound') || 0,
                planningSessionId: Session.get('planningSessionId') || "0",
                taskId: Session.get('taskId') || "0",
                createdAt: new Date()
            };
            voteSessions.insert(a);
        }
        else {
            alert('You already voted for this session!');
        }
        return false;
    },
    'click .card-votemy': function (e) {
        e.preventDefault();
        var _oFindRevealVote = {
            planningSessionId: Session.get('planningSessionId') || "0",
            taskId: Session.get('taskId') || "0"
        };
        if (localSession.find(_oFindRevealVote).count()) {
            alert('vote was revealed');
            return false;
        }
        var _vote = $(e.target).data('value') || $(e.target).find('p').data('value');
        if (_vote) {
            var _oFindVote = {
                planningSessionId: Session.get('planningSessionId') || "0",
                taskId: Session.get('taskId') || "0",
                createdBy: Meteor.userId(),
                vote: _vote,
                voteRound: Session.get('voteRound') || 0
            };
            voteSessions.remove({_id: voteSessions.findOne(_oFindVote)._id});
        }
        return false;
    },
    'click .reveal': function (e) {
        e.preventDefault();
            var _oFindRevealVote = {
                planningSessionId: Session.get('planningSessionId') || "0",
                taskId: Session.get('taskId') || "0"
            };
        if (!localSession.find(_oFindRevealVote).count()) {
            localSession.insert(_oFindRevealVote);
        }
        return false;
    }

});