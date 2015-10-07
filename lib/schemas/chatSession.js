Schemas = {};
if (Meteor.isClient) {
    Template.registerHelper("Schemas", Schemas);
}

Schemas.chatSession = new SimpleSchema(
    {

        name: {
            type: String
        },
        message: {
            type: String
        },
        planningSessionId: {
            type: String
        },
        taskId: {
            type: String
        },
        createdAt: {
            type: Date
        }
    }
);


var Collections = {};
if (Meteor.isClient) {
    Template.registerHelper("Collections", Collections);
}
chatSessions = Collections.chatSessions = new Mongo.Collection("chatSessions");
chatSessions.attachSchema(Schemas.chatSession);
if (Meteor.isServer) {
    Meteor.publish("chatSessions", function (planningSessionId, taskId) {
        return chatSessions.find({planningSessionId: planningSessionId, taskId: taskId});
    });
}
chatSessions.allow({
    insert: function () {
        return true;
    },
    remove: function () {
        return false;
    },
    update: function () {
        return false;
    }
});


