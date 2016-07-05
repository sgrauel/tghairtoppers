Template.header.helpers({
    menu: {
        home: function() { return Router.current().route.getName() == 'Home'; },
        meetTeam: function() { return Router.current().route.getName() == 'MeetTeam'; },
        shop: function() { return Router.current().route.getName() == 'Shop'; },
        contact: function() { return Router.current().route.getName() == 'Contact'; }
    }
});