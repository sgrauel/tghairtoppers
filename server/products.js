Meteor.methods({
    /*
     TASK: inserts products into collection and casts the price property to int from string
     INPUT: nil
     OUTPUT: inserting behavior
     */
    getWoocommerceProducts: function () {

        Products.remove({});

        // cast each price field from string to int
        const myfunc = function(product) {
            product.price = parseInt(product.price);
            Products.insert(product);
        };

        myjson.products.map(myfunc);

    },
    /*
    TASK: inserts top level category objects into collection
    INPUT: nil
    OUTPUT: inserting behavior
     */
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
    /*
    * TASK: gets the minimum and maximum price for a given category by id
    * INPUT: category id
    * OUTPUT: a 2 element array with the minimum and maximum price
    * */
    getPriceMinMax: function (catId) {

        // creating a map of categories to category names
        const categoryMap = new Map();
        const topLevelCategories = Categories.find({parent: {$not: {$ne: 0}}}).fetch();
        topLevelCategories.map(topLevelCategory => categoryMap.set(topLevelCategory.id,topLevelCategory.name));


        // formulate query to get min and max price for a given category
        const catNameArr = [];
        const catName = categoryMap.get(catId);
        console.log(catName);
        catNameArr.push(catName);

        var query = {};
        if (catName != 'All Products' && catId != -1) {
            query = {categories: {$in: catNameArr}};
        }

        // get min price
        const min1 = Products.find(query, {sort: {price: 1}});
        const min2 = min1.fetch()[0].price;

        // get max price
        const max1 = Products.find(query, {sort: {price: -1}});
        const max2 = max1.fetch()[0].price;

        const xs = [];
        xs.push(min2);
        xs.push(max2);

        return xs;

    }
});