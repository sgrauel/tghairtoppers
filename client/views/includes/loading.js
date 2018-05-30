
// Loading messages
var messages = [
    'Hey you. Welcome back!',
    'You look nice today',
    'Amazing things come to those who wait',
    'You usually have to wait for that which is worth waiting for',
    'Don\'t wait for opportunity. Create it.',
    'A day without sunshine is like, you know, night.',
    'My fake plants died because I did not pretend to water them.',
    'Weather forecast for tonight: dark.'
];

var spinners = [
// spinner-rotating-plane
    '<div class="sk-spinner sk-spinner-rotating-plane"></div>',
// spinner-double-bounce
    '<div class="sk-spinner sk-spinner-double-bounce">'
    + ' <div class="sk-double-bounce1"></div>'
    + ' <div class="sk-double-bounce2"></div>'
    + '</div>',
// spinner-double-bounce
    '<div class="sk-spinner sk-spinner-wave">'
    + ' <div class="sk-rect1"></div>'
    + ' <div class="sk-rect2"></div>'
    + ' <div class="sk-rect3"></div>'
    + ' <div class="sk-rect4"></div>'
    + ' <div class="sk-rect5"></div>'
    + '</div>',
// spinner-wandering-cubes
    '<div class="sk-spinner sk-spinner-wandering-cubes">'
    + ' <div class="sk-cube1"></div>'
    + ' <div class="sk-cube2"></div>'
    + '</div>',
// spinner-pulse
    '<div class="sk-spinner sk-spinner-pulse"></div>',
// spinner-chasing-dots
    '<div class="sk-spinner sk-spinner-chasing-dots">'
    + ' <div class="sk-dot1"></div>'
    + ' <div class="sk-dot2"></div>'
    + '</div>',
// spinner-three-bounce
    '<div class="sk-spinner sk-spinner-three-bounce">'
    + ' <div class="sk-bounce1"></div>'
    + ' <div class="sk-bounce2"></div>'
    + ' <div class="sk-bounce3"></div>'
    + '</div>',
// spinner-circle
    '<div class="sk-spinner sk-spinner-circle">'
    + ' <div class="sk-circle1 sk-circle"></div>'
    + ' <div class="sk-circle2 sk-circle"></div>'
    + ' <div class="sk-circle3 sk-circle"></div>'
    + ' <div class="sk-circle4 sk-circle"></div>'
    + ' <div class="sk-circle5 sk-circle"></div>'
    + ' <div class="sk-circle6 sk-circle"></div>'
    + ' <div class="sk-circle7 sk-circle"></div>'
    + ' <div class="sk-circle8 sk-circle"></div>'
    + ' <div class="sk-circle9 sk-circle"></div>'
    + ' <div class="sk-circle10 sk-circle"></div>'
    + ' <div class="sk-circle11 sk-circle"></div>'
    + ' <div class="sk-circle12 sk-circle"></div>'
    + '</div>',
// spinner-cube-grid
    '<div class="sk-spinner sk-spinner-cube-grid">'
    + ' <div class="sk-cube"></div>'
    + ' <div class="sk-cube"></div>'
    + ' <div class="sk-cube"></div>'
    + ' <div class="sk-cube"></div>'
    + ' <div class="sk-cube"></div>'
    + ' <div class="sk-cube"></div>'
    + ' <div class="sk-cube"></div>'
    + ' <div class="sk-cube"></div>'
    + ' <div class="sk-cube"></div>'
    + '</div>',
// spinner-wordpress
    '<div class="sk-spinner sk-spinner-wordpress">'
    + ' <span class="sk-inner-circle"></span>'
    + '</div>',
// spinner-fading-circle
    '<div class="sk-spinner sk-spinner-fading-circle">'
    + ' <div class="sk-circle1 sk-circle"></div>'
    + ' <div class="sk-circle2 sk-circle"></div>'
    + ' <div class="sk-circle3 sk-circle"></div>'
    + ' <div class="sk-circle4 sk-circle"></div>'
    + ' <div class="sk-circle5 sk-circle"></div>'
    + ' <div class="sk-circle6 sk-circle"></div>'
    + ' <div class="sk-circle7 sk-circle"></div>'
    + ' <div class="sk-circle8 sk-circle"></div>'
    + ' <div class="sk-circle9 sk-circle"></div>'
    + ' <div class="sk-circle10 sk-circle"></div>'
    + ' <div class="sk-circle11 sk-circle"></div>'
    + ' <div class="sk-circle12 sk-circle"></div>'
    + '</div>'
];

var pickRandom = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

var spinner = pickRandom(spinners);
var message = '<p class="loading-message">' + pickRandom(messages) + '</p>';


Template.loading.rendered = function () {
    if ( ! Session.get('loadingSplash') ) {
        this.loading = window.pleaseWait({
            logo: '/img/logo/logoTG_black_on_transparent300x300.png',
            backgroundColor: '#FFFFFF',
            loadingHtml: message + spinner
        });
        Session.set('loadingSplash', false); // just show loading splash once
    }
};

Template.loading.destroyed = function () {
    if ( this.loading ) {
        this.loading.finish();
    }
};
