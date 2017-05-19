if (Meteor.isServer) {

    Accounts.onCreateUser(function (options, user) {


        // Use provided profile in options, or create an empty profile object
        user.profile = options.profile || {};
        user.roles = ["User"];

        const userId = user._id;

        // Add additional fields
        if (userId) {

            // we wait for Meteor to create the user before sending an email
            Meteor.setTimeout(function () {
                Accounts.sendVerificationEmail(userId);
            }, 2 * 1000);

            /*
             Email.send({
             to: "shawn.m.grauel@gmail.com",
             from: "postmaster@sandboxfe3a57e769b84679bfd7f49eff063ba2.mailgun.org",
             subject: "It works!",
             text: userIdStr
             });
             */

            console.log(userId);
            console.log("verification email sent");
        }


        return user;
    });

}