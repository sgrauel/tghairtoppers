let myBillingAddress = {};

Template.BillingAddress.onRendered(function(){
    myBillingAddress = $('#myBillingAddress');
    console.log(myBillingAddress);
    // client side validation with jquery validator here
    myBillingAddress.form({
        inline: false,
        fields: {
            address_: {
                identifier: 'address_',
                rules: [
                  {
                      type : 'empty',
                      prompt : 'Address is required'
                  }
                ]
            },
            city_: {
                identifier: 'city_',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'City is required'
                    }
                ]

            },
            state_: {
                identifier: 'state_',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'State is required'
                    }
                ]

            },
            zip_: {
                identifier: 'zip_',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'Zipcode is required'
                    },
                    {
                        type : 'regExp[/^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$/]',
                        prompt : 'Invalid zip code'
                    }
                ]

            },
            country_: {
                identifier: 'country_',
                rules: [
                    {
                        type : 'empty',
                        prompt : 'Country is required'
                    }
                ]

            }
        }
    });

});

Template.BillingAddress.events({
  'submit #myBillingAddress': function(event) {
    // prevent form from submitting (along with event func. returning false)
    event.preventDefault();

    console.log('#myBillingAddress submitted!');

    // virtual page view for form submission
    ga('set', 'page', '/billing_button');
    ga('send', 'pageview');

    // give user reinforcement for checking out
    $('.ui.button').transition('tada');

    // grab data from input fields
    const billingContactForm = {
        address_line1: myBillingAddress.find('[name=address_]').val(),
        address_line2: myBillingAddress.find('[name=address2_]').val(),
        city: myBillingAddress.find('[name=city_]').val(),
        state: myBillingAddress.find('[name=state_]').val(),
        zip: myBillingAddress.find('[name=zip_]').val(),
        country: myBillingAddress.find('[name=country_]').val()
    };

    Meteor.call('setBillingAddr',billingContactForm,function(err){
      if (!err){
        console.log('setBillingAddr succeeded');
        Session.set('hasBillingAddress',true);
      } else {
        console.log(err.message);
      }
    });

  }
});
