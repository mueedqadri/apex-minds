const app = require("express")();
const Mailgun = require("mailgun.js");
const formData = require("form-data");

const mailgun = new Mailgun(formData);

app.post("/api/send-mail", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const data = {
      from: "No reply <noreply@apex-minds-reach-out>",
      to: process.env.NOTIFY_EMAILS,
      subject: "Apex Minds: A potential customer has reached out!",
      text: req.body.data,
    };
    await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Mail sent successfully",
      error: {},
      data: {},
    });
  } catch (error) {
    console.error("Error sending mail:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to send mail",
      error: error.message,
      data: {},
    });
  }
});

module.exports = app;
