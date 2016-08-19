/*
why does getWoocommerceProducts get called twice?
 */
Meteor.methods({
    getWoocommerceProducts: function () {

        Products.remove({});

        // cast each price field from string to int
        const myfunc = function(product) {
            product.price = parseInt(product.price);
            Products.insert(product);
        };

        myjson.products.map(myfunc);

    },
    getProductCategories: function () {

            Categories.remove({});
            myjson2.product_categories.map(category => Categories.insert(category));

            Categories.insert({
                "id": 0,
                "name": "All Products",
                "slug": "",
                "parent": -1,
                "description": "",
                "display": "",
                "image": "",
                "count": 0});

    },
    getPriceMinMax: function (catId) {


        console.log('enter getPriceMinMax');
        console.log('catId: ' + catId);


        const categoryMap = new Map();
        const topLevelCategories = Categories.find({parent: {$not: {$ne: 0}}}).fetch();
        topLevelCategories.map(topLevelCategory => categoryMap.set(topLevelCategory.id,topLevelCategory.name));


        const catNameArr = [];
        const catName = categoryMap.get(catId);
        console.log(catName);
        catNameArr.push(catName);

        var query = {};

        if (catName != 'All Products' && catId != -1) {
            query = {categories: {$in: catNameArr}};
        }

        console.log("getPriceMinMaxQuery");
        console.log(query);

        // get min price

        const min1 = Products.find(query, {sort: {price: 1}});
        const min2 = min1.fetch()[0].price;

        // get max price
        const max1 = Products.find(query, {sort: {price: -1}});
        const max2 = max1.fetch()[0].price;


        console.log("min"+min2);
        console.log("max"+max2);

        const xs = [];
        xs.push(min2);
        xs.push(max2);

        console.log('exit getPriceMinMax')

        return xs;


    }
});