/* NPM EXPRESS JS */
const express = require("express");
const app = express();
app.use(express.static("public"));

/* NPM BODYPARSER */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

/* NPM REQUEST */
const request = require("request");

/* HTTPS REQUEST */
const https = require("https");

/* ROOT GET */
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

/* POST ROOT */
app.post("/", function (req, res) {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const eMail = req.body.email;
  const uPassword = req.body.password;
  console.log(firstName, lastName, eMail, uPassword);

  const data = {
    members: [
      {
        email_address: eMail,
        status: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const URL = "https://us9.api.mailchimp.com/3.0/lists/c9e49c5670";
  const options = {
    method: "POST",
    auth: "emre1:93fe1dcd121b7f818df160a377631693-us9",
  };

  const request = https.request(URL, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/fail.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  //request.write(jsonData);
  request.end();
});

app.post("/fail", function (req, res) {
  res.redirect("/");
});

/* APP LISTEN */
app.listen(3000, function () {
  console.log("Server started at Port:3000");
});

//APIKEY MAILCHIMP: 93fe1dcd121b7f818df160a377631693-us9
//AUDIENCEID:c9e49c5670
