const app = require("express")();

app.get("/api/send-mail", (req, res) => {
  res.end(`Item: ${req.body}`);
});

module.exports = app;
