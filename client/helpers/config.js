
// configuration for accounts-ui package
Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
});

Accounts.ui.config({
        passwordSignupFields: 'EMAIL_ONLY',
        loginPath: '/login',
        signUpPath: '/signup',
        resetPasswordPath: '/reset-password',
        profilePath: '/profile',
        onSignedInHook: () => Router.go('/Home'),
    onSignedOutHook: () => Router.go('/Home'),
    minimumPasswordLength: 6
});
