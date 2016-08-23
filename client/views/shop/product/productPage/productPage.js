Session.setDefault('prodId',-1);
Session.setDefault('showNotif',false);

Template.ProductPage.events({
    "click #altImg": function (event) {
            let $this = $(event.target);
            $("#bigImage").attr('src',
                $($this).attr('src'));
    },
    "click #addToCart": function () {

        Session.set('showNotif',true);

        Session.set('prodId',this.id);
        let product = Products.findOne({id: this.id});
        product.isAdded = true;
        product.quantity = 1;

        // upsert ; if document dne, insert else update nothing
        ShoppingCart.update({id: this.id},
            {$setOnInsert: product},
            {upsert: true, multi: false});

    },
    "click #closeNotif": function () {
        Session.set('showNotif',false);
    }
});

Template.ProductPage.helpers({
    showNotif: function () {
        return Session.get('showNotif');
    },
    showProduct: function () {
        return Products.findOne({id: Session.get('prodId')});
    }
});