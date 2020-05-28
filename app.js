const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.listen(process.env.PORT || 3000, function () {
  console.log("Server has started working on port 3000!");
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const options = {
    method: "POST",
    auth: "blah:56ab6d71c27f1c46f67e738c27c30351-us18",
  };
  const url = "https://us18.api.mailchimp.com/3.0/lists/2674705365";
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendfile(__dirname + "/succ.html");
    } else {
      res.sendfile(__dirname + "/fail.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failu", function (req, res) {
  res.redirect("/");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// 56ab6d71c27f1c46f67e738c27c30351-us18

// 2674705365
