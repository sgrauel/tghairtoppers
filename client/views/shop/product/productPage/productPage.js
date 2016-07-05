Session.setDefault('showNotif',false);

Template.ProductPage.events({
    "click #altImg": function (event) {
            var $this = $(event.target);
            $("#bigImage").attr('src',
                $($this).attr('src'));
    },
    "click #addToCart": function () {
        Session.set('showNotif',true);
    },
    "click #closeNotif": function () {
        Session.set('showNotif',false);
    }
});

Template.ProductPage.helpers({
    showNotif: function () {
        return Session.get('showNotif');
    }
});