Session.setDefault('shipping_methods',{});
Template.ShippingMethod.events({
  'click input': function(event) {
    console.log(event.currentTarget.id);
    console.log(typeof event.currentTarget.id);
    if (event.currentTarget.id == 'rate_a91b7085f5564691bce293c2099d84ef') {
      $('#' + event.currentTarget.id).attr('checked',true);
      $('#rate_4d94339a293a47e5a02e78fefc1b098d').attr('checked',false);
      $('#rate_dbf3b20751754b0a9d8079786cb3e4f5').attr('checked',false);
      $('#rate_d26a1cbe34064a4291a3c89e8764a1fc').attr('checked',false);
    } else if (event.currentTarget.id == 'rate_4d94339a293a47e5a02e78fefc1b098d') {
      $('#rate_a91b7085f5564691bce293c2099d84ef').attr('checked',false);
      $('#' + event.currentTarget.id).attr('checked',true);
      $('#rate_dbf3b20751754b0a9d8079786cb3e4f5').attr('checked',false);
      $('#rate_d26a1cbe34064a4291a3c89e8764a1fc').attr('checked',false);
    } else if (event.currentTarget.id == 'rate_dbf3b20751754b0a9d8079786cb3e4f5') {
      $('#rate_a91b7085f5564691bce293c2099d84ef').attr('checked',false);
      $('#rate_4d94339a293a47e5a02e78fefc1b098d').attr('checked',false);
      console.log('checking ' + event.currentTarget.id);
      $('#' + event.currentTarget.id).attr('checked',true);
      $('#rate_d26a1cbe34064a4291a3c89e8764a1fc').attr('checked',false);
    } else {
      $('#rate_a91b7085f5564691bce293c2099d84ef').attr('checked',false);
      $('#rate_4d94339a293a47e5a02e78fefc1b098d').attr('checked',false);
      $('#rate_dbf3b20751754b0a9d8079786cb3e4f5').attr('checked',false);
      $('#' + event.currentTarget.id).attr('checked',true);
    }
  }
});
