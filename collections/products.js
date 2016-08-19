Products = new Mongo.Collection('products');
Categories = new Mongo.Collection('categories');

// define a ground db local collection for shopping cart items
/*

ground db local collection : a local collection that synchronizes data
from local storage upon creation.

Solves following problems:
  * losing data from a local collection when the page is refreshed
  * loss of data synchronization between multiple tabs for a single user's browser
  * the declaration of multiple collections

 */
if (Meteor.isClient) {
    ShoppingCart = new Ground.Collection('ShoppingCart',{connection: null});
}