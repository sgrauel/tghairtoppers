Template.Booking.events({
   "click #dayCal" : function() {
       console.log("#dayCal clicked!");
       Session.set("calendarView",1);
       console.log("calenderView: " + Session.get("calendarView"))
   },
    "click #weekCal" : function() {
        console.log("#weekCal clicked!");
        Session.set("calendarView",2);
        console.log("calenderView: " + Session.get("calendarView"))
    },
    "click #monthCal" : function() {
        console.log("#monthCal clicked!");
        Session.set("calendarView",3);
        console.log("calenderView: " + Session.get("calendarView"))
    }
});

Template.Booking.helpers({
    isDayCal: function() {
        return Session.get("calendarView") === 1;
    },
    isWeekCal: function() {
        return Session.get("calendarView") === 2;
    },
    isMonthCal: function() {
        return Session.get("calendarView") === 3;
    }
});



Template.Booking.onRendered(function(){
    Session.setDefault("calendarView",1);
    this.$('.datetimepicker').datetimepicker();
});