/*
User "9dc9aa54c2101a42c39e3b25c29a8550:55c6e0a654fe4d59e2950893668187aa"
https://api.mailjet.com/v3.1/send
'Content-Type: application/json'
'{
  "Messages":[
    {
      "From": {
        "Email": "miguelangel.hincapie15@gmail.com",
        "Name": "Miguel"
      },
      "To": [
        {
          "Email": "miguelangel.hincapie15@gmail.com",
          "Name": "Miguel"
        }
      ],
      "Subject": "My first Mailjet email",
      "TextPart": "Greetings from Mailjet.",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
}'

*/

async function sendEmail() {
    let url = "https://api.mailjet.com/v3.1/send";
    let id = "9dc9aa54c2101a42c39e3b25c29a8550:55c6e0a654fe4d59e2950893668187aa";

    let from = {
        Email: document.getElementById("email").value,
        Name: document.getElementById("name").value
    }

    let to = {
        Email: "dahinkpie@gmail.com",
        Name: "Email from you app :3"
    }

    let subject = document.getElementById("subject").value;
    let textpart = document.getElementById("message").value;
    let htmlpart = "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!";
    let customid = "AppGettingStartedTest";

    let data = {
        Messages: [{
            From: from,
            To: [to],
            Subject: subject,
            TextPart: textpart,
            HTMLPart: htmlpart,
            CustomID: customid
        }]
    }

    console.log("About to send the request: ", JSON.stringify(data));
    await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "https://api.mailjet.com/v3.1/send",
                Authorization: "Basic OWRjOWFhNTRjMjEwMWE0MmMzOWUzYjI1YzI5YTg1NTA6NTVjNmUwYTY1NGZlNGQ1OWUyOTUwODkzNjY4MTg3YWE=",
                Host: "api.mailjet.com"
            },
            method: 'POST',
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            auth: "9dc9aa54c2101a42c39e3b25c29a8550:55c6e0a654fe4d59e2950893668187aa",
            credentials: 'same-origin',

            body: JSON.stringify(data)
        })
        .then(res => {
            console.log(res.json());
            return res.json();
        })
        .catch(err => {
            console.error("Error sending email please contact me via Twitter or send me an email to dahinkpie@gmail.com");
        })


}