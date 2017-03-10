Session.setDefault("modalNum",-1);

Template.footer.events({
    'click #viewShippingPolicy' : function () {
        Session.set("modalNum",1);
        console.log("modalNum === " + Session.get("modalNum"));
        $('#genericModal').modal('show');
        $('#genericModal').modal('attach events','#genericModalButton','hide');
    },
    'click #viewPrivacyPolicy' : function () {
        Session.set("modalNum",2);
        console.log("modalNum === " + Session.get("modalNum"));
        $('#genericModal').modal('show');
        $('#genericModal').modal('attach events','#genericModalButton','hide');
    },
    'click #viewTermsOfUse' : function () {
        Session.set("modalNum",3);
        console.log("modalNum === " + Session.get("modalNum"));
        $('#genericModal').modal('show');
        $('#genericModal').modal('attach events','#genericModalButton','hide');
    }
});

/*
Template.registerHelper( 'equals', a1 => {
    return Session.get("modalNum") === a1;
});
*/

Template.footer.helpers({
    equals: function (a1) {
        return Session.get("modalNum") === a1;
    }
});




/*

 $('#shippingModal').modal('show');
 $('#shippingModal').modal('attach events','#shippingModalButton','hide');
 */