Meteor.methods({
    /*
    TASK: gets a contact form object, sends email and inserts into collection
    INPUT: contact form object
    OUTPUT: inserting behavior
     */
    getContact: function(contactForm) {
        try {

            Email.send({
                to: "shawn.m.grauel@gmail.com",
                from: "postmaster@sandboxfe3a57e769b84679bfd7f49eff063ba2.mailgun.org",
                subject: (contactForm.first_name + ' ' + contactForm.last_name),
                text: (contactForm.mainBody + "\n\n" + contactForm.phone)
            });

            Contacts.insert(contactForm);

            return 0;
        } catch (e) {
            console.error(e);
            console.error('insert into Contacts collection failed');
            return 1;
        }
    }
});