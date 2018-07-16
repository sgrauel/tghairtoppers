Session.setDefault('shipping_methods',{});
Template.ShippingMethod.events({
  'click input': function(event) {
    console.log(event.currentTarget.id);
    console.log(typeof event.currentTarget.id);

    if (event.currentTarget.id == '0') {

      $('#0').attr('checked',true);
      $('#1').attr('checked',false);
      $('#2').attr('checked',false);
      $('#3').attr('checked',false);

      Session.set('shipping_cost',$('#0').val());
    } else if (event.currentTarget.id == '1') {

      $('#0').attr('checked',false);
      $('#1').attr('checked',true);
      $('#2').attr('checked',false);
      $('#3').attr('checked',false);

      Session.set('shipping_cost',$('#1').val());
    } else if (event.currentTarget.id == '2') {

      $('#0').attr('checked',false);
      $('#1').attr('checked',false);
      $('#2').attr('checked',true);
      $('#3').attr('checked',false);

      Session.set('shipping_cost',$('#2').val());
    } else {

      $('#0').attr('checked',false);
      $('#1').attr('checked',false);
      $('#2').attr('checked',false);
      $('#3').attr('checked',true);

      Session.set('shipping_cost',$('#3').val());
    }

  }
});
