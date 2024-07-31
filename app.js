const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
});






const client = require("@mailchimp/mailchimp_marketing");

const https = require('https');

// Replace with your Mailchimp API key and server prefix (the part before ".api.mailchimp.com")
const apiKey = 'Your API Key';
const serverPrefix = 'us17'; // e.g., 'us1'

// Replace with your audience/list ID
const listId = 'yourList ID';

// Function to add a member to the Mailchimp list
function addMemberToList(email, firstName, lastName, responce) {
    const data = JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    });

    const options = {
        hostname: `${serverPrefix}.api.mailchimp.com`,
        path: `/3.0/lists/${listId}/members`,
        method: 'POST',
        headers: {
            'Authorization': `apikey ${apiKey}`,
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log('Response:', JSON.parse(data));

        if (res.statusCode==200){
            responce.sendFile(__dirname+"/success.html");
        }
        else {
            responce.sendFile(__dirname+"/failure.html");
        }

        
    });


    req.on('error', (e) => {
        console.error('Error:', e);
    });

    req.write(data);
    req.end();
}
 

app.post("/failure",(request,res)=>{
    res.redirect("/");
})

app.post("/",(req,res)=>{
    addMemberToList(req.body.email, req.body.firstName, req.body.lastName, res);

});

app.listen(process.env.PORT || 3000,()=>{
console.log("server is runnig on part 3000");
});

//api
// cc90d42287206767cb8749df63439eb0-us17


//Audience list id
//4c564ac62f