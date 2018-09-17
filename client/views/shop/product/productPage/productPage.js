Session.setDefault('prodId',-1);
Session.setDefault('showNotif',false);

Template.ProductPage.onCreated(function(){
  ga('send','pageview');
});

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
    },
    findImagePaths: function () {
      const urlSourceList = Products.findOne({id: this.id}).images;
      const urlSourceListXs = urlSourceList.map(img => img.src.split('/'));
      const uriList = urlSourceListXs.map(xs => xs[xs.length - 1]);
      const imagePathList = uriList.map(uri => '/img/' + uri);
      return imagePathList;
    },
    hideAddToCart: function () {
      if (!(this.id == 4232 || this.id == 6424)) {
        return true;
      } else {
        return false;
      }
    }
});
