
// configuration for accounts-ui package
Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
});

Accounts.ui.config({
        passwordSignupFields: 'EMAIL_ONLY'
});
