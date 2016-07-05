let _data = [];
const dataDeps = new Tracker.Dependency;

let _categories = [];
const catDeps = new Tracker.Dependency;

parentCategoryId = function () {
    dataDeps.depend();
    return _data;
};

data = function () {
    dataDeps.depend();
    return _parentCategoryId;
};

dataLength = function () {
    dataLengthDeps.depend();
    return _dataLength;
};

categoriesReact = function () {
    catDeps.depend();
    return _categories;
};

/*
why does getWoocommerceProducts get called twice?
 */
Meteor.methods({
    getWoocommerceProducts: function () {

        console.log('call getWoocommerceProducts');
        console.log("setInterval in getWoocommerceProducts calls Product API!!!");

       const intervalId = Meteor.setInterval(function () {

           console.log('HTTP call to Product API!!!')

            try {
                // make the API call to Woocommerce v.3 and return a list of products
                const result = HTTP.call('GET', 'https://www.tghairtoppers.com/wc-api/v3/products', {
                    params: {
                        "consumer_key": 'ck_746d444c14ff742fad344574f02c5bb47ff3fd87',
                        "consumer_secret": 'cs_bcf81e1a4b9c66afd3ea4388536bcef7631775b9', "filter[limit]": 21
                    }
                });

                _data = result.data.products;
                dataDeps.changed();

                Products.remove({});

                console.log("insert into Products source collection in getWoocommerceProducts");

                _data.map(product => Products.insert(product));

            } catch (e) {
                console.log(e);
            }

        },300000);

        Meteor.clearInterval(intervalId);
    },
    getProductCategories: function () {


        console.log("getProductCategories calls Meteor.setInterval");
        const intervalId = Meteor.setInterval(function () {

            try {
                console.log("begin try of callback to Meteor.setInterval");
                // make the API call to Woocommerce v.3 and return a list of categories of products
                const result = HTTP.call('GET', 'https://www.tghairtoppers.com/wc-api/v3/products/categories', {
                    params: {
                        "consumer_key": 'ck_746d444c14ff742fad344574f02c5bb47ff3fd87',
                        "consumer_secret": 'cs_bcf81e1a4b9c66afd3ea4388536bcef7631775b9',
                        "filter[limit]": 10
                    }
                });

                _categories = result.data.product_categories;
                catDeps.changed();

                Categories.remove({});

                _categories.map(category => Categories.insert(category));
                Categories.insert({
                    "id": 0,
                    "name": "All Products",
                    "slug": "",
                    "parent": -1,
                    "description": "",
                    "display": "",
                    "image": "",
                    "count": 0});

            } catch (e) {
                console.log(e);
            }
        },30000);

        Meteor.clearInterval(intervalId);

    },
    getPriceMinMax: function (catId) {

        console.log('enter getPriceMinMax');
        console.log('catId: ' + catId);

        const categoryMap = new Map();
        const topLevelCategories = Categories.find({parent: {$not: {$ne: 0}}}).fetch();
        topLevelCategories.map(topLevelCategory => categoryMap.set(topLevelCategory.id,topLevelCategory.name));


        const catNameArr = [];
        const catName = categoryMap.get(catId);
        catNameArr.push(catName);

        // convert price field from string to number
        Products.find({}).forEach(function (x) {
            return Products.update({_id: x._id}, {$set: {"price": parseInt(x.price)}});
        });

        let query = {};

        if (catId != 0 && catName != 'All Products') {
            query = {categories: {$in: catNameArr}};
        }

        // get min price
        const min = Products.find(query, {sort: {price: 1}}).fetch()[0].price;

        // get max price
        const max = Products.find(query, {sort: {price: -1}}).fetch()[0].price;


        console.log("min"+min);
        console.log("max"+max);
        const xs = [];
        xs.push(min);
        xs.push(max);

        console.log('xs '+xs);
        console.log('exit getPriceMinMax')

        return xs;

    }
});