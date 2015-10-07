Schemas = {};
if (Meteor.isClient) {
    Template.registerHelper("Schemas", Schemas);
}

Schemas.Task = new SimpleSchema(
    {
        taskId: {
            type: String,
            index: 1,
            label: "Task ID",
            unique: true
        },
        taskName: {
            type: String,
            optional: false
        },
        taskDescription: {
            type: String,
            optional: true
        },
        createdAt: {
            type: Date,
            autoform: {
                value: new Date()
            }
        },
        createdBy: {
            type: String
        },
        participant: {
            type: Boolean,
            defaultValue: true,
            label: "I want to vote into the planning session!",
            autoform: {
                value: false
            }
        }
    }
);

var Collections = {};
if (Meteor.isClient) {
    Template.registerHelper("Collections", Collections);
}
tasks = Collections.Tasks = new Mongo.Collection("Tasks");
tasks.attachSchema(Schemas.Task);
if (Meteor.isServer) {
    Meteor.publish("Tasks", function () {
        return tasks.find();
    });
    Meteor.publish("onlytasks", function (aTasksIds) {
        return tasks.find({_id: {$in: aTasksIds}});
    });
}

tasks.allow({
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
