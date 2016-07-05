Meteor.publish("products", function (query,options,catId) {
        console.log('query ');
        console.log(query);
        console.log('options ');
        console.log(options);
        console.log('categoryId '+catId);
        return Products.find({});
 });

Meteor.publish("categories", function () {
    return Categories.find();
});
