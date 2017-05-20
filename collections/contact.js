Contacts = new Mongo.Collection('contacts');

ContactsSchema = new SimpleSchema({
    "first_name" : {
        type: String,
        label: "First Name",
        min: 1,
        max: 50,
        regEx: /^[A-Z][a-z]*$/
    },
    "last_name" : {
        type: String,
        label: "Last Name",
        min: 1,
        max: 50,
        regEx: /^[A-Z][a-z]*$/
    },
    "phone" : {
        type: String,
        label: "Phone Number",
        min: 10,
        max: 12,
        regEx: /^([2-9][0-9]{2}-[2-9][0-9]{2}-[0-9]{4})|([2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4})$/
    },
    "email" : {
        type: String,
        label: "Email Address",
        min: 3,
        max: 254,
        regEx: SimpleSchema.RegEx.Email
    },
    "mainBody" : {
        type: String,
        label: "Message",
        min: 1,
        max: 5000
    }
});

Contacts.attachSchema(ContactsSchema);

