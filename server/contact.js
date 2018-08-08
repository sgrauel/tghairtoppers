Meteor.methods({
    /*
    TASK: gets a contact form object, sends email and inserts into collection
    INPUT: contact form object
    OUTPUT: inserting behavior
     */
    getContact: function(contactForm) {

        try {

            // insert validated contact form into Contact collection
            // * schema catches invalid forms
            Contacts.insert(contactForm);


            // send an email with contact form info
            Email.send({
                to: Meteor.settings.private.mailgun.to,
                from: Meteor.settings.private.mailgun.from,
                subject: (contactForm.first_name + ' ' + contactForm.last_name),
                text: (contactForm.mainBody + "\n\n" + contactForm.phone)
            });

            // return zero on success
            return 0;
        } catch (e) {
            console.error(e);
            console.error('insert into Contacts collection failed');
            // return 1 on failure
            return 1;
        }
    }
});
