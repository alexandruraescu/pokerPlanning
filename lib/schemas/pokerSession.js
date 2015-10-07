Schemas = {};
if (Meteor.isClient) {
    Template.registerHelper("Schemas", Schemas);
}

Schemas.pokerSession = new SimpleSchema(
    {
        sessionName: {type: String},
        sessionDescription: {type: String},
        //tasks:{
        //    type: Array,
        //    optional: false
        //},
        //players:{
        //    type: Array,
        //    optional: false
        //},
        cards: {
            type: Object,
            optional: false
        },

        "cards.player": {
            type: String
        },
        "cards.value": {
            type: Number
        }
    }
);


var Collections = {};
if (Meteor.isClient) {
    Template.registerHelper("Collections", Collections);
}
pokerSessions = Collections.pokerSessions = new Mongo.Collection("PokerSessions");
pokerSessions.attachSchema(Schemas.pokerSession);
if (Meteor.isServer) {
    Meteor.publish("PokerSessions", function () {
        return pokerSessions.find();
    });
}
pokerSessions.allow({
    insert: function () {
        return true;
    },
    remove: function () {
        return true;
    },
    update: function () {
        return true;
    }

});

