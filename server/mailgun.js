let mailgunAddress = Meteor.settings.private.mailgun.mailgunAddress;
let pwd = Meteor.settings.private.mailgun.pwd;

process.env.MAIL_URL = "smtp://" + mailgunAddress + ":" + pwd + "@smtp.mailgun.org:587";
