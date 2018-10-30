Template.ShoppingCartItem.events({
    "click #remove": function () {
        ShoppingCart.update(this._id, {$set: {isAdded: false}});
        console.log('items removed');
        // hide shipping methods to recalculate total
        Session.set('showShipping',false);
    },
    "click #add": function () {
        ShoppingCart.update(this._id,{$set: {isAdded: true}});
        console.log('items added back');
        Session.set('showShipping',false);
    },
    "click #increment, click #increment5, click #increment10, click #increment100": function (event) {

        console.log(event.currentTarget.id);

        if (event.currentTarget.id == "increment") {
          ShoppingCart.update(this._id, {$set: {quantity: this.quantity + 1}});
        }

        if (event.currentTarget.id == "increment5") {
          ShoppingCart.update(this._id, {$set: {quantity: this.quantity + 5}});
        }

        if (event.currentTarget.id == "increment10") {
          ShoppingCart.update(this._id, {$set: {quantity: this.quantity + 10}});
        }

        if (event.currentTarget.id == "increment100") {
          ShoppingCart.update(this._id, {$set: {quantity: this.quantity + 100}});
        }

        Session.set('showShipping',false);
    },
    "click #decrement, click #decrement5, click #decrement10, click #decrement100": function (event) {

        if (event.currentTarget.id == "decrement" && this.quantity > 1) {
          ShoppingCart.update(this._id, {$set: {quantity: this.quantity - 1}});
        }

        if (event.currentTarget.id == "decrement5" && this.quantity > 5) {
          ShoppingCart.update(this._id, {$set: {quantity: this.quantity - 5}});
        }

        if (event.currentTarget.id == "decrement10" && this.quantity > 10) {
          ShoppingCart.update(this._id, {$set: {quantity: this.quantity - 10}});
        }

        if (event.currentTarget.id == "decrement100" && this.quantity > 100) {
          ShoppingCart.update(this._id, {$set: {quantity: this.quantity - 100}});
        }


        Session.set('showShipping', false);
    }
});


Template.ShoppingCartItem.helpers({
   isAddedFunc: function () {
       return this.isAdded;
   },
   totalPrice: function () {
       return this.price * this.quantity;
   }
});
