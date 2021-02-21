const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  const  firstName = req.body.fName;
  const  lastName = req.body.lName;
    const  email = req.body.email;

    const data = {
    	members: [
    	{
          email_address: email,
          status : "subscribed",
          merge_fields: {
          	FNAME: firstName,
          	LNAME: lastName
          }
    	}
      ]
    };

    // console.log(firstName, lastName, email);
    const jsonData = JSON.stringify(data);
    
    const url = "https://us1.api.mailchimp.com/3.0/lists/6785681348";

     const options = {
     	method: "POST",
     	auth: "Preeti1:b801dd59f498f68b44c613a1242c26b2-us1"
     }

    const request = https.request(url, options, function(response) {
   
   if(response.statusCode == 200) {
   	res.sendFile(__dirname + "/success.html");
   }
   else
   {
   	res.sendFile(__dirname + "/failure.html");
   }

    response.on("data", function(data){
    	console.log(JSON.parse(data));
       });
    });

request.write(jsonData);
request.end();


});


app.post("/failure", function(req, res) {
	res.redirect("/")
})

app.listen(3000, function() {
	console.log("Server is running on port 3000");
});













//API Key
// b801dd59f498f68b44c613a1242c26b2-us1
// befa78b801a9b82d457f30d307ca7156


// list Id
// 6785681348   6785681348