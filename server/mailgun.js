// mailgun environmental variable; route SMTP requests to this url
// %40 = url encoded '@' symbol
var mailgunAddress = "postmaster%40sandboxfe3a57e769b84679bfd7f49eff063ba2.mailgun.org";
var pwd = "6247c8691efa1821bc319b0a4fd6d190";

process.env.MAIL_URL = "smtp://" + mailgunAddress + ":" + pwd + "@smtp.mailgun.org:587";
