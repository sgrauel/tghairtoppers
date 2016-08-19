Meteor.publish("products", function (query,options,catId) {

        console.log('query ');
        console.log(query);
        /*
        console.log('options ');
        console.log(options);
        console.log('categoryId '+catId);
        console.log('products #: ' + Products.find({}).count());
        */
        return Products.find({});
 });

Meteor.publish("categories", function () {
    return Categories.find();
});
