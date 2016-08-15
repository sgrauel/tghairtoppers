Meteor.methods({
    getContact: function(contactForm) {
        try {
            Contacts.insert(contactForm);
            return 0;
        } catch (e) {
            console.error(e);
            console.error('insert into Contacts collection failed');
            return 1;
        }
    }
});