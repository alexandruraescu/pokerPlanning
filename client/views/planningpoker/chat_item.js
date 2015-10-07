Template.chat_item.rendered = function () {

};
Template.vote_item.helpers({
    myVoteCard : function(){
        return this.createdBy == Meteor.userId() ? "my":"they"
    },
    showVote: function(){
        var _oFindRevealVote = {
            planningSessionId: Session.get('planningSessionId') || "0",
            taskId: Session.get('taskId') || "0"
        };
        return this.createdBy == Meteor.userId() || localSession.find(_oFindRevealVote).count();
    },
    isNotMe: function () {
        return this.createdBy != Meteor.userId();
    },

})

