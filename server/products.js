Meteor.methods({
    /*
     TASK: inserts products into collection and casts the price property to int from string
     INPUT: nil
     OUTPUT: inserting behavior
     */
    getWoocommerceProducts: function () {
      // Products.remove({});
      if (Products.find({}).count() == 0) {
        // cast each price field from string to int
        const myfunc = function(product) {
            product.price = parseInt(product.price);
            Products.insert(product);
        };

        // myjson.products.map(myfunc);
        try {
          HTTP.call('GET', 'https://www.tghairtoppers.com/wc-api/v3/products', { params: {consumer_key : Meteor.settings.private.woocommerce.consumer_key, consumer_secret : Meteor.settings.private.woocommerce.consumer_secret}}, function(error, result) {
            if (error) {
              throw new Meteor.Error(404, "Error: " + error);
              return;
            }
            console.log(result);
            const myjson = JSON.parse(result.content);
            const products = myjson.products;
            products.map(myfunc);
            return result;
          });

          return true
        } catch (e) {
            return false;
        }
      }
    },
    /*
    TASK: inserts top level category objects into collection
    INPUT: nil
    OUTPUT: inserting behavior
     */
    getProductCategories: function () {
          // Categories.remove({});
          if (Categories.find({}).count() == 0 ) {
            try {
              HTTP.call('GET', 'https://www.tghairtoppers.com/wc-api/v3/products/categories', { params: {consumer_key : 'ck_06dd5e81405461c7c53865b9d440c421bdd4e3d2', consumer_secret : 'cs_e1b468c01c61bdd24865318b9b5d400188bd1bf3'}}, function(error, result) {
                if (error) {
                  throw new Meteor.Error(404, "Error: " + error);
                  return;
                }
                console.log(result);
                const myjson2 = JSON.parse(result.content);
                const categories = myjson2.product_categories;
                categories.map(category => Categories.insert(category));
                Categories.insert({
                    "id": 0,
                    "name": "All Products",
                    "slug": "",
                    "parent": -1,
                    "description": "",
                    "display": "",
                    "image": "",
                    "count": 0});
                return result;
              });

              return true
            } catch (e) {
                return false;
            }
          }
    },
    /*
    * TASK: gets the minimum and maximum price for a given category by id
    * INPUT: category id
    * OUTPUT: a 2 element array with the minimum and maximum price
    * */
    getPriceMinMax: function (catId) {

        // creating a map of categories to category names
        const categoryMap = new Map();
        const topLevelCategories = Categories.find({}).fetch();
        topLevelCategories.map(topLevelCategory => categoryMap.set(topLevelCategory.id,topLevelCategory.name));


        // formulate query to get min and max price for a given category
        const catNameArr = [];
        const catName = categoryMap.get(catId);
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
