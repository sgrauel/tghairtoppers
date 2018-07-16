Session.setDefault('showNotifShop',false);
Session.setDefault('productId',-1);
Session.setDefault('hideAddToCart',true);

Template.ProductItem.events({
    "click #addToCartShop": function () {

        Session.set('showNotifShop',true);
        Session.set('productId',this.id);

        // NOTE: minor optimisation; find returns cursor and does not
        // read and return the whole collection like findOne

        let product = Products.findOne({id: this.id});

        // add properties for the following features
        /*
            * add / remove feature in shopping cart
            * quantity of item wanted by customer
         */
        product.isAdded = true;
        product.quantity = 1;

        // upsert ; if document dne, insert else update nothing
        ShoppingCart.update({id: this.id},
                {$setOnInsert: product},
                {upsert: true, multi: false});


    },
    "click #closeNotif": function () {
        Session.set('showNotifShop',false);
    }
});

Template.ProductItem.helpers({
    showNotifShop: function () {
        return Session.get('showNotifShop');
    },
    showProduct: function () {
        return Products.findOne({id: Session.get('productId')});
    },
    findImage: function () {
      const urlSource = Products.findOne({id: this.id}).images[0].src;
      const urlList = urlSource.split('/');
      const uri = urlList[urlList.length - 1];
      const imagePath = '/img/' + uri;
      return imagePath;
    },
    hideAddToCart: function () {
      if (!(this.id == 4232 || this.id == 6424)) {
        return true;
      } else {
        return false;
      }
    }
});
